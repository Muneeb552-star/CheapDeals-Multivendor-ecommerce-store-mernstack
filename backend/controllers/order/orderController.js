const authorModel = require('../../models/authOrder')
const cartModel = require('../../models/cartModel')
const customerOrder = require('../../models/customerOrder')
const { mongo: { ObjectId } } = require('mongoose')
const moment = require('moment')

class cartController {
    paymentCheck = async (id) => {
        try {
            const order = await customerOrder.findById(id)
            if (order.payment_status === 'unpaid') {
                await customerOrder.findByIdAndUpdate(id, { delivery_status : 'cancelled' })
                await authorModel.updateMany({ orderId : id }, { delivery_status : 'cancelled' })
            }
            return true

        } catch (error) {
            consle.log(error)
        }
    }

    place_order = async (req, res) => {
        const { price, products, shipping_fee, shippingInfo, userId } = req.body

        let author_order_Data = []
        let cartId = []
        const tempDate = moment(Date.now()).format('LLL') 
        let customer_order_product = []


        for(let i = 0; i < products.length; i++) {
            const pro = products[i].products
            for(let j = 0; j < pro.length; j++) {
                let temp_customer_product = pro[j].productInfo
                customer_order_product.push(temp_customer_product)
                if (pro[j]._id) {
                    cartId.push(pro[j]._id)
                } 
            }
        }

        try {
            const order = await customerOrder.create({
                customerId : userId,
                shippingInfo,
                products : customer_order_product,
                price : price + shipping_fee,
                delivery_status : 'pending',
                payment_status : 'unpaid',
                date : tempDate
            })

            // Insert data in author model/document
            for (let i = 0; i < products.length; i ++) {
                const pro = products[i].products
                const pri = products[i].price
                const sellerId = products[i].sellerId
                let storePro = []

                for (let j = 0; j < pro.length; j++) {
                    let tempPro = pro[j].productInfo
                    tempPro.quantity = pro[j].quantity
                    storePro.push(tempPro)
                }

                author_order_Data.push({
                    orderId: order.id,
                    sellerId,
                    products : storePro,
                    price: pri,
                    payment_status : 'unpaid',
                    shippingInfo: 'daska CheapDeals Warehouse',
                    delivery_status: 'pending',
                    date: tempDate
                })
            }
            
            await authorModel.insertMany(author_order_Data)

            // Remove that product/item from cartModel
            for (let k = 0; k < cartId.length; k++) {
                await cartModel.findByIdAndDelete(cartId[k])
            }

            setTimeout(() => {
                this.paymentCheck(order.id)
            }, 5000)

            res.status(201).json({ message: 'Order Placed Successfully', orderId: order.id })
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' })
        }

    }

    get_customer_dashboard_data = async (req, res) => {
        const { userId } = req.params

        try {
            const recentOrders = await customerOrder.find({
                customerId: new ObjectId(userId)
            }).limit(5)

            const pendingOrders = await customerOrder.find({
                customerId: new ObjectId(userId),
                delivery_status: 'pending'
            }).countDocuments()
            
            const totalOrders = await customerOrder.find({
                customerId: new ObjectId(userId)
            }).countDocuments()

            const cancelledOrders = await customerOrder.find({
                customerId: new ObjectId(userId),
                delivery_status: 'cancelled'
            }).countDocuments()

            res.status(200).json({ recentOrders,  pendingOrders, totalOrders, cancelledOrders})
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' })
        }

    }

    get_orders = async (req, res) => {
        const { customerId, status } = req.params

        try {
            let orders = []
            if (status !== 'all') {
                orders = await customerOrder.find({
                    customerId: new ObjectId(customerId),
                    delivery_status: status
                })
            } else {
                orders = await customerOrder.find({
                    customerId: new ObjectId(customerId)
                })
            }

            res.status(200).json({ orders })
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' })
        }

    }

    get_order_details = async (req, res) => {
        const { orderId } = req.params

        try {
            const order = await customerOrder.findById(orderId)

            res.status(200).json({ order })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ message: 'Internal Server Error' })
        }

    }


}

module.exports = new cartController()