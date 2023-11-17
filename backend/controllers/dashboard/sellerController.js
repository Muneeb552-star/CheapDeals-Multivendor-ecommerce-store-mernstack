const sellerModel = require('../../models/sellerModel');
const formidable = require('formidable');
const cloudinary = require('cloudinary');
const { responseReturn } = require('../../utils/response');

/**
 * Seller Controller
 *
 * This class defines methods for managing seller-related operations, including retrieving seller requests,
 * getting individual sellers, updating seller status, and fetching seller requests with pagination.
 */
class SellerController {

    /**
     * Get Seller Requests - Retrieves a list of sellers with a 'pending' status.
     */
    getSellerRequests = async(req, res) => {
      
      try {
        const sellers = await sellerModel.find({ status: 'pending' }).sort({ status: -1 });
        responseReturn(res, 200, { sellers });
      } catch (error) {
        responseReturn(res, 500, { error: error.message });
      }
    }

    /**
     * Get Seller - Retrieves details of a specific seller based on the provided sellerId
     */
    getSeller = async(req, res) => {
      const { sellerId } = req.params;

      try {
        const seller = await sellerModel.findById(sellerId);
        responseReturn(res, 200, { seller });
      } catch (error) {
        responseReturn(res, 500, { error: error.message });
      }
    }

    /**
     * Update Seller Status - Updates the status of a specific seller based on the provided sellerId and status.
     */
    updateSellerStatus = async(req, res) => {

      const { sellerId, status } = req.body;
      try {
        await sellerModel.findByIdAndUpdate(sellerId, { status });
        const seller = await sellerModel.findById(sellerId);
        responseReturn(res, 200, { seller, message: 'Status Updated Successfully' });
      } catch (error) {
        responseReturn(res, 500, { error: error.message });
      }
    }

    /**
     * Get Seller Requests with Pagination - Retrieves a paginated list of sellers with a 'pending' status.
     */
    getSellerRequestsWithPagination = async(req, res) => {

      const { page, searchValue, perPage } = req.query;
      const skipPage = parseInt(perPage) * (parseInt(page) - 1);
      try {
        const sellers = await sellerModel.find({ status: 'pending' }).skip(skipPage).limit(perPage).sort({ status: -1 });
        const totalSeller = await sellerModel.find({ status: 'pending' }).countDocuments();
        responseReturn(res, 200, { sellers, totalSeller });
      } catch (error) {
        responseReturn(res, 500, { error: error.message });
      }
    }
}

module.exports = new SellerController();
