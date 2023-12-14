const categoryModel = require('../../models/categoryModel') 
const productModel = require('../../models/productModel') 
const reviewModel = require('../../models/reviewModel')
const filterProducts = require('../../utils/filterProducts')
const { responseReturn } = require('../../utils/response')
const moment = require('moment'); // Import the moment library for date manipulation
const { mongo: { ObjectId } } = require('mongoose')

// Create a class for the home controller
class homeController {

    // Method to format products into arrays of three products each
    formateProduct = (products) => {
        const productArray = [];
        let i = 0;
        while (i < products.length) {
            let temp = [];
            let j = i;
            while (j < i + 3) {
                if (products[j]) {
                    temp.push(products[j]);
                }
                j++;
            }
            productArray.push([...temp]);
            i = j;
        }
        return productArray;
    }

    // Method to get all categories
    get_categories = async (req, res) => {
        try {
            const categories = await categoryModel.find({}); // Retrieve all categories from the database
            responseReturn(res, 200, { categories }); // Send a successful response with the categories
        } catch (error) {
            responseReturn(res, 500, { message: 'Internal Server Error' }); // Handle errors with a 500 Internal Server Error response
        }
    }

    // Method to get various sets of products
    get_products = async (req, res) => {
        try {
            // Retrieve the latest, top-rated, and discounted products from the database
            const products = await productModel.find({}).limit(16).sort({ creditAt: -1 });
            const all_product_1 = await productModel.find({}).limit(9).sort({ creditAt: -1 });
            const all_product_2 = await productModel.find({}).limit(9).sort({ rating: -1 });
            const all_product_3 = await productModel.find({}).limit(9).sort({ discount: -1 });

            // Format the product sets
            const latest_products = this.formateProduct(all_product_1);
            const top_rated_products = this.formateProduct(all_product_2);
            const discount_products = this.formateProduct(all_product_3);

            // Send a successful response with the product sets
            responseReturn(res, 200, { products, latest_products, top_rated_products, discount_products });
        } catch (error) {
            responseReturn(res, 500, { message: 'Internal Server Error' }); // Handle errors with a 500 Internal Server Error response
        }
    }

    // Method to get a single product and related products by slug
    get_product = async (req, res) => {
        const { slug } = req.params; // Extract the product slug from the request parameters
        try {
            // Retrieve the requested product by slug
            const product = await productModel.findOne({ slug });

            // Retrieve related products in the same category (excluding the requested product)
            const relatedProducts = await productModel.find({
                $and: [
                    { _id: { $ne: product._id } },
                    { category: { $eq: product.category } }
                ]
            }).limit(20);

            // Send a successful response with the product and related products
            responseReturn(res, 200, { product, relatedProducts });
        } catch (error) {
            responseReturn(res, 500, { message: 'Internal Server Error' }); // Handle errors with a 500 Internal Server Error response
        }
    }

    // Method to calculate and return the price range of products
    product_price_range = async (req, res) => {
        try {
            const price_range = {
                low: 0,
                high: 0
            };

            // Retrieve all products sorted by price
            const get_product_with_price = await productModel.find({}).sort({ price: 1 });

            // Calculate the price range if products exist
            if (get_product_with_price.length > 0) {
                price_range.high = get_product_with_price[get_product_with_price.length - 1].price;
                price_range.low = get_product_with_price[0].price;
            }

            // Send a successful response with the calculated price range
            responseReturn(res, 200, { price_range });
        } catch (error) {
            responseReturn(res, 500, { message: 'Internal Server Error' }); // Handle errors with a 500 Internal Server Error response
        }
    }

    // Method to filter and paginate products based on query parameters
    filter_products = async (req, res) => {
        const per_page = 5;
        req.query.per_page = per_page;
        try {
            const products = await productModel.find({}).sort({ creditAt: -1 }); // Retrieve all products
            // Create a filterProducts instance to apply filtering and pagination
            const totalProducts = new filterProducts(products, req.query)
                .categoryFilter()
                .searchFilter()
                .ratingFilter()
                .priceFilter()
                .sortByPrice()
                .countProducts();

            // Retrieve filtered and paginated products
            const result = new filterProducts(products, req.query)
                .categoryFilter()
                .searchFilter()
                .ratingFilter()
                .priceFilter()
                .sortByPrice()
                .skip()
                .limit()
                .getProducts();

            // Send a successful response with the filtered and paginated products
            responseReturn(res, 200, { products: result, totalProducts, per_page });
        } catch (error) {
            responseReturn(res, 500, { message: 'Internal Server Error' }); // Handle errors with a 500 Internal Server Error response
        }
    }

    // Method to submit a product review
    submit_review = async (req, res) => {
        const { name, rating, review, productId } = req.body; // Extract review data from the request body
        try {
            // Create a new review document in the database
            await reviewModel.create({
                productId,
                name,
                rating,
                review,
                date: moment(Date.now()).format('LL') // Format the review date
            });

            let new_rating = 0;
            // Retrieve all reviews for the product
            const reviews = await reviewModel.find({ productId });
            // Calculate the new product rating based on all reviews
            for (let i = 0; i < reviews.length; i++) {
                new_rating = new_rating + reviews[i].rating;
            }

            let productRating = 0;
            // Calculate the average product rating
            if (reviews.length !== 0) {
                productRating = (new_rating / reviews.length).toFixed(1);
            }

            // Update the product's rating in the database
            await productModel.findByIdAndUpdate(productId, { rating: productRating });

            // Send a 201 Created response to indicate successful review submission
            res.status(201).json({ message: "Review Submitted" });

        } catch (error) {
            res.status(500).json({ error: 'Internal Server error' }); // Handle errors with a 500 Internal Server Error response
        }
    }

    // Method to get product reviews with pagination and rating statistics
    get_reviews = async (req, res) => {
        const { productId } = req.params; // Extract the product ID from the request parameters
        let { pageNo } = req.query; // Extract the page number from the request query

        pageNo = parseInt(pageNo);
        const limit = 5;
        const skipPage = limit * (pageNo - 1);

        try {
            // Aggregate to calculate the count of each rating for a specific product
            let getRating = await reviewModel.aggregate([
                { $match: { productId: { $eq: new ObjectId(productId) }, rating: { $not: { $size: 0 } } } },
                { $unwind: "$rating" },
                { $group: { _id: "$rating", count: { $sum: 1 } } }
            ]);

            // Define an array to store rating and count information
            const rating_review = [
                { rating: 5, sum: 0 },
                { rating: 4, sum: 0 },
                { rating: 3, sum: 0 },
                { rating: 2, sum: 0 },
                { rating: 1, sum: 0 },
            ];

            // Populate the rating_review array with the count of each rating
            for (let i = 0; i < rating_review.length; i++) {
                for (let j = 0; j < getRating.length; j++) {
                    if (rating_review[i].rating === getRating[j]._id) {
                        rating_review[i].sum = getRating[j].count;
                        break;
                    }
                }
            }

            // Count the total number of reviews for the product
            const total_reviews = await reviewModel.find({ productId }).countDocuments();
            // Retrieve paginated reviews for the product
            const reviews = await reviewModel.find({ productId }).skip(skipPage).limit(limit).sort({ createdAt: -1 });

            // Send a successful response with reviews, total review count, and rating statistics
            res.status(200).json({ reviews, total_reviews, rating_review });

        } catch (error) {
            res.status(500).json({ error: 'Internal Server error' }); // Handle errors with a 500 Internal Server Error response
        }
    }

    // Method to get product reviews with pagination and rating statistics
    getReviews = async (req, res) => {
        try {
            // Extract the product ID and page number from request parameters and query
            const { productId } = req.params;
            let { pageNo } = req.query;

            // Parse the page number and calculate pagination values
            pageNo = parseInt(pageNo);
            const limit = 5;
            const skipPage = limit * (pageNo - 1);

            // Aggregate to calculate the count of each rating for a specific product
            const getRating = await reviewModel.aggregate([
                { $match: { productId: new ObjectId(productId), rating: { $exists: true, $ne: [] } } },
                { $unwind: "$rating" },
                { $group: { _id: "$rating", sum: { $sum: 1 } } }
            ]);

            // Initialize an array to store rating and count information
            const rating_review = Array.from({ length: 5 }, (_, i) => ({ rating: 5 - i, sum: 0 }));

            // Populate the rating_review array with the count of each rating
            getRating.forEach(({ _id, sum }) => {
                const index = 5 - _id;
                rating_review[index].sum = sum;
            });

            // Count the total number of reviews for the product
            const total_reviews = await reviewModel.countDocuments({ productId });

            // Retrieve paginated reviews for the product
            const reviews = await reviewModel.find({ productId }).skip(skipPage).limit(limit).sort({ createdAt: -1 });

            // Send a successful response with reviews, total review count, and rating statistics
            res.status(200).json({ reviews, total_reviews, rating_review });
        } catch (error) {
            // Log the error and handle errors with a 500 Internal Server Error response
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    
}

// Export an instance of the homeController class
module.exports = new homeController();
