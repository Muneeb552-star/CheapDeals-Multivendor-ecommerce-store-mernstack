import React, { useState } from "react"
import Headers from "../components/Headers"
import Footer from "../components/Footer"
import { useLocation, Link, useNavigate } from "react-router-dom"
import { place_order } from "../store/reducers/orderReducer"
// React-icons Import
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { useSelector, useDispatch } from "react-redux"

const Shipping = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { state : { products, price, shipping_fee, items } } = useLocation()

  const { userInfo } = useSelector(state => state.auth)

  const [res, setRes] = useState()
  const [state, setState] = useState({
    name: '',
    address: '',
    phone: '',
    post: '',
    province: '',
    city: '',
    area: '',
  })

  const handleInput = (e) => { setState({ ...state, [e.target.name]: e.target.value }) }

  const saveForm = (e) => {
    e.preventDefault();
    // dispatch(seller_login(state))
    const { name, address, phone, post, province, city, area } = state
    if ( name && address && phone && post && province && city && area ) {
       setRes(true)
    }
 }

 /* This function will be used to place order */
 const placeOrder = () => {
    dispatch(place_order({
      price,
      products,
      shipping_fee,
      shippingInfo: state,
      userId: userInfo.id,
      navigate,
      items
    }))
 }

  return (
    <>
      <Headers />
      <section className="pt-[40px] pb-[40px] my-6 bg-orange-100 relative">
        <div className="w-[90%] h-full mx-auto">
          <div className="flex flex-col items-start justify-start h-full w-full gap-3">
            <h2 className="text-5xl font-semibold">Shipping</h2>
            <div className="flex justify-start items-center gap-2 text-xl w-full">
              <Link to="/" className="text-[#ed6c02]">Home</Link>
              <span className="pt-1"><MdOutlineKeyboardArrowRight /></span>
              <span>Place Order</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eeeeee]">
        <div className="w-[90%] h-full mx-auto py-16">
          <div className="flex flex-wrap w-full">
            <div className="w-[67%] md:w-full">
              <div className="flex flex-col gap-3">
                <div className="bg-white p-6 shadow-md rounded-md">
                    <h2 className="text-slate-600 font-bold pb-3">Shipping Information</h2>
                    {
                        !res && <>
                         <form onSubmit={saveForm}>
                            <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                                <div className="flex flex-col gap-1 mb-2 w-full">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 shadow-sm rounded-md"
                                        name="name"
                                        id="name"
                                        placeholder="name"
                                        value={state.name}
                                        onChange={handleInput}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-1 mb-2 w-full">
                                    <label htmlFor="name">Address</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 shadow-sm rounded-md"
                                        name="address"
                                        id="address"
                                        placeholder="House no / building / street /area"
                                        value={state.address}
                                        onChange={handleInput}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                                <div className="flex flex-col gap-1 mb-2 w-full">
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 shadow-sm rounded-md"
                                        name="phone"
                                        id="phone"
                                        placeholder="phone"
                                        value={state.phone}
                                        onChange={handleInput}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-1 mb-2 w-full">
                                    <label htmlFor="post">Post</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 shadow-sm rounded-md"
                                        name="post"
                                        id="post"
                                        placeholder="post"
                                        value={state.post}
                                        onChange={handleInput}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                                <div className="flex flex-col gap-1 mb-2 w-full">
                                    <label htmlFor="province">Province</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 shadow-sm rounded-md"
                                        name="province"
                                        id="province"
                                        placeholder="province"
                                        value={state.province}
                                        onChange={handleInput}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-1 mb-2 w-full">
                                    <label htmlFor="city">City</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 shadow-sm rounded-md"
                                        name="city"
                                        id="city"
                                        placeholder="city"
                                        value={state.city}
                                        onChange={handleInput}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                                <div className="flex flex-col gap-1 mb-2 w-full">
                                    <label htmlFor="area">Area</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 shadow-sm rounded-md"
                                        name="area"
                                        id="area"
                                        placeholder="area"
                                        value={state.area}
                                        onChange={handleInput}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-1 mt-8 w-full">
                                    <button className="px-3 py-[6px] rounded-sm hover:shadow-indigo-500/20 hover:shadow-lg bg-[#ed6c02] text-white">Save</button>
                                </div>
                            </div>
                         </form>
                        </>
                    }

                    {
                      res && <div className="flex flex-col gap-1">
                          <h2 className="text-slate-600 font-semibold pb-2">Deliver to {state.name}</h2>
                          <p className="flex justify-start items-center gap-10 mb-3">
                            <span className="text-slate-600 text-sm">Address: {state.address}, {state.province}, {state.city}, {state.area}</span>
                            <span onClick={() => setRes(false)} className="text-indigo-500 cursor-pointer">Change</span>
                          </p>
                          <p className="text-slate-600 text-sm">Email to: muhammadmoneeb030@gmail.com</p>
                        </div>
                    }
                </div>

                {
                  products.map((p, i) =>
                  <div key={i} className="flex flex-col bg-white gap-2 p-4 shadow-md rounded-md">
                    <div className="w-full flex flex-wrap">
                      {
                        p.products.map((p, j) =>
                        <div key={j} className="flex md:flex-col justify-between items-center sm:w-full w-full mb-3">

                          <div className="flex md:flex-col justify-between md:justify-start items-start w-full">
                            <div className="flex justify-start items-start gap-4 h-full">
                              <img className='h-100 w-[80px] border' src={p.productInfo.images[0]} alt={p.productInfo.name} />
                              <div className="pr-4 text-slate-600 flex flex-col gap-1">
                                <h2 className='text-md font-semibold tracking-tight text-gray-900'>{p.productInfo.name}</h2>
                                {/* <span className='text-sm '>Brand : <span className='text-[#ed6c02] font-semibold'>Addidas</span></span> */}
                                <span className='text-sm '>Vendor : <span className='text-[#ed6c02] font-semibold'>{p.productInfo.shopName}</span></span>
                                <span className='text-xs font-bold'>Price: <span className='text-lg text-[#ed6c02] font-semibold'>${p.productInfo.price - Math.floor(p.productInfo.price * p.productInfo.discount)/100}</span></span>
                                  {
                                    p.productInfo.discount > 0 && <span className='text-xs font-bold'> Discount:
                                      <span className='text-base text-slate-500 font-semibold ml-3 line-through'>${p.productInfo.price}</span>
                                      <span className='text-sm font-semibold ml-2'>{p.productInfo.discount}%</span>
                                    </span>
                                  }
                              </div>
                            </div>
                          </div>
                        </div>)
                        }
                    </div>
                  </div>)
                }
              </div>
            </div>

            <div className="w-[33%] md:w-full md:my-7">
              <div className="pl-3 md:pl-0">
                <div className="bg-white font-medium p-5 text-slate-600 flex flex-col gap-3 rounded-md shadow-md">
                  <h2 className="text-xl font-semibold">Order Summary</h2>
                  <div className="flex justify-between items-center">
                    <span>{items} Items</span>
                    <span>${price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Delivery Charges</span>
                    <span>${shipping_fee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total Payment</span>
                    <span>${price + shipping_fee}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-y">
                    <span className="text-xl font-xl text-[#ed6c02]">Total</span>
                    <span className="text-xl font-xl text-[#ed6c02]">${price + shipping_fee}</span>
                  </div>
                  <button
                    onClick={placeOrder}
                    disabled={res ? false : true}
                    className={`px-5 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg ${res ? 'bg-orange-500' : 'bg-orange-300'}  text-sm text-white uppercase`}>
                      Place Order
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Shipping;
