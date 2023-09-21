import {useState, useEffect} from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
//MUI imports
import { Box, Typography, MenuItem, Select, styled, Tabs, Tab  } from "@mui/material"
// React-Icons Import
import { BiSolidUser, BiShoppingBag, BiSolidDownArrow } from "react-icons/bi";
import { AiOutlineUser, AiOutlineClose } from 'react-icons/ai'
import { LuListMinus } from "react-icons/lu"
import { FaList, FaSearch } from "react-icons/fa"
import { FiPhoneCall } from "react-icons/fi"
import { MdOutlineFavoriteBorder } from "react-icons/md"

// #ed6c02  Orange color
// #2a52be  blue color


const SearchSelect = styled(Select)({
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none', // Remove the border for the Select
  },
});

const Headers = () => {  

  const { pathname } = useLocation()
  const navigate = useNavigate()
  
  const { categories } = useSelector(state => state.home)
  const { userInfo } = useSelector(state => state.auth)
  const { cart_products_count } = useSelector(state => state.cart)

  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [categoryShow, setCategoryShow] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [searchValue, setSearchValue] = useState('')           // search bar search value
  const [category, setCategory] = useState('Select Category')  // search bar category select


  /* This function is used to show/hide All Categories dropdown on 3rd Header */
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen)

  /* MUI Tabs Data */
  const tabsData = [
    { label: "Menu", content: (
      <ul className='flex flex-col justify-start items-start text-sm font-bold uppercase w-full'>
        <li className={`w-full block my-1 ${pathname === '/' ? 'bg-[#ed6c02] text-white rounded-sm' : 'text-slate-500 border-e'}`}>
          <Link to='/' className={`py-1 px-1 block rounded-sm`}>Home</Link>
        </li>
        <li className={`w-full block my-1 ${pathname === '/shop' ? 'bg-[#ed6c02] text-white' : 'text-slate-500 border-e'}`} style={{ borderBottom: "1px solid #f3f4f6" }}>
          <Link to='/shop' className={`py-1 px-1 block rounded-sm`}>Shop</Link>
        </li>
        <li className={`w-full block my-1 ${pathname === '/blog' ? 'bg-[#ed6c02] text-white' : 'text-slate-500 border-e'}`} style={{ borderBottom: "1px solid #f3f4f6" }}>
          <Link className={`py-1 px-1 block rounded-sm`}>Blog</Link>
        </li>
        <li className={`w-full block my-1 ${pathname === '/about' ? 'bg-[#ed6c02] text-white' : 'text-slate-500 border-e'}`} style={{ borderBottom: "1px solid #f3f4f6" }}>
          <Link className={`py-1 px-1 block rounded-sm`}>About</Link>
        </li>
        <li className={`w-full block my-1 ${pathname === '/contact' ? 'bg-[#ed6c02] text-white' : 'text-slate-500 border-e'}`} style={{ borderBottom: "1px solid #f3f4f6" }}>
          <Link className={`py-1 px-1 block rounded-sm`}>Contact</Link>
        </li>
        <li className={`w-full block my-1 ${pathname === '/wishlist' ? 'bg-[#ed6c02] text-white' : 'text-slate-500 border-e'}`} style={{ borderBottom: "1px solid #f3f4f6" }}>
          <Link className={`py-1 px-1 block rounded-sm`}>Wishlist</Link>
        </li>

        {/* If the User is logged in, show profile page link otherwise Login page link */}
        {
          userInfo ? <li className={`w-full block my-1 ${pathname === '/profile' ? 'bg-[#ed6c02] text-white' : 'text-slate-500'} border-e`} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <Link className={`py-1 px-1 block rounded-sm`}>Profile</Link>
                </li> 
          : <li className={`w-full block my-1 ${pathname === '/login' ? 'bg-[#ed6c02] text-white' : 'text-slate-500'} border-e`} style={{ borderBottom: "1px solid #f3f4f6" }}>
              <Link className={`py-1 px-1 block rounded-sm`}>Login</Link>
            </li>
        }
      </ul>
    ) },

    /* Show the Categories Here */
    { label: "Categories", content: (
      <ul className='flex flex-col justify-start items-start text-sm font-bold uppercase w-full'>
        {
          categories.map((category, index) => {
            return (
              <li key={index} className="w-full block my-1 hover:bg-[#ed6c02] hover:text-white rounded-sm text-slate-500 border-e" style={{ borderBottom: "1px solid #f3f4f6" }}>
                <Link className={`py-1 px-1 block rounded-sm`}>{category.name}</Link>
              </li>
            )})
        }
      </ul>
    ) }
  ]

  /* This function is used to toggle the MUI active tabs on medium sized screens  */
  const handleTabChange = (event, newValue) => setActiveTab(newValue)

  const search = () => {
    
    if (category !== "Select Category") {
      navigate(`/products/search?category=${category}&&value=${searchValue}`)
    } else {
      navigate(`/products/search?category=&&value=${searchValue}`)
    }
  }

  /* This function will redirect the customer to cart page if logged in. */
  const redirect_cart_page = () => {
    userInfo
    ? navigate('/cart')
    : navigate('/login')
  }


  return (
    <header className='w-full bg-white'>
      {/* Header Top */}
      <div className="bg-white md:hidden border-b">
        <div className="w-[95%] mx-auto">
          <div className="flex justify-between items-center w-full h-[40px]">
            <div className="flex justify-center items-center gap-3">
              <div><Typography variant='subtitle2' className='cursor-pointer hover:text-[#ed6c02]'>Free Shipping On Orders $500+</Typography></div>
            </div>
            <div className="flex justify-center items-center gap-3 md:hidden">
              <div><Typography variant='subtitle2' className='cursor-pointer hover:text-[#ed6c02]'>Account</Typography></div>
              <div><Typography variant='subtitle2' className='cursor-pointer hover:text-[#ed6c02]'>Track Order</Typography></div>
              <div><Typography variant='subtitle2' className='cursor-pointer hover:text-[#ed6c02]'>Support</Typography></div>
            </div>
          </div>
        </div>
      </div>

      {/* 2nd Header */}
      <div className="bg-white border-b">
        <div className="w-[95%] mx-auto">
          <div className="h-[100px] w-full flex justify-between items-center gap-3">

            {/* Sidbar Toggle Icon */}
            <div className='xl:hidden lg:hidden md:flex w-3/12'>
              <div className='flex justify-between items-center'>
                <div 
                  onClick={() => setShowSidebar(true)} 
                  className='flex justify-center items-center w-[40px] h-[40px] bg-white border border-slate-600 text-slate-500 rounded-sm 
                  cursor-pointer '>
                  <span><FaList /></span>
                </div>
              </div>
            </div>

            {/* Website Logo */}
            <div className='w-3/12 md:w-6/12'>
              <div className='flex justify-center items-center'>
                <Link to='/'><img src="/images/logo/website_logo.png" alt="website_logo" width="250px" /></Link>
              </div>
            </div>

            {/* Header's Search Bar */}
            <div className='md:hidden w-6/12'>
              <div className='flex justify-center items-center w-full '>
                <div className="flex border h-[50px] items-center relative w-full">

                  <div className="relative after:absolute after:h-[35px] after:w-[2px] after:bg-[#e2e8f0] after:right-[5px] md:hidden">
                    {/* MUI Select component */}
                    <SearchSelect
                      className="w-[170px] text-slate-600"
                      id="select-category-small"
                      name='category'
                      size="small"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <MenuItem value="Select Category" disabled>Select Category</MenuItem>
                      {
                        categories.map((category, index) => {
                          return (
                            <MenuItem key={index} value={category.name}>{category.name}</MenuItem>
                          )})
                      }
                    </SearchSelect>
                  </div>

                  <input 
                    className='w-full h-full relative p-2 text-base text-slate-500 focus:outline-none' 
                    type="text" 
                    placeholder='Search...'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)} 
                  />

                  <button onClick={search} className='absolute right-0 px-8 h-full text-white bg-[#6466E8]'>Search</button>

                </div>
              </div>
            </div>

            {/* User Profile and Cart Icons */}
            <div className=' w-3/12 block pl-2 md:pl-0'>
              <div className='flex justify-end items-center w-full gap-3'>
                
                {/* User Profile and Login */}
                <div className="flex items-center justify-between gap-3 md:hidden">
                  <div className="w-[45px] h-[45px] flex items-center justify-center rounded-full border-2 border-slate-300">
                    <span className='text-2xl flex items-center justify-center text-center text-slate-500'><AiOutlineUser /></span>
                  </div>
                  <div className="flex flex-col">
                    <span className='text-slate-500 text-xs font-medium'>Hello</span>
                    {
                      userInfo 
                      ? <Link to="/dashboard"><span className='text-slate-700 text-sm font-medium cursor-pointer hover:text-[#ed6c02] '>{userInfo.name}</span></Link>
                      :  <Link to="/login"><span className='text-slate-700 text-sm font-medium cursor-pointer hover:text-[#ed6c02]'>Sign in</span></Link>
                    }
                  </div>
                </div>

                  {/* Cart & Wishlist Icon */}
                  <div className="flex items-center justify-between gap-3">
                    <Link>
                      <div className="relative w-[45px] h-[45px] flex items-center justify-center rounded-full bg-orange-50 cursor-pointer md:hidden">
                        <span className='text-2xl flex items-center justify-center text-center text-orange-600 '><MdOutlineFavoriteBorder /></span>
                        <div className="w-[20px] h-[20px] absolute flex items-center justify-center -top-[3px] -right-[5px] rounded-full bg-orange-600 text-white">5</div>
                      </div>
                    </Link>
                    <div onClick={redirect_cart_page}>
                      <div className="relative w-[45px] h-[45px] flex items-center justify-center rounded-full bg-orange-50 cursor-pointer">
                        <span className='text-2xl flex items-center justify-center text-center text-orange-600 '><BiShoppingBag /></span>
                        {
                          cart_products_count !== 0 &&  <div className="w-[20px] h-[20px] absolute flex items-center justify-center -top-[3px] -right-[5px] rounded-full bg-orange-600 text-white">
                            {cart_products_count}
                          </div>
                        }
                      </div>
                    </div>
                  </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Search Bar for Product Search - For medium size screens */}
      <div className="bg-[#ed6c02] hidden md:block">
        <div className="w-[95%] mx-auto py-3">
          <div className='relative flex justify-center items-center w-100'>
            <input type="text" className="p-2 w-full mr-[40px] focus:outline-[#ed6c02] border rounded-sm" placeholder="Search Product..." />
            <span className='absolute right-0 flex justify-center items-center bg-[#ed6c02] text-white w-[40px] h-full text-lg border border-slate-50 rounded-sm'><FaSearch/></span>
          </div>
        </div>
      </div>

      {/* Responsive Sidebar - For medium size screens */}
      <div className="hidden md:block">
        <div
          className={` fixed duration-200 transition-all ${showSidebar ? 'visible' : 'invisible'} 
            hidden md:block w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20`}
        >
          <div className={`w-[300px] z-[99999] transition-all duration-200 fixed ${showSidebar ? 'left-0 top-0' : '-left-[300px]'} overflow-y-scroll bg-white h-screen py-6 px-5`}>
            <div className='flex justify-start flex-col'>

              {/* Website Logo and close Icon */}
              <div className='flex justify-between items-center mb-5'>
                <Link to='/'><img src="/images/logo/website_logo.png" alt="website_logo" width='120px' /></Link>
                <span onClick={() => setShowSidebar(false)} className='text-xl rounded-full p-1 bg-[#ed6c02] text-white cursor-pointer'><AiOutlineClose /></span>
              </div>

              {/* Search Bar for Product Search */}
              <div className='relative flex justify-between items-center w-100 mb-5'>
                <input type="text" className="p-2 w-full mr-[40px] focus:outline-[#ed6c02] border" placeholder="Search Product..." />
                <span className='absolute right-0 flex justify-center items-center bg-[#ed6c02] text-white w-[40px] h-full text-lg'><FaSearch/></span>
              </div>

              {/* MUI Tabs. Main Menu and Categories */}
              <div className="flex justify-start items-center flex-wrap w-100 mb-5">
                <div className="w-full">
                  <Tabs value={activeTab} onChange={handleTabChange} textColor="inherit" indicatorColor="inherit">
                    {tabsData.map((tab, index) => (
                      <Tab key={index} label={tab.label} className="theme-ed6c02"/>
                    ))}
                  </Tabs>
                    {tabsData.map((tab, index) => (
                      <div key={index} hidden={index !== activeTab} className='mt-3'>
                        {tab.content}
                      </div>
                    ))}
                </div>
              </div>

              {/* Hotline Text */}
              <Box className="flex justify-start items-center w-[100%] border p-3 shadow-md mb-10">
                <Box className="flex justify-center items-center gap-3">
                  <span className='text-2xl flex items-center justify-center text-center text-[#ed6c02]'><FiPhoneCall /></span>
                  <Box className="flex flex-col gap-0">
                    <span className='text-slate-500 text-xs font-medium'>Hotline:</span>
                    <span className='text-slate-700 text-sm font-medium cursor-pointer hover:text-[#ed6c02]'>+(402) 763 282 46</span>
                  </Box>
                </Box>
              </Box>
              
            </div>
          </div>
        </div>
      </div>

      {/* 3rd Header */}
      <div className="bg-white md:hidden border-b shadow">
        <div className="w-[95%] mx-auto">
          <div className='flex justify-between items-center gap-2'>

            {/* Show All Categories */}
            <div className='w-3/12'>
              <div className="relative">

                <div onClick={() => setCategoryShow(!categoryShow)} className="flex items-center justify-between bg-[#6466E8] text-white h-[65px] w-[100%] px-3 mt-4 rounded-t-md cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span><LuListMinus/></span>
                    <span className='font-roboto'>All Categories</span>
                  </div>
                  <div><BiSolidDownArrow/></div>
                </div>

                <div className={`${categoryShow ? 'max-h-80' : 'h-0'} absolute top-100 overflow-auto transition-all duration-500 z-[999] bg-white w-full border`}>
                  <ul className='text-slate-500 font-medium overflow-auto'>
                    {
                      categories.map((category, index) => {
                        return (
                          <li key={index} className='flex justify-start items-center gap-2 px-[24px] py-[6px] cursor-pointer hover:bg-[#6466E8] hover:text-white' style={{ borderBottom: "1px solid #f3f4f6" }}>
                            <img src={category.image} alt={category.name} className='w-[30px] h-[30px] rounded-full overflow-hidden' />
                            <Link to={`/products?category=${category.name}`} className='text-sm block'>{category.name}</Link>
                          </li>
                        )})
                    }
                  </ul>
                </div>

              </div>
            </div>

              {/* Navbar Links */}
              <div className='w-6/12'>
                <div className="flex justify-between items-center flex-wrap w-[100%]">
                  <ul className='flex justify-start items-start gap-8 text-sm font-bold uppercase'>
                    <li>
                      <Link to='/' className={`p-2 block hover:text-[#ed6c02]`}>Home</Link>
                    </li>
                    <li>
                      <Link to='/shop' className={`p-2 block hover:text-[#ed6c02] ${pathname === '/shop' ? 'text-[#ed6c02]' : 'text-slate-500'}`}>Shop</Link>
                    </li>
                    <li>
                      <Link className={`p-2 block hover:text-[#ed6c02] ${pathname === '/blog' ? 'text-[#ed6c02]' : 'text-slate-500'}`}>Blog</Link>
                    </li>
                    <li>
                      <Link className={`p-2 block hover:text-[#ed6c02] ${pathname === '/about' ? 'text-[#ed6c02]' : 'text-slate-500'}`}>About</Link>
                    </li>
                    <li>
                      <Link className={`p-2 block hover:text-[#ed6c02] ${pathname === '/contact' ? 'text-[#ed6c02]' : 'text-slate-500'}`}>Contact</Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Hotline contact number */}
              <div className='w-3/12'>
                <div className="flex justify-center items-center w-[100%]">
                  <div className="flex justify-center items-center gap-3">
                    <span className='text-2xl flex items-center justify-center text-center text-[#ed6c02]'><FiPhoneCall /></span>
                    <div className="flex flex-col gap-0">
                      <span className='text-slate-500 text-xs font-medium'>Hotline:</span>
                      <span className='text-slate-700 text-sm font-medium cursor-pointer hover:text-[#ed6c02]'>+(402) 763 282 46</span>
                    </div>
                  </div>
                </div>
              </div>

          </div>
        </div>
      </div>
      
    </header>

  )
}

export default Headers