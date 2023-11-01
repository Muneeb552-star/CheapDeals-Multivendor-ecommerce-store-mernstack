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
    add_customer_friend = async (req, res) => {

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


    send_customer_message = async (req, res) => {
        const { userId, text, sellerId, name } = req.body

        try {
            const message = await sellerCustomerMessage.create({
                senderId: userId,
                senderName: name,
                receiverId: sellerId,
                message: text
            })

            const data = await sellerCustomerModal.findOne({ myId: userId })
            let myFriends = data.myFriends
            let index = myFriends.findIndex( f => f.fdId === sellerId )

            while( index > 0 ) {
                let temp = myFriends[index]
                myFriends[index] = myFriends[index -1]
                myFriends[index - 1] = temp
                index--
            }

            await sellerCustomerModal.updateOne({ myId: userId }, { myFriends })

            const data1 =  await sellerCustomerModal.findOne({ myId: sellerId })
            let myFriends1 = data1.myFriends
            let index1 = myFriends1.findIndex( f => f.idId === userId )

            while( index1 > 0 ) {
                let temp1 = myFriends1[index1]
                myFriends1[index1] = myFriends1[index1 -1]
                myFriends1[index1 - 1] = temp1
                index1--
            }

            await sellerCustomerModal.updateOne({ myId: sellerId }, { myFriends1 })

            res.status(201).json({ message })


        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Internal Server Message" })

        }
    }
}

module.exports = new ChatController();
