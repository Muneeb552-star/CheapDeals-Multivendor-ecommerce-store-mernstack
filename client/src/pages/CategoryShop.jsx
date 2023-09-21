import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Headers from "../components/Headers"
import Footer from "../components/Footer"
import Products from '../components/products/Products'
import ShopProducts from '../components/products/ShopProducts'
import { useDispatch, useSelector } from 'react-redux'
import { product_price_range, filter_products } from '../store/reducers/homeReducer'
// MUI Imports
import { Slider, Rating, Select, MenuItem, Pagination, PaginationItem, Box } from '@mui/material'
// React-icons Import
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { BsGridFill } from 'react-icons/bs'
import { FaListUl } from 'react-icons/fa'
 


const CategoryShop = () => {

  const dispatch = useDispatch()
  const { products, total_products, per_page, price_range } = useSelector(state => state.home)

  /* Get the category value from URL bar */
  let [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category')

  /* State Variables for Filter products and sort products */
  const [range, setRange] = useState([50, 1000])              // filter products by price range
  const [styles, setStyles] = useState('grid')                // show products in grid/list form
  const [sortByPrice, setSortByPrice] = useState('Sort By')
  const [rating, setRating] = useState('')                    // set rating filter query

  /* pagination state variables */
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(total_products / per_page)

  /* Pagination handle function */
  const handleChangePage = (event, newPage) => setCurrentPage(newPage)

  /* Function for handling price range filter  */
  const handleChange = (event, newValue) => setRange(newValue)

  useEffect(() => {
    dispatch(product_price_range())
  }, [dispatch])

  /* This hook will set the price range filter from low to high */
  useEffect(() => {
    setRange([price_range.low, price_range.high])
  }, [price_range])


  
  /* This hook will show products with multiple filters */
  /* i.e Price Range, category filter, rating filter and 'low-to-high price and high-to-low price */
  useEffect(() => {
    dispatch(
      filter_products({
        low: range[0] || '',
        high: range[1] || '',
        category,
        rating,
        sortByPrice,
        currentPage
      })
    )
      console.log(`${range[0]} ${range[1]} ${category} ${rating} ${sortByPrice} ${currentPage}`)
  }, [range[0], range[1], category, rating, sortByPrice, currentPage])

  /* This function will reset the rating to by default
  and will show product with all ratings */

  const resetRating = () => {
    setRating('')
    dispatch(
      filter_products({
        low: range[0],
        high: range[1],
        category,
        rating : '',
        sortByPrice,
        currentPage
      })
    )
  }


  return (
    <>
      <Headers/>
      {/* Shop Banner */}
      <section className='pt-[80px] pb-[50px] my-6 bg-orange-100 relative'>
        <div className='w-[90%] h-full mx-auto'>
          <div className="flex flex-col items-start justify-start h-full w-full font-roboto gap-3">
            <h2 className='text-5xl font-semibold'>Shop</h2>
            <div className="flex justify-start items-center gap-2 text-xl w-full">
              <Link to="/" className='text-[#ed6c02]'>Home</Link>
              <span className='pt-1'><MdOutlineKeyboardArrowRight /></span>
              <span>Products</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className='w-[90%] h-full mx-auto'>
          <div className="w-full flex gap-5 ">

            {/* Apply Filter Section */}
            <div className='w-3/12 lg:w-4/12 md:hidden my-3'>
              <div className="px-2 flex flex-col items-start justify-start gap-5  w-full">
                <div className='pb-4 border-b border-gray-300 w-full'><h2 className='text-2xl font-medium'>Filter By</h2></div>

                {/* Price Range Filter */}
                <div className="flex flex-col gap-2 mb-3 w-full">
                  <h2 className='text-base font-medium'>Price</h2>
                  <div className='px-2'>
                    <Slider 
                      value={range} 
                      onChange={handleChange} 
                      valueLabelDisplay="auto" 
                      min={price_range.low} 
                      max={price_range.high} 
                      color="warning" 
                      aria-labelledby="range-slider"
                    />
                  </div>
                    <label className='text-sm font-semibold text-[#ed6c02]'>Price: ${Math.floor(range[0])} - ${Math.floor(range[1])}</label>
                </div>

                {/* Rating Filter */}
                <div className="flex flex-col gap-2 mb-3 w-full">
                  <h2 className='text-base font-medium'>Rating</h2>
                  <div className='flex flex-col'>
                    <Box className="cursor-pointer" onClick={() => setRating(5)}>
                      <Rating name="half-rating-read" className='py-1' defaultValue={5} readOnly/>
                    </Box>
                    <Box className="cursor-pointer" onClick={() => setRating(4)}>
                      <Rating name="half-rating-read" className='py-1' defaultValue={4} readOnly/>
                    </Box>
                    <Box className="cursor-pointer" onClick={() => setRating(3)}>
                      <Rating name="half-rating-read" className='py-1' defaultValue={3} readOnly/>
                    </Box>
                    <Box className="cursor-pointer" onClick={() => setRating(2)}>
                      <Rating name="half-rating-read" className='py-1' defaultValue={2} readOnly/>
                    </Box>
                    <Box className="cursor-pointer" onClick={() => setRating(1)}>
                      <Rating name="half-rating-read" className='py-1' defaultValue={1} readOnly/>
                    </Box>
                    <Box className="cursor-pointer" onClick={resetRating}>
                      <Rating name="half-rating-read" className='py-1' defaultValue={0} readOnly/>
                    </Box>
                    
                  </div>
                </div>

                <div className='py-5 flex flex-col gap-4 mb-5 w-full'>
                  {/* <Products title="Trending Products"/> */}
                </div>

              </div>
            </div>

            {/* Shop Products */}
            <div className='w-9/12 lg:w-8/12 md:w-full my-3'>
              {/* Shop Products filter bar */}
              <div className="py-4 px-3 bg-white mb-10 rounded-md flex justify-between items-center border">
                <h2 className='text-lg font-medium text-slate-600'>{total_products} Products</h2>
                <div className='flex justify-center items-center gap-3'>
                  {/* MUI Select component */}
                    <Select
                      className="w-[200px] text-slate-600 h-full"
                      id="select-category-small"
                      name='category'
                      value={sortByPrice}
                      size="small"
                      onChange={(e) => setSortByPrice(e.target.value)}
                    >
                      <MenuItem value="Sort By">Sort By</MenuItem>
                      <MenuItem value="low-to-high">Low to High Price</MenuItem> 
                      <MenuItem value="high-to-low">High to Low Price</MenuItem>
                    </Select>

                    <div className='flex flex-wrap justify-center items-center gap-4 sm:hidden'>
                      <div onClick={() => setStyles('grid')} className={`p-2 ${styles === 'grid' && 'bg-slate-300'} text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}>
                        <BsGridFill />
                      </div>
                      <div onClick={() => setStyles('list')} className={`p-2 ${styles === 'list' && 'bg-slate-300'} text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}>
                        <FaListUl />
                      </div>
                    </div>
                </div>
              </div>
              
              {/* Shop Products */}
              <div className='pb-8'>
                <ShopProducts products={products} styles={styles} />
              </div>

              {/* Pagination component */}
              <div className="flex items-center justify-center mt-5">
                {
                  total_products > per_page && <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handleChangePage}
                  color="warning"
                  renderItem={(item) => (
                    <PaginationItem component="div" {...item} />
                  )}
                />
                }
              </div>

             
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default CategoryShop