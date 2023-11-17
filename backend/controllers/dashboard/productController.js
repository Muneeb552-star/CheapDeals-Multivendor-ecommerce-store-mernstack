/**
 * Product Controller
 *
 * This class defines methods for managing products, including adding, retrieving, updating, and handling product images.
 */
const productModel = require('../../models/productModel');
const formidable = require('formidable');
const cloudinary = require('cloudinary');
const { responseReturn } = require('../../utils/response');

class ProductController {
    
    /**
     * Add Product
     *
     * Adds a new product to the database. Handles form data processing, image uploading to Cloudinary, and product creation.
     */
    addProduct = async(req, res) => {
        const { id } = req.user;
        const form = formidable({ multiples: true });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                responseReturn(res, 400, { error: 'Form data could not be processed' });
                return;
            }

            let { name, description, category, discount, price, brand, shopName, stock } = fields;
            let images = files.images;

            name = name.trim();
            const slug = name.split(" ").join("-");

            cloudinary.config({ 
                cloud_name: process.env.cloud_name, 
                api_key: process.env.api_key, 
                api_secret: process.env.api_secret,
                secure: true 
            });

            try {
                let allImagesUrl = [];
                for (let i = 0; i < images.length; i++) {
                    const result = await cloudinary.uploader.upload(images[i].filepath, { folder: 'products' });
                    allImagesUrl.push(result.secure_url);
                }

                const product = await productModel.create({
                    sellerId: id,
                    name,
                    slug,
                    shopName,
                    description: description.trim(),
                    category: category.trim(),
                    price: parseInt(price),
                    discount: parseInt(discount),
                    stock: parseInt(stock),
                    images: allImagesUrl,
                    brand: brand.trim(),
                });
                responseReturn(res, 201, { product, message: 'Product Added Successfully' });

            } catch (error) {
                responseReturn(res, 500, { error: 'Internal Server Error' });
            }
        });
    }

    /**
     * Get Products - Retrieves all products from the database.
     */
    getProducts = async(req, res) => {
        try {
            const products = await productModel.find({});
            responseReturn(res, 201, { products, message: 'Products retrieved successfully' });
        } catch (error) {
            responseReturn(res, 500, { message: 'Internal Server Error' });
        }
    }

    /**
     * Get Product - Retrieves a specific product from the database based on the provided productId.
     */
    getProduct = async(req, res) => {
        const { productId } = req.params;
        try {
            const product = await productModel.findById(productId);
            if (product) {
                responseReturn(res, 201, { product, message: 'Product retrieved successfully' });
            } else {
                responseReturn(res, 404, { message: 'Product not found' });
            }
        } catch (error) {
            responseReturn(res, 500, { message: 'Internal Server Error' });
        }
    }

    /**
     * Update Product - Updates a specific product in the database based on the provided productId.
     */
    updateProduct = async(req, res) => {
        let { name, description, discount, price, brand, productId, stock } = req.body;
        name = name.trim();
        const slug = name.split(" ").join("-");

        try {
            await productModel.findByIdAndUpdate(productId, {
                name, description, slug, discount, price, brand, stock 
            });
            const product = await productModel.findById(productId);
            responseReturn(res, 200, { product, message: "Product Update Success" });
            
        } catch (error) {
            responseReturn(res, 500, { error: error.message });
        }
    }

    /**
     * Update Product Image - Updates the image of a specific product in the database based on the provided productId.
     */
    updateProductImage = async(req, res) => {
        const form = formidable({ multiples: true });
        
        form.parse(req, async (err, fields, files) => {
            const { productId, oldImage } = fields;
            const { newImage } = files;
            
            if (err) {
                responseReturn(res, 400, { error: 'Form data could not be processed' });
                return;
            }
            cloudinary.config({ 
                cloud_name: process.env.cloud_name, 
                api_key: process.env.api_key, 
                api_secret: process.env.api_secret,
                secure: true 
            });

            try {
                const result = await cloudinary.uploader.upload(newImage.filepath, { folder: 'products' });
                if (result) {
                    let { images } = await productModel.findById(productId);
                    const index = images.findIndex(img => img === oldImage);
                    images[index] = result.url;

                    await productModel.findByIdAndUpdate(productId, {images});

                    const product = await productModel.findById(productId);
                    responseReturn(res, 200, { product, message: 'Product image updated !' });

                } else {
                    responseReturn(res, 404, { error: 'Image upload failed' });
                }
            } catch (error) {
                responseReturn(res, 404, { error: 'Internal Server Error' });
            }
        });
    }
    
    /**
     * Get Products with Pagination - Retrieves products with pagination, allowing for better handling of large datasets.
     */
    getProductsPagination = async(req, res) => {
        const { page, searchValue, perPage } = req.query;
        const { id } = req.user;
        const skipPage = parseInt(perPage) * (parseInt(page) - 1);

        try { 
            if (searchValue) {
                const products = await productModel.find({
                    $text: { $search: searchValue }, sellerId: id }).skip({ skipPage }).sort({ createdAt: -1 });
                const totalProducts = await productModel.find({ sellerId: id }).countDocuments();

                responseReturn(res, 200, { totalProducts, products });

            } else {
                const products = await categoryModel.find({sellerId: id}).skip(skipPage).limit(perPage).sort({ createdAt: -1 });
                const totalProducts = await productModel.find({ sellerId: id }).countDocuments();

                responseReturn(res, 200, { totalProducts, products }); 
            }
        } catch (error) {
            responseReturn(res, 500, { message: 'Internal Server Error' });
        }
    }
}

module.exports = new ProductController();
