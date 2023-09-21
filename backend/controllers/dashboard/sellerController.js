const sellerModel = require('../../models/sellerModel')
const formidable = require('formidable')
const cloudinary = require('cloudinary')
const { responseReturn } = require('../../utils/response')

class sellerController {

    get_seller_requests = async (req, res) => {
        try {
            const sellers = await sellerModel.find({ status: 'pending' }).sort({ status: -1 })
            responseReturn(res, 200, { sellers })
        } catch (error) {
            responseReturn(res, 500, { error: error.message })
        }
    }

    get_seller = async (req, res) => {
        const { sellerId } = req.params
        try {
            const seller = await sellerModel.findById(sellerId)
            console.log(seller)
            responseReturn(res, 200, { seller })
        } catch (error) {
            responseReturn(res, 500, { error: error.message })
        }
    }


    seller_status_update = async (req, res) => {
        const { sellerId, status } = req.body
        try {
            await sellerModel.findByIdAndUpdate(sellerId, { status })
            const seller = await sellerModel.findById(sellerId)
            responseReturn(res, 200, { seller, message: 'Status Updated Successfully' })    
        } catch (error) {
            responseReturn(res, 500, { error: error.message })
        }
    }


    // get_seller_requests_with_pagination = async () => {
    //     const { page, searchValue, perPage } = req.query
    //     const skipPage = parseInt(perPage) * (parseInt(page) - 1)
    //     try {
    //         const sellers = await sellerModel.find({ status: 'pending' }).skip(skipPage).limit(perPage).sort({ status: -1 })
    //         const totalSeller = await sellerModel.find({ status: 'pending' }).countDocuments()
    //         responseReturn(res, 200, { sellers, totalSeller })
    //     } catch (error) {
    //         responseReturn(res, 500, { error: error.message })
    //     }
    // }
}

module.exports = new sellerController()