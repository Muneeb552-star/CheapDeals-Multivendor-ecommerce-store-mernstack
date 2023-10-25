import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Headers from "../components/Headers"
import Footer from "../components/Footer"
// import Products from '../components/products/Products'
import ShopProducts from '../components/products/ShopProducts'
import { useDispatch, useSelector } from 'react-redux'
import { product_price_range, filter_products } from '../store/reducers/homeReducer'
// MUI Imports
import { Slider, Checkbox, FormControlLabel, Rating, Select, MenuItem, Pagination, PaginationItem, Box } from '@mui/material'
// React-icons Import
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { BsGridFill } from 'react-icons/bs'
import { FaListUl } from 'react-icons/fa'
import { createTheme, ThemeProvider } from '@mui/material';

// Define a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#6466E8', 
    },
  },
});
 


const Shop = () => {
  const { categories, products, total_products, per_page, price_range } = useSelector(state => state.home)
  const dispatch = useDispatch()

  const [category, setCategory] = useState('')  
  const [range, setRange] = useState([50, 1000])              
  const [styles, setStyles] = useState('grid')                
  const [sortByPrice, setSortByPrice] = useState('Sort By')
  const [rating, setRating] = useState('')                    

  /* pagination state variables */
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(total_products / per_page)

  /* Pagination handle function */
  const handleChangePage = (event, newPage) => setCurrentPage(newPage)
  
  /* Function for handling category filter check/uncheck */
  const handleCheck = (e, value) => {
    if (e.target.checked) {
      setCategory(value)
    } else {
      setCategory('')
    }
  }

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
    const filterOptions = {
      low: range[0],
      high: range[1],
      category,
      rating,
      sortByPrice,
      currentPage
    }
    dispatch(filter_products(filterOptions))
  }, [range, category, rating, sortByPrice, currentPage, dispatch])


  /* This function will reset the rating to by default and will show product with all ratings */
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
    <ThemeProvider theme={theme}>
    <>
      <Headers/>
      {/* Shop Banner */}
      <section className='relative pt-[80px] pb-[50px] my-6 bg-blue-50'>
        <div className='w-[90%] h-full mx-auto'>
          <div className="flex flex-col items-start justify-start h-full w-full font-roboto gap-3">
            <h2 className='text-5xl font-semibold'>Shop</h2>
            <div className="flex justify-start items-center gap-2 text-xl w-full">
              <Link to="/" className='text-[#6466E8]'>Home</Link>
              <span className='pt-1'><MdOutlineKeyboardArrowRight /></span>
              <span>Products</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className='w-[90%] h-full mx-auto mb-8'>
          <div className="w-full flex gap-5 ">

            {/* Apply Filter Section */}
            <div className='w-3/12 lg:w-4/12 md:hidden my-3'>
              <div className="px-2 flex flex-col items-start justify-start gap-5  w-full">
                <div className='pb-4 border-b border-gray-300 w-full'><h2 className='text-2xl font-medium'>Filter By</h2></div>

                {/* Product Category Filter */}
                <div className="flex flex-col gap-2 mb-3">
                  <h2 className='text-base font-medium'>Product Category</h2>
                  <div className="flex flex-col">
                      {
                        categories.map((c, index) => 
                          <FormControlLabel 
                            key={c._id} 
                            control={<Checkbox 
                              // checked={category[category._id] || false}
                              // onChange={(event) => handleCheck(event, category._id)}
                              checked={category === c.name ? true : false}
                              onChange={(e) => handleCheck(e, c.name)}
                              size="small" 
                              color='primary' 
                          />} 
                          label={c.name}
                        />)
                      }
                  </div>
                </div>

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
                      color="primary" 
                      aria-labelledby="range-slider"
                    />
                  </div>
                    <label className='text-sm font-semibold text-[#6466E8]'>Price: ${Math.floor(range[0])} - ${Math.floor(range[1])}</label>
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
                  total_products > per_page && 
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handleChangePage}
                    color="primary"
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
    </ThemeProvider>
  )
}

export default Shop