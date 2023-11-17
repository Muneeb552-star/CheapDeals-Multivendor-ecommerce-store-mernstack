import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { add_to_cart, add_to_wishlist, clearMessage } from '../../store/reducers/cartReducer'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
// React Icons Import
import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md"
// MUI Imports
import { Rating, Checkbox } from '@mui/material'



const FeaturedProducts = ({ products }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.auth)
  const { errorMessage, successMessage } = useSelector(state => state.cart)

  const add_cart = (id) => {
    if (userInfo) {
      dispatch(add_to_cart({
        userId: userInfo.id,
        quantity: 1,
        productId: id
      }))
    } else {
      navigate('/login')
    }
  }

  const add_wishlist = (product) => {
    if (userInfo) {
      dispatch(add_to_wishlist({
        userId: userInfo.id,
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        discount: product.discount,
        rating: product.rating,
        slug: product.slug
      }))
      
    } else {
      navigate('/login')
    }
  }

  useEffect(() => {
    if(errorMessage) {
      toast.error(errorMessage)
      dispatch(clearMessage())
    }

    if(successMessage) {
      toast.success(successMessage)
      dispatch(clearMessage()) 
    }

  }, [errorMessage, successMessage, dispatch])



  return (
    <div className='w-[95%] flex flex-wrap mx-auto'>

      {/* Featured Products Heading Text */}
      <div className="w-full border-b mb-10">
        <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[25px]">
          <h2>Featured Products</h2>
          <div className='w-[100px] h-[4px] bg-[#7fad39] mt-4'></div>
        </div>
      </div>

      {/* Featured Products Product Card */}
      <div className='w-full grid grid-cols-5 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-6'>
        {/* Product Card */}
        
        {
          products.map((product, index) =>
            <div key={index} className="relative w-full max-w-sm bg-white border hover:shadow-lg rounded-lg dark:bg-gray-800 dark:border-gray-700">
              
              {/* Discount - left */}
              {
                product.discount 
                ? <div className='absolute top-2 left-1 flex justify-start items-center'>
                    <span className="bg-red-500 text-white text-xs font-semibold mr-2 ml-3 px-3 py-1 rounded-lg">{product.discount}%</span>
                  </div> 
                : ''
              }

              {/* Add to Wishlist - Right */}
              <div className='absolute top-2 right-2'>
                <span
                  onClick={() => add_wishlist(product)} 
                  className="w-[38px] h-[38px] flex justify-center items-center text-xl bg-white rounded-full border hover:shadow-md cursor-pointer transition-all flex-shrink-0" 
                >
                  <Checkbox
                    icon={<MdOutlineFavoriteBorder className='text-gray-500 text-xl'/>}
                    checkedIcon={<MdFavorite className='text-[#6466E8] text-xl'/>}
                  />
                </span> 
              </div>

              {/* Product Header : Image */}
              <Link to={`/product/details/${product.slug}`}>
                <img className="p-8 rounded-t-lg h-[240px] block mx-auto" src={product.images[0]} alt={product.name} />
              </Link>

              {/* Product Body */}
              <div className="px-4 pb-3 w-full">
                
                {/* Product Title & price */}
                <div className="flex flex-col gap-1">
                  <Link to={`/product/details/${product.slug}`} className='min-h-[50px]'>
                    <h5 className="text-sm font-medium text-gray-900 hover:text-[#6466E8]">
                      {product.name.length > 57 ? `${product.name.slice(0, 57)}...` : product.name}
                    </h5>
                  </Link>
                  <span className="text-xl font-bold text-[#EF262C]">${product.price}.00</span>
                </div>

                {/* Product Rating - MUI Rating Component */}
                <div className="flex flex-wrap items-center mt-2.5 mb-5">
                  <Rating name="half-rating-read" value={product.rating}  precision={0.5} size="small" readOnly />
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 ml-3 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">5.0</span>
                </div>

                {/* Product Buttons */}
                <div className="flex items-center justify-start flex-wrap gap-4 w-full translate-all duration-500">
                  <span 
                    onClick={() => add_cart(product._id)} 
                    className="text-white bg-[#6466E8] font-medium rounded-lg text-sm px-3.5 py-2.5 text-center hover:opacity-75 cursor-pointer transition-all whitespace-nowrap w-full">
                      Add to cart
                  </span>
                </div>

              </div>
            </div>
          )
        }

      </div>
    </div>
  )
}

export default FeaturedProducts