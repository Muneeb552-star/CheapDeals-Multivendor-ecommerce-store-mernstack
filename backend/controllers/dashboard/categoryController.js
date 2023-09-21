const categoryModel = require('../../models/categoryModel')
const formidable = require('formidable')
const cloudinary = require('cloudinary')
const { responseReturn } = require('../../utils/response')

class categoryController {
    add_category = async (req, res) => {

        const form = formidable()
        form.parse(req, async (err, fields, files) => {
            let { name } = fields
            let { image } = files

            name = name.trim()
            const slug = name.split(" ").join("-")

            cloudinary.config({ 
                cloud_name: process.env.cloud_name, 
                api_key: process.env.api_key, 
                api_secret: process.env.api_secret,
                secure: true 
              })

              try {
                const result = await cloudinary.uploader.upload(image.filepath, { folder: 'categories' })
                if (result) {
                    const category = await categoryModel.create({
                        name, 
                        slug, 
                        image: result.url
                    })
                    responseReturn(res, 201, { category, message: 'Category Added Successfully' })
                } else {
                    responseReturn(res, 404, { message: 'Image Upload Failed' })
                }
              } catch (error) {
                responseReturn(res, 500, { error: 'Internal Server Error' })
              }
        })  
    }

    get_categories = async (req, res) => {
        try {
            const categories = await categoryModel.find({})
            responseReturn(res, 201, { categories, message: 'Category retrieved successfully' })
        } catch (error) {
            responseReturn(res, 500, { message: 'Internal Server Error' })
        }
    }

    /* 
        Get products controller with pagination. 
    */
    get_categories_with_pagination = async (req, res) => {
        const { page, searchValue, perPage } = req.query
        // const skipPage = parseInt(perPage) * (parseInt(page) - 1)

        try {
            let skipPage = ''
            if ( perPage && page ) {
                skipPage = parseInt(perPage) * (parseInt(page) - 1)
            } 
            if (searchValue && page && perPage) {
                const categories = await categoryModel.find({
                    $text: { $search: searchValue } }).skip({ skipPage }).sort({ createdAt: -1 })
                const totalCategories = await categoryModel.find({
                    $text: { search: searchValue } }).countDocuments()
                responseReturn(res, 200, { totalCategories, categories })
                
            } else if (searchValue === '' && page && perPage) {
                const categories = await categoryModel.find({}).skip(skipPage).limit(perPage).sort({ createdAt: -1 })
                const totalCategories = await categoryModel.find({}).countDocuments()
                responseReturn(res, 200, { totalCategories, categories })
            } else {
                const categories = await categoryModel.find({}).sort({ createdAt: -1 })
                const totalCategories = await categoryModel.find({}).countDocuments()
                responseReturn(res, 200, { totalCategories, categories }) 
            }
        } catch (error) {
            responseReturn(res, 500, { message: 'Internal Server Error' })
        }
    }
}
module.exports = new categoryController()