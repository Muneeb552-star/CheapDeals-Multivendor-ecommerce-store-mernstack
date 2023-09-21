import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { get_wishlist_products, delete_wishlist_product, clearMessage } from '../../store/reducers/cartReducer'
import { toast } from 'react-hot-toast'
// React Icons Import
import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md"
// MUI Imports
import { Rating, Checkbox } from '@mui/material'

const Wishlist = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.auth)
  const { wishlist, successMessage } = useSelector(state => state.cart)

  /* This hook will get all wishlist items */
  useEffect(() => {
    dispatch(get_wishlist_products(userInfo.id))
  }, [dispatch, userInfo])


  useEffect(() => {
    if(successMessage) {
      toast.success(successMessage)
      dispatch(clearMessage())
    }

  }, [successMessage])
  
  return (
    <div className='w-full grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6'>
      {
        wishlist && wishlist.map((product, i) => <div key={i} className="relative w-full max-w-sm bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          {/* Discount - left */}
          {
            product.discount
            ? <div className='absolute top-2 left-1 flex justify-start items-center'>
                <span className="bg-orange-100 text-[#ed6c02] text-xs font-semibold mr-2 ml-3 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">{product.discount}%</span>
              </div>
            : ''
          } 

          {/* Add to Wishlist - Right */}
          <div className='absolute top-2 right-2'>
            <span 
              onClick={() => dispatch(delete_wishlist_product(product._id))}
              className="w-[38px] h-[38px] flex justify-center items-center text-xl bg-white rounded-full border hover:shadow-md cursor-pointer transition-all flex-shrink-0" 
            >
              <Checkbox
                icon={<MdOutlineFavoriteBorder className='text-[#ed6c02] text-xl'/>}
                checkedIcon={<MdFavorite className='text-[#ed6c02] text-xl'/>}
                checked={true}
              />
            </span> 
          </div>

          {/* Product Header : Image */}
          <Link to="/product/details/product1">
            <img className="p-8 rounded-t-lg h-[240px] block mx-auto" src={product.image} alt='wishlist' />
          </Link>

          {/* Product Body */}
          <div className="px-5 pb-5 w-full">
            {/* Product Title & price */}
            <div className="flex flex-col gap-3">
              <Link to={`/product/details/${product.slug}`} className='min-h-[50px]'>
                <h5 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
              </Link>
              <span className="text-lg font-bold text-[#ed6c02]">${product.price}</span>
            </div>

            {/* Product Rating - MUI Rating Component */}
            <div className="flex flex-wrap items-center mt-2.5 mb-5">
              <Rating name="half-rating-read" value={product.rating}  precision={0.5} size="small" readOnly />
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 ml-3 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">5.0</span>
            </div>

            {/* Product Buttons */}
            <div className="flex items-center justify-start flex-wrap gap-4 w-full translate-all duration-500">
              <span className="text-white bg-[#ed6c02] font-medium rounded-lg text-sm px-3.5 py-2.5 text-center hover:bg-[#ea580c] cursor-pointer transition-all whitespace-nowrap w-full">Add to cart</span>
            </div>

          </div>
          </div>
        )
      }
    </div>
  )
}

export default Wishlist