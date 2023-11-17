const cartModel = require('../../models/cartModel')
const { mongo: { ObjectId } } = require('mongoose')
const wishlistModel = require('../../models/wishlistModel')

// Create a class for the cart controller
class cartController {

    // Method to add a product to the cart
    add_to_cart = async (req, res) => {
        const { userId, productId, quantity } = req.body;

        try {
            // Check if the product is already in the cart
            const product = await cartModel.findOne({
                $and: [
                    {
                        productId: {
                            $eq: productId
                        }
                    },
                    {
                        userId: {
                            $eq: userId
                        }
                    }
                ]
            });

            if (product) {
                res.status(404).json({ error: 'Product already added to cart' })
            } else {
                // Create a new cart item in the database
                const product = await cartModel.create({
                    userId,
                    productId,
                    quantity
                });

                res.status(201).json({ message: 'Added to cart', product })
            }
        } catch (error) {
            res.status(500).json('Internal Server Error') 
        }
    }

    // Method to get cart products for a specific user
    get_cart_products = async (req, res) => {
        const { userId } = req.params
        const comission = 5;

        try {
            // Aggregate to fetch cart products and perform a lookup to get product details
            const cart_products = await cartModel.aggregate([
                {
                    $match: {
                        userId: {
                            $eq: new ObjectId(userId)
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'productId',
                        foreignField: '_id',
                        as: 'products'
                    }
                }
            ]);

            let calculate_price = 0;
            let uniqueProductIds = [];
            let cart_products_count = 0;

            // Filter out the out-of-stock products
            const outOfStockProduct = cart_products.filter(product => product.products[0].stock < product.quantity);
            for (let i = 0; i < outOfStockProduct.length; i++) {
                const productId = outOfStockProduct[i].productId.toString(); // Convert ObjectId to string
                if (!uniqueProductIds.includes(productId)) {
                    uniqueProductIds.push(productId);
                    cart_products_count++;
                }
            }

            // Filter out the in-stock products
            const stockProduct = cart_products.filter(product => product.products[0].stock >= product.quantity);
            for (let i = 0; i < stockProduct.length; i++) {
                const { quantity } = stockProduct[i];
                const productId = stockProduct[i].productId.toString(); // Convert ObjectId to string
                if (!uniqueProductIds.includes(productId)) {
                    uniqueProductIds.push(productId);
                    cart_products_count++;
                }

                const { price, discount } = stockProduct[i].products[0];
                if (discount !== 0) {
                    calculate_price = calculate_price + quantity * (price - Math.floor((price * discount) / 100));
                } else {
                    calculate_price = calculate_price + quantity * price;
                }
            }

            let product = [];
            let unique = [...new Set(stockProduct.map(product => product.products[0].sellerId.toString()))];

            // Instead of using 'stockProduct' here, use the original 'cart_products' array
            for (let i = 0; i < unique.length; i++) {
                let price = 0;
                for (let j = 0; j < cart_products.length; j++) {
                    const tempProduct = cart_products[j].products[0];
                    if (unique[i] === tempProduct.sellerId.toString()) {
                        let pri = 0;
                        if (tempProduct.discount !== 0) {
                            pri = tempProduct.price - Math.floor((tempProduct.price * tempProduct.discount) / 100);
                        } else {
                            pri = tempProduct.price;
                        }
                        pri = pri - Math.floor((pri * comission) / 100);
                        price = price + pri * cart_products[j].quantity;

                        // Adjust the label based on stock availability
                        const label = tempProduct.stock >= cart_products[j].quantity ? 'In Stock' : 'Out of Stock';

                        product[i] = {
                            sellerId: unique[i],
                            shopName: tempProduct.shopName,
                            price,
                            products: product[i]
                                ? [
                                    ...product[i].products,
                                    {
                                        _id: cart_products[j]._id,
                                        quantity: cart_products[j].quantity,
                                        productInfo: {...tempProduct, stockLabel: label } // Add stock label
                                    }
                                  ]
                                : [
                                    {
                                        _id: cart_products[j]._id,
                                        quantity: cart_products[j].quantity,
                                        productInfo: { ...tempProduct, stockLabel: label } // Add stock label
                                    }
                                  ]
                        }
                    }
                }
            }

            // Calculate shipping_fee based on the total number of products
            const shipping_fee = 70 * cart_products.length;

            res.status(201).json({ 
                cart_products: product,
                price: calculate_price,
                cart_products_count,
                shipping_fee,
                outOfStockProduct
             });

        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: 'Internal Server Error' }); 
        }
    }

    // Method to delete a product from the cart
    delete_cart_products = async (req, res) => {
        const { cartId } = req.params
        try {
            await cartModel.findByIdAndDelete(cartId)
            res.status(200).json({ message: 'Item deleted Successfully' }); 
        } catch (error) {
            res.status(500).json({ message: 'Internal Server error' }); 
        }
    }

    // Method to increase the quantity of a cart item
    increase_cart_quantity = async (req, res) => {
        const { cartId } = req.params
    
        try {
            // Find and update the cart item to increase the quantity
            const updatedCart = await cartModel.findByIdAndUpdate(
                cartId,
                { $inc: { quantity: 1 } },
                { new: true }
            );
    
            if (updatedCart) {
                res.status(200).json({ message: 'Quantity Increased' }); 
            } else {
                res.status(404).json({ message: 'Cart not found' }); 
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' }); 
        }
    }

    // Method to decrease the quantity of a cart item
    decrease_cart_quantity = async (req, res) => {
        const { cartId } = req.params
    
        try {
            // Find and update the cart item to decrease the quantity
            const updatedCart = await cartModel.findByIdAndUpdate(
                cartId,
                { $inc: { quantity: -1 } },
                { new: true }
            )
    
            if (updatedCart) {
                res.status(200).json({ message: 'Quantity reduced' }); 
            } else {
                res.status(404).json({ message: 'Cart not found' }); 
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' }); 
        }
    }

    // Method to add a product to the wishlist
    add_to_wishlist = async (req, res) => {
        const { productId } = req.body
    
        try {
            const in_wishlist = await wishlistModel.findOne({ productId: productId });

            if (in_wishlist) {
                // If the product is already in the wishlist, remove it
                res.status(404).json({ error: 'Already added in wishlist' })
            } else {
                // If the product is not in the wishlist, add it
                const addedWishlistItem = await wishlistModel.create(req.body); // Create a new wishlist item
                res.status(201).json({ message: 'Added to wishlist', wishlist: addedWishlistItem })
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' }); 
        }
    }

    // Method to get wishlist products for a specific user
    get_wishlist_products = async(req, res) => {
        const { userId } = req.params
        try {
            const wishlists = await wishlistModel.find({ userId })
            const wishlistCount = await wishlistModel.find({ userId }).countDocuments()

            res.status(200).json({ wishlistCount, wishlists })
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' }); 
        }
    }

    // Method to delete a product from the wishlist
    delete_wishlist_product = async (req, res) => {
        const { wishlistId } = req.params;
        try {
            await wishlistModel.findByIdAndDelete(wishlistId); 
            res.status(200).json({ message: 'Item removed from wishlist', wishlistId })
        } catch (error) {
            res.status(500).json({ error: 'Internal Server error' })
        }
    }
}

// Export an instance of the cartController class
module.exports = new cartController();
