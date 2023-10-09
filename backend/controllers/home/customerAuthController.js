const customerModel = require('../../models/customerModel');
const sellerCustomerModal = require('../../models/chat/sellerCustomerModal'); 
const { responseReturn } = require('../../utils/response'); 
const { createTokens } = require('../../utils/tokenCreate'); // Import a utility for creating tokens
const bcrypt = require('bcrypt'); // Import the bcrypt library for password hashing


class customerAuthController {

    // Method to register a new customer
    customer_register = async (req, res) => {
        const { name, email, password } = req.body; // Extract registration data from the request body
        console.log(req.body);

        try {
            // Check if all required fields are provided
            if (!name || !email || !password) {
                responseReturn(res, 400, { error: 'All fields are required' }); 
                return;
            }

            // Check if a customer with the same email already exists
            const customer = await customerModel.findOne({ email });

            if (customer) {
                responseReturn(res, 404, { error: 'Email already exists' }); 
            } else {
                // Create a new customer document in the database
                const createCustomer = await customerModel.create({
                    name: name.trim(),
                    email: email.trim(),
                    password: await bcrypt.hash(password, 10),
                    method: 'manually' // Indicate registration method
                });

                // Create a corresponding chat entry for the customer
                await sellerCustomerModal.create({ myId: createCustomer.id })

                // Generate access token and refresh token
                const tokens = createTokens({
                    id: createCustomer.id,
                    name: createCustomer.name,
                    email: createCustomer.email,
                    method: createCustomer.method
                });

                // Create a cookie with the refresh token
                res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

                // Send access token and a success message in the response
                responseReturn(res, 200, { accessToken: tokens.accessToken, message: "Registered Successfully" });
            }
        } catch (error) {
            responseReturn(res, 500, { error: 'Internal Server Error' })
        }
    }

    // Method to authenticate a customer login
    customer_login = async (req, res) => {
        const { email, password } = req.body; // Extract login data from the request body

        try {
            // Check if all required fields are provided
            if (!email || !password) {
                responseReturn(res, 400, { error: 'All fields are required' }); 
                return;
            }

            // Check if a user exists with the provided email
            const customer = await customerModel.findOne({ email }).select('+password');

            if (!customer) {
                responseReturn(res, 401, { error: 'Invalid email' })
                return;
            }

            // Compare the provided password with the hashed password
            const passwordMatch = await bcrypt.compare(password, customer.password);

            if (!passwordMatch) {
                responseReturn(res, 401, { error: 'Wrong password' })
                return;
            }

            // Generate access token and refresh token
            const tokens = createTokens({
                id: customer.id,
                name: customer.name,
                email: customer.email,
                method: customer.method
            });

            // Create a cookie with the refresh token
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

            // Send access token and a success message in the response
            responseReturn(res, 200, { accessToken: tokens.accessToken, message: "Login Successful" });
        } catch (error) {
            responseReturn(res, 500, { error: error.message }); // Handle errors with a 500 Internal Server Error response
        }
    }
}

// Export an instance of the customerAuthController class
module.exports = new customerAuthController();
