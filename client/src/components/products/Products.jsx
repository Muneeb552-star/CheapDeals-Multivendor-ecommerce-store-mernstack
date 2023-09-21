import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Link } from 'react-router-dom'
// React-Icons Import
import { MdArrowBackIosNew, MdArrowForwardIos, MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'
import { AiOutlineShoppingCart } from 'react-icons/ai'
// MUI Imports
import { Rating } from '@mui/material'

const Products = ({ title, products }) => {

  /* Here we will set the Carousel responsiveness. Responsive Screen Sizes for different screens/devices */
  const responsive = {
    superLargeDesktop : {
        breakpoint : { max: 4000, min: 3000 },
        items : 1
    },
    desktop : {
        breakpoint : { max: 3000, min: 1024 },
        items : 1
    },
    tablet : {
        breakpoint : { max: 1024, min: 464 },
        items : 1
    },
    mobile : {
        breakpoint : { max: 464, min: 0 },
        items : 1
    }
  }

  /* Buttons for sliding the product list array */
  const ButtonGroup = ({ next, previous }) => {
    return (
        <div className="flex justify-between items-center">
            <div className='text-xl font-bold text-slate-600'>{title}</div>
            <div className="flex justify-center items-center gap-3 text-slate-600">
                <button onClick={() => previous()} className='w-[35px] h-[35px] flex justify-center items-center hover:bg-[#ed6c02] hover:text-white rounded-full border border-slate-200'>
                    <span><MdArrowBackIosNew /></span>
                </button>
                <button onClick={() => next()} className='w-[35px] h-[35px] flex justify-center items-center hover:bg-[#ed6c02] hover:text-white rounded-full border border-slate-200'>
                    <span><MdArrowForwardIos /></span>
                </button>
            </div>
        </div>
    )
  }

  return (
    <div className='flex gap-8 flex-col-reverse'>
      <Carousel
        autoPlay={false}
        infinite={false}
        arrows={false}
        responsive={responsive}
        transitionDuration={500}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup/>}
      >
        { products.map((product, i) => {
          return (
            <div key={i} className="flex flex-col justify-start gap-3 w-[100%]">
              {
                product.map((pl, j) => 
                <Link key={j} className='w-[100%] min-h-[183px] flex justify-start items-center py-3 px-3 mb-[12px] rounded-md shadow gap-4 border' to="/product/details/product1">
                  {/* Discount - left */}
                  {
                    pl.discount 
                    ? <div className='absolute top-2 left-1 flex justify-start items-center'>
                        <span className="bg-red-500 text-white text-xs font-semibold mr-2 ml-3 px-3 py-1 rounded-lg">{pl.discount}%</span>
                      </div> 
                    : ''
                  }
                  
                  {/* Image div */}
                  <div className='w-[30%] h-[130px]'>
                    <img className=' w-[100%] h-[100%] rounded-md' src={pl.images[0]} alt={pl.name} />
                  </div>

                  {/* Title - Price - Rating & Buttons */}
                  <div className="w-[70%] flex justify-start items-start gap-2 flex-col text-slate-600">

                    <h2 className="text-md font-base text-gray-900 hover:text-[#6466E8] capitalize">
                      {pl.name.length > 57 ? `${pl.name.slice(0, 57)}...` : pl.name}
                    </h2>
                    
                    {/* Product Rating - MUI Rating Component */}
                    <div className="flex flex-wrap items-center">
                      <Rating name="half-rating-read" value={parseInt(pl.rating)}  precision={0.5} size="small" readOnly />
                    </div>

                    {/* Price text */}
                    <span className="text-md font-bold text-[#EF262C]">${pl.price}.00</span>

                    {/* Add to cart & wishlist buttons */}
                    <div className="flex items-start justify-start gap-3">

                      <div className="w-[40px] h-[40px] p-2 flex items-center justify-center bg-slate-100 hover:bg-[#6466E8] hover:text-white rounded-md">
                        <span className='text-xl font-bold'><AiOutlineShoppingCart /></span>
                      </div>

                      <div className="w-[40px] h-[40px] p-2 flex items-center justify-center bg-slate-100 hover:bg-[#6466E8] hover:text-white rounded-md">
                        <span className='text-xl font-bold'><MdOutlineFavoriteBorder /></span>
                      </div>

                    </div>

                  </div>

              </Link>)
              }
            </div>
          )
        }
        
      )}
      </Carousel>
    </div>
  )

}
export default Products