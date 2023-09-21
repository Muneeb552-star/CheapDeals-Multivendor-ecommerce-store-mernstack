const adminModel = require('../models/adminModel')
const sellerModel = require('../models/sellerModel')
const sellerCustomerModal = require('../models/chat/sellerCustomerModal')
const bcrypt = require('bcrypt')
const { responseReturn } = require('../utils/response')
const { createTokens } = require('../utils/tokenCreate')

class authControllers {
    //Admin_login Function
    admin_login = async (req, res) => {
        const { email, password } = req.body
        try {

            if (!email || !password) {
                responseReturn(res, 400, { error: 'All fields are required' });
                return;
              }

            // Check if user exists with the provided email
            const admin = await adminModel.findOne({ email }).select('+password');
            if (!admin) {
                responseReturn(res, 401, { error: 'Invalid email' });
                return;
            }

            // Compare the provided password with the hashed password
            const passwordMatch = await bcrypt.compare(password, admin.password);
            if (!passwordMatch) {
                responseReturn(res, 401, { error: 'Invalid password' });
                return;
            }

            // Generate access token and refresh token
            const tokens = createTokens({ id : admin.id, role : admin.role })

            // Create cookie with refresh token
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }) 
            
            // Send token in response to server
            responseReturn(res, 200, { accessToken: tokens.accessToken, message: "Login Successfull" })

        } catch (error) {
            responseReturn(res, 500, { error: error.message })
        }
    }

    seller_login = async (req, res) => {
        const { email, password } = req.body
        try {

            if (!email || !password) {
                responseReturn(res, 400, { error: 'All fields are required' });
                return;
            }

            // Check if user exists with the provided email
            const seller = await sellerModel.findOne({ email }).select('+password');
            if (!seller) {
                responseReturn(res, 401, { error: 'Invalid email' });
                return;
            }

            // Compare the provided password with the hashed password
            const passwordMatch = await bcrypt.compare(password, seller.password);
            if (!passwordMatch) {
                responseReturn(res, 401, { error: 'Invalid password' });
                return;
            }

            // Generate access token and refresh token
            const tokens = createTokens({ id : seller.id, role : seller.role })
            
            // Create cookie with refresh token
            // res.set('Authorization', `Bearer ${tokens.accessToken}`);
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }) 
            
            // Send token in response to server
            responseReturn(res, 200, { accessToken: tokens.accessToken, message: "Login Successfull" })

        } catch (error) {
            responseReturn(res, 500, { error: error.message })
        }
    }

    seller_register = async (req, res) => {
        const { email, name, password } = req.body
        try {
            const getUser = await sellerModel.findOne({ email })
            if (getUser){
                console.log(getUser)
                responseReturn(res, 404, { error: 'Email already exist' })
            } else {
                const seller = await sellerModel.create({
                    name,
                    email,
                    password: await bcrypt.hash(password, 10),
                    method: 'manualy',
                    shopInfo: {}
                })
                await sellerCustomerModal.create({ myId: seller.id })

                // Generate access token and refresh token
                const tokens = createTokens({ id : seller.id, role : seller.role })
                // Create cookie with refresh token
                res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
                // Send token in response to server
                responseReturn(res, 200, { accessToken: tokens.accessToken, message: "Register Successfully" })

            }
        } catch (error) {
            responseReturn(res, 500, { error: 'Internal Server Error' })
        }
    }

    getUserInfo = async (req, res) => {
        const { id, role } = req.user

        try {
            if (role === 'admin') {
                const admin = await adminModel.findById(id)
                responseReturn(res, 200, { userInfo: admin })
            } else {
                const seller = await sellerModel.findById(id)
                responseReturn(res, 200, { userInfo: seller })
            }
            
        } catch (error) {
            responseReturn(res, 500, { error: 'Internal Server Error' })
        }
    }

    profile_image_upload = async (req, res) => {
        const { id } = req.user;
        const form = formidable({ multiples: true }); 

        form.parse(req, async (err, _, files) => {
            const { image } = files
            
            if (err) {
                responseReturn(res, 400, { error: 'Image could not be processed' });
                return;
            }

            cloudinary.config({ 
                cloud_name: process.env.cloud_name, 
                api_key: process.env.api_key, 
                api_secret: process.env.api_secret,
                secure: true 
            })

            try {
                const result = await cloudinary.uploader.upload(image.filepath, { folder: 'profile' })
                if (result) {
                    await sellerModel.findByIdAndUpdate(id, { image: result.url })
                    const userInfo = await sellerModel.findById(id)
                    responseReturn(res, 200, { userInfo, message: 'Image Uploaded Successfully !' })
                } else {
                    responseReturn(res, 404, { error: 'Image upload failed' })
                }
           } catch (error) {
               responseReturn(res, 500, { error: error.message })
           }

        })  
    }

    update_profile = async (req, res) => {
        const { shopName, address, phone } = req.body
        const { id } = req.user

        try {
            await sellerModel.findByIdAndUpdate(id, {
                shopInfo: {
                    shopName,
                    address,
                    phone
                }
            })
            const userInfo = await sellerModel.findById(id)
            responseReturn(res, 201, { userInfo, message: 'Profile added Successfully !' })
        } catch (error) {
            responseReturn(res, 500, { error: error.message })
        }
    }
}

module.exports = new authControllers()
