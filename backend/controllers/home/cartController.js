const cartModel = require('../../models/cartModel')
const { mongo: { ObjectId }, version } = require('mongoose')
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
    getCartProducts = async (req, res) => {
        const { userId } = req.params;

        try {
            // Aggregate to fetch cart products and perform a lookup to get product details
            const cartProducts = await cartModel.aggregate([
                {
                    $match: { userId: new ObjectId(userId) }
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'productId',
                        foreignField: '_id',
                        as: 'productDetails',
                    },
                }
            ]);

            // Function to calculate the final price for a product
            const calculatePrice = (price, discount, quantity) => {
                const discountedPrice = discount !== 0 ? price - Math.floor((price * discount) / 100) : price;
                // return discountedPrice + Math.floor((discountedPrice * commission) / 100) * quantity;   // If we want to add comission, add here
                return Math.ceil(discountedPrice * quantity);
            };

            let totalPrice = 0;
            let cartProductsCount = 0;
            const outOfStockProducts = [];

            // Formatted cart object to store organized product information
            const formattedCart = cartProducts.reduce((result, item) => {
                const { productDetails, quantity } = item;
                const product = productDetails[0];
                const productId = product._id.toString();

                // Check if the product is out of stock                
                if (product.stock < quantity) {
                    outOfStockProducts.push(productId);
                    return result;
                }

                // Initialize seller information in the formattedCart object
                if (!result[productId]) {
                    result[productId] = {
                        sellerId: product.sellerId.toString(),
                        shopName: product.shopName,
                        price: 0,
                        products: [],
                    };
                    cartProductsCount++;
                }

                // Determine the stock label based on the product's availability
                const label = product.stock >= quantity ? 'In Stock' : 'Out of Stock';

                // Calculate and update the price for the current product
                const productPrice = calculatePrice(product.price, product.discount, quantity);
                result[productId].price += productPrice;

                // Add the product details to the formattedCart object
                result[productId].products.push({
                    _id: item._id,
                    quantity,
                    productInfo: { ...product, stockLabel: label },
                });

                // Update the total price
                totalPrice += productPrice;

                return result;
            }, {});

            // Calculate shipping_fee based on the total number of products
            
            const shippingFee = 70 * Object.keys(formattedCart).length;

            // Send the formatted response
            res.status(201).json({
                cart_products: Object.values(formattedCart),
                price: totalPrice,
                cart_products_count: cartProductsCount,
                shipping_fee: shippingFee,
                outOfStockProduct: outOfStockProducts,
            })

        } catch (error) {
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