/**
 * Chat Controller
 *
 * This class defines methods for managing chat-related operations, including adding friends and retrieving messages.
 */
const sellerModel = require('../../models/sellerModel')
const customerModel = require('../../models/customerModel')
const sellerCustomerModal = require('../../models/chat/sellerCustomerModal')
const sellerCustomerMessage = require('../../models/chat/sellerCustomerMessage')

class ChatController {
    
    /**
     * Add Customer Friend
     *
     * Adds a customer as a friend to a seller and vice versa in the chat system. This function handles both the creation
     * of the friendship relationship and retrieval of messages between the friends.
     */
    async add_customer_friend(req, res) {
        const { sellerId, userId } = req.body

        try {
            if (sellerId !== '') {
                const seller = await sellerModel.findById(sellerId) 
                const user = await customerModel.findById(userId)

                // Check if the seller-customer relationship exists
                const checkSeller = await sellerCustomerModal.findOne({
                    $and : [ { myId: { $eq: userId } }, { myFriends : { $elemMatch : { fdId: sellerId } } } ]
                });

                if (!checkSeller) {
                    // If the relationship doesn't exist, update the customer's friends list
                    await sellerCustomerModal.updateOne({ myId: userId },
                    {
                        $push : {
                            myFriends : {
                                fdId: sellerId,
                                name: seller.shopInfo?.shopName,
                                image: seller.image
                            }
                        }
                    });
                }

                // Check if the customer-seller relationship exists
                const checkCustomer = await sellerCustomerModal.findOne({
                    $and : [ { myId: { $eq: sellerId } }, { myFriends : { $elemMatch : { fdId: userId } } } ]
                });

                if (!checkCustomer) {
                    // If the relationship doesn't exist, update the seller's friends list
                    await sellerCustomerModal.updateOne({ myId: sellerId },
                    {
                        $push : {
                            myFriends : {
                                fdId: userId,
                                name: user.name,
                                image: ""
                            }
                        }
                    })
                }

                const messages = await sellerCustomerMessage.find({
                    $or: [
                        {
                            $and: [{ receiverId: { $eq: sellerId } }, { senderId: { $eq: userId } }]
                        },
                        {
                            $and: [{ receiverId: { $eq: userId } }, { senderId: { $eq: sellerId } }]
                        }
                    ]
                })

                const MyFriends = await sellerCustomerModal.findOne({ myId: userId })
                
                const currentFd = MyFriends.myFriends.find( s => s.fdId === sellerId )

                res.status(200).json({ myFriends: MyFriends.myFriends, currentFd, messages })

            } else {
                // If sellerId is not provided, retrieve the customer's friends list
                const MyFriends = await sellerCustomerModal.findOne({ myId: userId })

                res.status(200).json({ myFriends:  MyFriends.myFriends })
            }

        } catch (error) {
            // console.log(error)
            res.status(500).json('Internal Server Error')
        }
    }
}

module.exports = new ChatController();
