import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Headers from "../components/Headers"
import Footer from "../components/Footer"
import Reviews from '../components/Reviews'
import { useSelector, useDispatch } from 'react-redux'
import { get_product, get_reviews } from '../store/reducers/homeReducer'
import { add_to_cart, add_to_wishlist, clearMessage } from '../store/reducers/cartReducer'
import { toast } from 'react-hot-toast'
// Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
// MUI Imports
import { Rating, Checkbox } from '@mui/material'
// React-icons Import
import { MdOutlineKeyboardArrowRight, MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { BiLogoFacebook, BiLogoTwitter, BiLogoLinkedin, BiLogoGithub } from 'react-icons/bi'
// React Carousel & Swiper Imports
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'




const ProductDetails = () => {
  
  const { slug } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo } = useSelector(state => state.auth)
  const { product, total_reviews, related_products } = useSelector(state => state.home)
  const { errorMessage, successMessage } = useSelector(state => state.cart)

  const [image, setImage] = useState('')
  const [state, setState] = useState('reviews')
  const [quantity, setQuantity] = useState(1)


  /* Responsive settings for the carousel */
  const responsive = {
    superLargeDesktop : {
      breakpoint : { max: 4000, min: 3000 },
      items : 4
    },
    desktop : {
      breakpoint : { max: 3000, min: 1024 },
      items : 4
    },
    tablet : {
      breakpoint : { max: 1024, min: 464 },
      items : 4
    },
    mdtablet : {
      breakpoint : { max: 991, min: 464 },
      items : 4
    },
    mobile : {
      breakpoint : { max: 768, min: 0 },
      items : 3
    },
    smmobile : {
      breakpoint : { max: 640, min: 0 },
      items : 2
    },
    xsmobile : {
      breakpoint : { max: 440, min: 0 },
      items : 1
    },
  }



  /* Fetch product details by slug */
  useEffect(() => {
    dispatch(get_product(slug))
  }, [slug])


  /* Scroll to the top of the page when component mounts */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  /* Increase quantity if stock allows */
  const increase_quantity = () => {
    if (quantity >= product.stock) {
      toast.error('No more quantity available')
    } else {
      setQuantity(quantity + 1)
    }
  }

  
  /* Decrease quantity if quantity is greater than 1 */
  const decrease_quantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }


  /* Add the product to the cart */
  const add_Cart = () => {
    if (userInfo) {
        dispatch(add_to_cart({
          userId: userInfo.id,
          quantity,
          productId: product._id
        }))
    } else {
      navigate('/login')
    }
  }


  /* Add the product to the wishlist */
  const add_wishlist = () => {
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


  /* Perform the "Buy Now" functionality */
  const buy_now = () => {
    let price = 0
    if (product.dicount > 0) {
      price = product.price - Math.floor((product.price * product.discount) / 100)
    } else {
      price = product.price
    }

    const obj = [
      {
        sellerId: product.sellerId,
        shopName: product.shopName,
        price: quantity * (price - Math.floor((price * 5) / 100)),
        products: [
          {
            quantity,
            productInfo: product
          }
        ]
      }
    ]
    navigate('/shipping', {
      state: {
        products: obj,
        price: price * quantity,
        shipping_fee: 85,
        items: 1

      }
    })
  }


  /* Fetch product by slug */
  useEffect(() => {
    dispatch(get_product(slug))
  }, [slug])


  /* Scrools page to the top */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  /* Show success and error messages when they change */
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


  /* Fetch reviews related to this product */
  useEffect(() => {
    if(product._id) {
        dispatch(get_reviews({
            productId: product._id,
            pageNumber: ''
        }))
      }
    }, [product, dispatch])

  return (
    <>
      <Headers />
      
      <div className="bg-blue-50 py-5 mb-5 mt-3">
        <div className='w-[90%] h-full mx-auto'>
          <div className="flex flex-wrap justify-start items-center text-slate-600 text-base w-full">
            <Link to="/" className='text-[#6466E8]'>Home</Link>
              <span className='pt-1'><MdOutlineKeyboardArrowRight /></span>
              <Link to="/">{product.category}</Link>
              <span className='pt-1'><MdOutlineKeyboardArrowRight /></span>
              <span>{product.name}</span>
          </div>
        </div>
      </div>

      <section className='w-[90%] h-full mx-auto pb-16'>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-8 w-full">

          {/* Product image - Large  */}
          <div className='w-full'>
            <div className=" w-full h-[500px] pt-3 flex justify-center items-center overflow-hidden relative mb-3">
              <img src={image ? image : product.images?.[0]} alt={product.name} className='object-cover'/>
            </div>
            {/* Sub Images */}
            <div className="py-3">
              {
                product.images && <Carousel
                    autoPlay={true}
                    infinite={true}
                    responsive={responsive}
                    transitionDuration={500}
                >
                  {
                    product.images?.map((img, i) => {
                      return (
                        <div onClick={() => setImage(img)} key={i} className='h-[150px] border block mx-2 rounded-lg w-full cursor-pointer'>
                          <img className="w-full h-full p-3" src={img} alt={`product_image_${img}.png`} />
                        </div>
                      )
                    })
                  }
                </Carousel>
              }
            </div>
          </div>

          {/* Product details */}
          <div className="flex flex-col gap-4">

            {/* Product Title */}
            <div className="text-xl text-slate-600 font-bold">
              <h2>{product.name}</h2>
            </div>

            {/* Product Rating */}
            <div className="flex justify-start items-center gap-4 pb-2 border-b">
              <div className="flex text-xl">
                <Rating name="half-rating-read" value={parseInt(product.rating)} precision={0.5} size="small" readOnly />
              </div>
              <span className='text-sm text-slate-500'>({total_reviews} reviews)</span>
            </div>

            {/* Product Price - Discount */}
            <div className="flex gap-3">
              {
                product.discount 
                ? <div className='flex items-center justify-center gap-3'>
                    <h2 className='text-2xl font-bold text-[#6466E8]'>${product.price - Math.floor((product.price * product.discount) / 100)}</h2>
                    {/* <span className='text-sm font-semibold text-[#ed6c02]'>(-{product.discount}%)</span> */}
                    <span className='line-through text-slate-400 text-base font-medium'>${product.price}</span> 
                  </div> 
                : <h2 className='text-2xl font-medium text-[#6466E8]'>${product.price}</h2>
              }
            </div>
            
            {/* Product Description */}
            <div className='text-slate-600 mb-2'>
              <p>{product.description}</p>
            </div>
            
            {/* If product in-stock, show add to cart */}
            <div className='flex gap-3 pb-10 border-b'>
              {
                product.stock 
                ? <div className='flex md:flex-wrap items-center justify-between md:justify-start gap-5 md:gap-3'>
                    <div className="flex items-start justify-start gap-2 border rounded-sm">
                      <div onClick={decrease_quantity} className='h-[20px] w-[20px] flex justify-center items-center p-4 text-lg cursor-pointer'><span><AiOutlineMinus /></span></div>
                      <div className='h-[20px] w-[20px] flex justify-center items-center p-4'>{quantity}</div>
                      <div onClick={increase_quantity} className='h-[20px] w-[20px] flex justify-center items-center p-4 text-lg cursor-pointer'><span><AiOutlinePlus /></span></div>
                    </div>

                    <div>
                      <button 
                        onClick={add_Cart}
                        className='px-5 py-3 cursor-pointer hover:shadow-orange-500/40 bg-[#6466E8] text-white whitespace-nowrap'>
                          Add to Cart
                      </button>
                    </div>
                  </div>
                : ''
              }
              {/* Add to Wishlist */}
              <span 
                onClick={add_wishlist}
                className="w-[38px] h-[38px] flex justify-center items-center text-xl bg-white rounded-full border hover:shadow-md cursor-pointer transition-all flex-shrink-0">
                <Checkbox
                  icon={<MdOutlineFavoriteBorder className='text-black text-xl'/>}
                  checkedIcon={<MdFavorite className='text-[#6466E8] text-xl'/>}
                  // checked={wishlist.productId === product._id ? true : false}
                />
              </span>
            </div>  

            {/* Availability */}
            <div className='flex py-5 gap-5'>
              <div className='w-[150px] text-black font-bold text-xl flex flex-col gap-5'>
                <span>Availability</span>
                <span>Share on</span>
              </div>

              <div className="flex flex-col gap-5">
                {
                  product.stock 
                    ? <h2 className='text-sm font-bold text-green-500 p-2'>In Stock ({product.stock})</h2>
                    : <h2 className='text-lg font-bold text-red-500'>Out of Stock</h2>
                }

                <ul className='flex justify-start items-center gap-3'>
                  <li>
                    <a href='#' className='w-[38px] h-[38px] flex justify-center items-center bg-white hover:bg-[#6466E8] hover:text-white text-lg cursor-pointer shadow-md rounded-md'><BiLogoFacebook /></a>
                  </li>
                  <li>
                    <a href='#' className='w-[38px] h-[38px] flex justify-center items-center bg-white hover:bg-[#6466E8] hover:text-white text-lg cursor-pointer shadow-md rounded-md'><BiLogoTwitter /></a>
                  </li>
                  <li>
                    <a href='#' className='w-[38px] h-[38px] flex justify-center items-center bg-white hover:bg-[#6466E8] hover:text-white text-lg cursor-pointer shadow-md rounded-md'><BiLogoLinkedin /></a>
                  </li>
                  <li>
                    <a href='#' className='w-[38px] h-[38px] flex justify-center items-center bg-white hover:bg-[#6466E8] hover:text-white text-lg cursor-pointer shadow-md rounded-md'><BiLogoGithub /></a>
                  </li>
                </ul>

              </div>
            </div>

            {/* Buy Now - Chat Seller */}
            <div className="flex gap-3">
              {
                product.stock 
                ? <button
                    onClick={buy_now} 
                    className='px-5 py-3 cursor-pointer hover:shadow-emerald-500/40 bg-emerald-500 text-white whitespace-nowrap'>
                      Buy Now
                  </button> 
                : ''
              }
              <Link 
                to={`/dashboard/chat/${product.sellerId}`}
                className='px-5 py-3 cursor-pointer hover:shadow-lime-500/40 bg-lime-500 text-white whitespace-nowrap'
              >
                Chat Seller
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Description and Reviews section */}
      <section>
        <div className='w-[90%] h-full mx-auto pb-16'>
          <div className='flex flex-wrap'>
            <div className='w-[72%] md:w-full'>
              <div className="pr-4 md:pr-0">


                <div className="grid grid-cols-2 gap-2">

                  <button 
                    onClick={() => setState('description')} 
                    className={`py-1 px-5 hover:text-white hover:bg-[#6466E8] 
                      ${state === 'description' 
                          ? 'bg-[#6466E8] text-white' 
                          : 'bg-slate-200 text-slate-700'
                      } rounded-sm`}>
                        Description
                  </button>

                  <button 
                    onClick={() => setState('reviews')} 
                    className={`py-1 px-5 hover:text-white hover:bg-[#6466E8] 
                    ${state === 'reviews' 
                        ? 'bg-[#6466E8] text-white' 
                        : 'bg-slate-200 text-slate-700'
                    } rounded-sm`}>
                      Reviews
                  </button>

                </div>


                <div>
                  {
                    state === 'reviews' 
                    ? <Reviews product={product} /> 
                    : <p className='py-5 text-slate-600'>{product.description}</p>
                  }
                </div>

              </div>
            </div>

            <div className='w-[72%] md:w-full'>
              <div className="pl-4 md:pl-0">

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Related Products - Section */}
      <section>
        <div className='w-[90%] h-full mx-auto'>

          <div className="w-full">
            <div className="text-center flex justify-center items-center flex-col text-2xl text-slate-600 font-bold relative pb-[30px]">
              <h2>Related Products</h2>
              <div className='w-[100px] h-[4px] bg-[#7fad39] mt-4'></div>
            </div>
          </div>

            <div>
              <Swiper
                slidesPerView='auto'
                breakpoints={{
                  1280 : { slidesPerView : 4 },
                  565 : { slidesPerView : 2 }
                }}
                spaceBetween={25}
                loop={true}
                pagination={{ clickable: true, el: '.custom_bullet' }}
                modules={[Pagination]}
                className='mySwiper my-8'
              >
                {
                  related_products.map((p, i) => {
                    return (
                      
                      <SwiperSlide key={i}>
                        <div  className="relative w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow ">

                          {/* Discount - left */}
                          {
                            p.discount 
                            ? <div className='absolute top-2 left-1 flex justify-start items-center'>
                                <span className="bg-red-500 text-white text-xs font-semibold mr-2 ml-3 px-3 py-1 rounded-lg">{product.discount}%</span>
                              </div>
                            : ''
                          }
                          

                          {/* Add to Wishlist - Right */}
                          <div className='absolute top-2 right-2'>
                            <span className="w-[38px] h-[38px] flex justify-center items-center text-xl bg-white rounded-full border hover:shadow-md cursor-pointer transition-all flex-shrink-0">
                              <Checkbox
                                icon={<MdOutlineFavoriteBorder className='text-black text-xl'/>}
                                checkedIcon={<MdFavorite className='text-[#6466E8] text-xl'/>}
                              />
                            </span> 
                          </div>

                          {/* Product Header : Image */}
                          <Link to={`/product/details/${p.slug}`}>
                            <img className="p-8 rounded-t-lg h-[240px] block mx-auto" src={p.images[0]} alt={p.name} />
                          </Link>

                          {/* Product Body */}
                          <div className="px-5 pb-5 w-full">

                            {/* Product Title & price */}
                            <div className="flex flex-col gap-3">
                              <Link to={`/product/details/${p.slug}`}>
                                <h5 className="text-md font-semibold tracking-tight text-gray-900 hover:text-[#6466E8] dark:text-white">{p.name}</h5>
                              </Link>
                              <span className="text-lg font-bold text-[#EF262C]">${p.price}</span>
                            </div>

                            {/* Product Rating - MUI Rating Component */}
                            <div className="flex flex-wrap items-center mt-2.5 mb-5">
                              <Rating name="half-rating-read" value={parseInt(p.rating)} precision={0.5} size="small" readOnly />
                              <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 ml-3 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">{p.rating}</span>
                            </div>

                            {/* Product Buttons */}
                            <div className="flex items-center justify-start flex-wrap gap-4 w-full translate-all duration-500">
                              <span className="text-white bg-[#ed6c02] font-medium rounded-lg text-sm px-3.5 py-2.5 text-center hover:bg-[#ea580c] cursor-pointer transition-all whitespace-nowrap w-full">Add to cart</span>
                            </div>
                            
                          </div>
                        </div>
                      </SwiperSlide>
                    )})
                }
              </Swiper>
            </div>

            {/* Pagination */}
            <div className="w-full flex justify-center items-center py-10">
              <div className="custom_bullet flex justify-center gap-3 !w-auto"></div>
            </div>
            
        </div>
      </section>

      <Footer />

    </>
  )
}

export default ProductDetails