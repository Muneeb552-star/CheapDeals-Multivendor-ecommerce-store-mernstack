const authorModel = require('../../models/authOrder')
const cartModel = require('../../models/cartModel')
const customerOrder = require('../../models/customerOrder')
const { mongo: { ObjectId } } = require('mongoose')
const moment = require('moment')

// Create a class for the cart controller
class cartController {

    // Method to check payment status and cancel the order if unpaid
    paymentCheck = async (id) => {
        try {
            const order = await customerOrder.findById(id)
            if (order.payment_status === 'unpaid') {
                await customerOrder.findByIdAndUpdate(id, { delivery_status: 'cancelled' }); // Update the order status to 'cancelled'
                await authorModel.updateMany({ orderId: id }, { delivery_status: 'cancelled' }); // Update author order statuses to 'cancelled'
            }
            return true;
        } catch (error) {
            console.log(error);
        }
    }

    // Method to place a new order
    place_order = async (req, res) => {
        const { price, products, shipping_fee, shippingInfo, userId } = req.body

        let author_order_Data = [];
        let cartId = [];
        const tempDate = moment(Date.now()).format('LLL');
        let customer_order_product = [];

        for (let i = 0; i < products.length; i++) {
            const pro = products[i].products;
            for (let j = 0; j < pro.length; j++) {
                let temp_customer_product = pro[j].productInfo;
                customer_order_product.push(temp_customer_product);
                if (pro[j]._id) {
                    cartId.push(pro[j]._id);
                }
            }
        }

        try {
            const order = await customerOrder.create({
                customerId: userId,
                shippingInfo,
                products: customer_order_product,
                price: price + shipping_fee,
                delivery_status: 'pending',
                payment_status: 'unpaid',
                date: tempDate
            });

            for (let i = 0; i < products.length; i++) {
                const pro = products[i].products;
                const pri = products[i].price;
                const sellerId = products[i].sellerId;
                let storePro = [];

                for (let j = 0; j < pro.length; j++) {
                    let tempPro = pro[j].productInfo;
                    tempPro.quantity = pro[j].quantity;
                    storePro.push(tempPro);
                }

                author_order_Data.push({
                    orderId: order.id,
                    sellerId,
                    products: storePro,
                    price: pri,
                    payment_status: 'unpaid',
                    shippingInfo: 'daska CheapDeals Warehouse',
                    delivery_status: 'pending',
                    date: tempDate
                });
            }

            await authorModel.insertMany(author_order_Data); // Insert author order data

            for (let k = 0; k < cartId.length; k++) {
                await cartModel.findByIdAndDelete(cartId[k]); // Remove products/items from the cart
            }

            setTimeout(() => {
                this.paymentCheck(order.id); // Check payment status asynchronously after 5 seconds
            }, 5000);

            res.status(201).json({ message: 'Order Placed Successfully', orderId: order.id })
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Method to place a new order - Copy of the 1st method
    placeOrder = async (req, res) => {
        try {
            const { price, products, shipping_fee, shippingInfo, userId } = req.body;

            // Arrays to store order-related data
            const customerOrderProducts = [];
            const cartIds = [];
            const tempDate = moment(Date.now()).format('LLL');
            const authorOrderData = [];

            // Processing customer order data
            products.forEach(productGroup => {
                productGroup.products.forEach(product => {
                    // Collecting customer order product details
                    const tempCustomerProduct = product.productInfo;
                    customerOrderProducts.push(tempCustomerProduct);

                    // Collecting cart IDs for deletion
                    if (product._id) {
                        cartIds.push(product._id);
                    }
                });
            });

            // Creating a customer order
            const order = await customerOrder.create({
                customerId: userId,
                shippingInfo,
                products: customerOrderProducts,
                price: price + shipping_fee,
                delivery_status: 'pending',
                payment_status: 'unpaid',
                date: tempDate
            });

            // Processing author order data
            products.forEach(productGroup => {
                const storePro = productGroup.products.map(product => ({
                    ...product.productInfo,
                    quantity: product.quantity
                }));

                // Collecting data for author order
                authorOrderData.push({
                    orderId: order.id,
                    sellerId: productGroup.sellerId,
                    products: storePro,
                    price: productGroup.price,
                    payment_status: 'unpaid',
                    shippingInfo: 'daska CheapDeals Warehouse',
                    delivery_status: 'pending',
                    date: tempDate
                });
            });

            // Inserting author order data
            await authorModel.insertMany(authorOrderData);

            // Deleting products from the cart
            for (const cartId of cartIds) {
                await cartModel.findByIdAndDelete(cartId);
            }

            // Checking payment status asynchronously after 5 seconds
            setTimeout(() => {
                this.paymentCheck(order.id);
            }, 5000);

            res.status(201).json({ message: 'Order Placed Successfully', orderId: order.id });

        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Method to get dashboard data for a customer
    get_customer_dashboard_data = async (req, res) => {
        const { userId } = req.params; 

        try {
            const recentOrders = await customerOrder.find({
                customerId: new ObjectId(userId)
            }).limit(5); // Find recent customer orders

            const pendingOrders = await customerOrder.find({
                customerId: new ObjectId(userId),
                delivery_status: 'pending'
            }).countDocuments(); // Count pending customer orders
            
            const totalOrders = await customerOrder.find({
                customerId: new ObjectId(userId)
            }).countDocuments(); // Count total customer orders

            const cancelledOrders = await customerOrder.find({
                customerId: new ObjectId(userId),
                delivery_status: 'cancelled'
            }).countDocuments(); // Count cancelled customer orders

            res.status(200).json({ recentOrders, pendingOrders, totalOrders, cancelledOrders })
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Method to get customer orders based on status
    get_orders = async (req, res) => {
        const { customerId, status } = req.params;

        try {
            let orders = [];
            if (status !== 'all') {
                orders = await customerOrder.find({
                    customerId: new ObjectId(customerId),
                    delivery_status: status
                }); // Find orders based on status
            } else {
                orders = await customerOrder.find({
                    customerId: new ObjectId(customerId)
                }); // Find all orders
            }

            res.status(200).json({ orders })
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Method to get details of a specific order
    get_order_details = async (req, res) => {
        const { orderId } = req.params

        try {
            const order = await customerOrder.findById(orderId)

            res.status(200).json({ order })
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

// Export an instance of the cartController class
module.exports = new cartController();
