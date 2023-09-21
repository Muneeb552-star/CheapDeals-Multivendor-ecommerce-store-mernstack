const categoryModel = require('../../models/categoryModel')
const productModel = require('../../models/productModel')
const reviewModel = require('../../models/reviewModel')
const filterProducts = require('../../utils/filterProducts')
const { responseReturn } = require('../../utils/response')
const moment = require('moment')
const { mongo: { ObjectId } } = require('mongoose')


class homeController {

    formateProduct = (products) => {
        const productArray = []
        let i = 0
        while (i < products.length) {
            let temp = []
            let j = i
            while (j < i + 3) {
                if (products[j]) {
                    temp.push(products[j])
                }
                j++
            }
            productArray.push([...temp])
            i = j
        }
        return productArray
    }

    get_categories = async (req, res) => {
        try {
            const categories = await categoryModel.find({})
            responseReturn(res, 200, { categories})
        } catch (error) {
            responseReturn(res, 500, { message: 'Internal Server Error' })
        }
    }

    get_products = async (req, res) => {
        try {
            const products = await productModel.find({}).limit(16).sort({ creditAt: -1 })
            const all_product_1 = await productModel.find({}).limit(9).sort({ creditAt: -1 })
            const all_product_2 = await productModel.find({}).limit(9).sort({ rating: -1 })
            const all_product_3 = await productModel.find({}).limit(9).sort({ discount: -1 })

            const latest_products = this.formateProduct(all_product_1)
            const top_rated_products = this.formateProduct(all_product_2)
            const discount_products = this.formateProduct(all_product_3)
            responseReturn(res, 200, { products, latest_products, top_rated_products, discount_products })
        } catch (error) {
            responseReturn(res, 500, { message: 'Internal Server Error' })
        }
    }

    get_product = async (req, res) => {
        const { slug } = req.params 
        try {
            const product = await productModel.findOne({ slug })

            const relatedProducts = await productModel.find({ 
                $and: [{
                        _id: {
                            $ne: product._id
                        }
                    },
                    {
                        category: {
                            $eq: product.category
                        }
                    }
                ]
            }).limit(20)

            responseReturn(res, 200, { product, relatedProducts })

        } catch (error) {
            responseReturn(res, 500, { message: 'Internal Server Error' })
        }
    }

    product_price_range = async (req, res) => {
        try {
            const price_range = {
                low: 0,
                high : 0
            }
            const get_product_with_price = await productModel.find({}).sort({ price: 1 })

            if (get_product_with_price.length > 0) {
                price_range.high = get_product_with_price[get_product_with_price.length - 1].price
                price_range.low = get_product_with_price[0].price
            }
            responseReturn(res, 200, { price_range })
        } catch (error) {
            responseReturn(res, 500, { message: 'Internal Server Error' })
        }
    }

    filter_products = async (req, res) => {
        const per_page = 5
        req.query.per_page = per_page
        try {
            const products = await productModel.find({}).sort({ creditAt: -1 })
            const totalProducts = new filterProducts(products, req.query).categoryFilter().searchFilter().ratingFilter().priceFilter().sortByPrice().countProducts()
            const result = new filterProducts(products, req.query).categoryFilter().searchFilter().ratingFilter().priceFilter().sortByPrice().skip().limit().getProducts()
            responseReturn(res, 200, { products: result, totalProducts, per_page })
        } catch (error) {
            responseReturn(res, 500, { message: 'Internal Server Error' })
        }
    }

    submit_review = async (req, res) => {
        const { name, rating, review, productId } = req.body
        try {
            await reviewModel.create({
                productId,
                name,
                rating,
                review,
                date: moment(Date.now()).format('LL')
            })

            let new_rating = 0
            const reviews = await reviewModel.find({ productId })
            for (let i = 0; i < reviews.length; i++) {
                new_rating = new_rating + reviews[i].rating
            }

            let productRating = 0
            if (reviews.length !== 0) {
                productRating = (new_rating / reviews.length).toFixed(1)
            }

            await productModel.findByIdAndUpdate(productId, { rating: productRating })

            res.status(201).json({ message: "Review Submitted" })

        } catch (error) {
            res.status(500).json({ error: 'Internal Server error' })
        }
    }

    get_reviews = async (req, res) => {
        const {productId} = req.params
        let {pageNo} = req.query
        
        pageNo = parseInt(pageNo)
        const limit = 5
        const skipPage = limit * (pageNo - 1)

        try {
            let getRating = await reviewModel.aggregate([
                {
                    $match: {
                        productId: {
                            $eq: new ObjectId(productId)
                        },
                        rating: {
                            $not: {
                                $size: 0
                            }
                        }
                    }
                },
                {
                    $unwind: "$rating"
                },
                {
                   $group: {
                    _id: "$rating",
                    count: {
                        $sum: 1
                    }
                   } 
                }
            ])

            const rating_review = [{
                rating: 5,
                sum: 0
            },
            {
                rating: 4,
                sum: 0
            },
            {
                rating: 3,
                sum: 0
            },
            {
                rating: 2,
                sum: 0
            },
            {
                rating: 1,
                sum: 0
            },
        ]

            for (let i = 0; i < rating_review.length; i++) {
                for (let j = 0; j < getRating.length; j++) {
                    if (rating_review[i].rating === getRating[j]._id) {
                        rating_review[i].sum = getRating[j].count
                        break
                    }
                }
            }

            const total_reviews = await reviewModel.find({ productId }).countDocuments()
            const reviews = await reviewModel.find({ productId }).skip(skipPage).limit(limit).sort({ createdAt: -1 })

            res.status(200).json({ reviews, total_reviews, rating_review })

        } catch (error) {
            console.log(error)
        }
    }

    
}
module.exports = new homeController()