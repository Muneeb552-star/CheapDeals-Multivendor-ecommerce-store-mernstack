import React from 'react'
import { Link } from 'react-router-dom'
// React Icons Import
import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md"
// MUI Imports
import { Rating, Checkbox  } from '@mui/material';



const ShopProducts = ({ styles, products }) => {
  return (
    <div className={`w-full grid ${styles === 'grid' ? 'grid-cols-3 md:grid-cols-2 sm:grid-cols-1' : 'grid-cols-1 md:grid-cols-2 sm:grid-cols-1'} gap-3`}>

        {
          products.map((product, i) => <div key={i} className={`relative flex transition-all duration-1000 shadow-md ${styles === 'grid' ? 'flex-col justify-start items-start' : 'justify-start items-center md:flex-row md:justify-start md:items-start'} w-full gap-4 bg-white p-1 border rounded-md`}>

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
              <span className="w-[38px] h-[38px] flex justify-center items-center text-xl bg-white rounded-full border hover:shadow-md cursor-pointer transition-all flex-shrink-0" >
                <Checkbox
                  icon={<MdOutlineFavoriteBorder className='text-black text-xl'/>}
                  checkedIcon={<MdFavorite className='text-[#6466E8] text-xl'/>}
                />
              </span> 
            </div>
            
            {/* Product Image */}
            <div className={`${styles === 'grid' ? 'w-full h-[240px] md:h-[210px] xs:h-[170px] overflow-hidden' : 'w-[240px] h-auto overflow-hidden'}`}>
              <Link to='/product/details/product1'>
                <img className={`p-8 rounded-t-lg h-[240px] md:h-[270px] xs:h-[170px] block mx-auto`} src={product.images[0]} alt={product.name} />
              </Link>
            </div>

            <div className={`${styles === 'grid' ? 'px-5 pb-5' : 'px-3 pt-5 h-full '}  w-full flex justify-start items-start flex-col gap-1`}>

              {/* Product Title & price */} 
              <div className="flex flex-col gap-3">
                <Link to="/product/details/product1" className='min-h-[50px]'>
                  <h5 className="text-md font-semibold tracking-tight text-gray-900 hover:text-[#6466E8]">
                    {product.name.length > 57 ? `${product.name.slice(0, 57)}...` : product.name}
                  </h5>
                </Link>
                <span className="text-lg font-bold text-[#EF262C]">${product.price}</span>
              </div>

              {/* Product Rating - MUI Rating Component */}
              <div className="flex flex-wrap items-center mt-2.5 mb-5">
                <Rating name="half-rating-read" value={product.rating} precision={0.5} size="small" readOnly />
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 ml-3 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">{product.rating}</span>
              </div>

              {/* Product Buttons */}
              <div className="flex items-center justify-start flex-wrap gap-4 w-full translate-all duration-500">
                <span className={`text-white bg-[#6466E8] font-medium rounded-lg text-sm px-3.5 py-2.5 text-center cursor-pointer transition-all whitespace-nowrap ${styles === 'grid' ? 'w-full' : ''}`}>Add to cart</span>
              </div>

            </div>
          </div>)
        }
    </div>
  )
}

export default ShopProducts