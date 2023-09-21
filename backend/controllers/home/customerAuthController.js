const customerModel = require('../../models/customerModel')
const sellerCustomerModal = require('../../models/chat/sellerCustomerModal')
const { responseReturn } = require('../../utils/response')
const { createTokens } = require('../../utils/tokenCreate')
const bcrypt = require('bcrypt')

class customerAuthController {

    customer_register = async (req, res) => {
        const { name, email, password } = req.body
        console.log(req.body)
 
        try {

            if (!name || !email || !password ) {
                responseReturn(res, 400, { error: 'All fields are required' });
                return;
            }

            const customer = await customerModel.findOne({ email })

            if (customer){
                responseReturn(res, 404, { error: 'Email already exist' })
            } else {
                const createCustomer = await customerModel.create({
                    name : name.trim(),
                    email : email.trim(),
                    password: await bcrypt.hash(password, 10),
                    method: 'manualy'
                })

                await sellerCustomerModal.create({ myId: createCustomer.id })

                // Generate access token and refresh token
                const tokens = createTokens({ 
                    id : createCustomer.id, 
                    name : createCustomer.name,
                    email : createCustomer.email,
                    method : createCustomer.method
                })
                // Create cookie with refresh token
                res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
                // Send token in response to server
                responseReturn(res, 200, { accessToken: tokens.accessToken, message: "Register Successfully" })
            }
        } catch (error) {
            responseReturn(res, 500, { error: 'Internal Server Error' })
        }
    }

    customer_login = async (req, res) => {
        const { email, password } = req.body
        try {

            if (!email || !password) {
                responseReturn(res, 400, { error: 'All fields are required' });
                return;
            }

            // Check if user exists with the provided email
            const customer = await customerModel.findOne({ email }).select('+password');
            if (!customer) {
                responseReturn(res, 401, { error: 'Invalid email' });
                return;
            }

            // Compare the provided password with the hashed password
            const passwordMatch = await bcrypt.compare(password, customer.password);
            if (!passwordMatch) {
                responseReturn(res, 401, { error: 'Wrong password' });
                return;
            }

            // Generate access token and refresh token
            const tokens = createTokens({ 
                id : customer.id, 
                name : customer.name,
                email : customer.email,
                method : customer.method
            })
            
            // Create cookie with refresh token
            // res.set('Authorization', `Bearer ${tokens.accessToken}`);
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }) 
            
            // Send token in response to server
            responseReturn(res, 200, { accessToken: tokens.accessToken, message: "Login Successfull" })

        } catch (error) {
            responseReturn(res, 500, { error: error.message })
        }
    }
}

module.exports = new customerAuthController()