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
     * Adds a customer as a friend to a seller and vice versa in the chat system. 
     * This function handles both the creation of the friendship relationship and 
     * retrieval of messages between the friends.
    */

    add_customer_friend = async (req, res) => {
        try {
            const { sellerId, userId } = req.body;
    
            // If sellerId is not provided, retrieve the customer's friends list
            if (!sellerId) {
                const MyFriends = await sellerCustomerModal.findOne({ myId: userId });
                return res.status(200).json({ myFriends: MyFriends.myFriends });
            }
    
            // Fetch seller and user information concurrently
            const [seller, user] = await Promise.all([ sellerModel.findById(sellerId), customerModel.findById(userId) ])
    
            // Check if the seller-customer relationship exists
            const checkSeller = await sellerCustomerModal.exists({ myId: userId, "myFriends.fdId": sellerId })
    
            if (!checkSeller) {
                // If the relationship doesn't exist, update the customer's friends list
                await sellerCustomerModal.updateOne(
                    { myId: userId },
                    {
                        $push: {
                            myFriends: {
                                fdId: sellerId,
                                name: seller.shopInfo?.shopName,
                                image: seller.image
                            }
                        }
                    }
                );
            }
    
            // Check if the customer-seller relationship exists
            const checkCustomer = await sellerCustomerModal.exists({ myId: sellerId, "myFriends.fdId": userId })
    
            if (!checkCustomer) {
                // If the relationship doesn't exist, update the seller's friends list
                await sellerCustomerModal.updateOne(
                    { myId: sellerId },
                    {
                        $push: {
                            myFriends: {
                                fdId: userId,
                                name: user.name,
                                image: ""
                            }
                        }
                    }
                );
            }
    
            // Retrieve messages between the friends
            const messages = await sellerCustomerMessage.find({
                $or: [
                    { receiverId: sellerId, senderId: userId },
                    { receiverId: userId, senderId: sellerId }
                ]
            });
    
            // Retrieve the updated friends list and the current friend
            const MyFriends = await sellerCustomerModal.findOne({ myId: userId });
            const currentFd = MyFriends.myFriends.find(s => s.fdId === sellerId);
    
            res.status(200).json({ myFriends: MyFriends.myFriends, currentFd, messages });
        } catch (error) {
            res.status(500).json('Internal Server Error');
        }
    };
    
    /**
     * Send Customer Message
     *
     * Sends a message from a customer to a seller and updates the order of friends in the list.
     */

    send_customer_message = async (req, res) => {
        try {
            const { userId, text, sellerId, name } = req.body;
    
            // Create a new message
            const messages = await sellerCustomerMessage.create({
                senderId: userId,
                senderName: name,
                receiverId: sellerId,
                message: text
            });
    
            // Function to update the order of friends in the list
            const updateFriends = async (userId, sellerId) => {
                const data = await sellerCustomerModal.findOne({ myId: userId });

                const myFriends = data.myFriends;
                const index = myFriends.findIndex(f => f.fdId === sellerId);
    
                while (index > 0) {
                    [myFriends[index], myFriends[index - 1]] = [myFriends[index - 1], myFriends[index]];
                    index--;
                }
    
                await sellerCustomerModal.updateOne({ myId: userId }, { myFriends });
            };
    
            // Update the order of friends for both the customer and the seller
            await Promise.all([
                updateFriends(userId, sellerId),
                updateFriends(sellerId, userId)
            ]);
    
            res.status(201).json({ messages });
        } catch (error) {

            console.log(error.message)
            res.status(500).json({ message: "Internal Server Message" });
        }
    };
}

module.exports = new ChatController()
