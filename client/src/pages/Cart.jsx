import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { get_cart_products, delete_cart_product, increase_cart_quantity, decrease_cart_quantity, clearMessage } from '../store/reducers/cartReducer';
import { useDispatch, useSelector } from 'react-redux';
import Headers from '../components/Headers';
import Footer from '../components/Footer';
import { toast } from 'react-hot-toast';
// React-icons Import
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';


const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { cart_products, cart_products_count, price, shipping_fee, out_of_stock_products, successMessage } = useSelector((state) => state.cart);

  /**
   * Redirects the user to the shipping page if there are items in the cart.
   */
  const redirect = () => {
    if (cart_products.length > 0) {
      navigate('/shipping', {
        state: {
          products: cart_products,
          price: price,
          shipping_fee: shipping_fee,
          items: cart_products_count,
        },
      });
    }
  }

  /**
   * Deletes a cart product/item.
   */
  const delete_cart_item = (cart_id) => {
    dispatch(delete_cart_product(cart_id));
  }


  /**
   * Fetches all cart items using the 'get_cart_products' action.
   */
  useEffect(() => {
    dispatch(get_cart_products(userInfo.id))
  }, [dispatch, userInfo])


  /**
   * Displays a success toast message and refreshes the cart after a successful operation.
   */
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage)
      dispatch(clearMessage())
      dispatch(get_cart_products(userInfo.id))
    }
  }, [successMessage, dispatch, userInfo])


  /**
   * Increases the quantity of a cart item if the stock is greater than the current quantity.
   */
  const increase_quantity = (quantity, stock, cartId) => {
    const temp = quantity + 1;
    if (temp <= stock) {
      dispatch(increase_cart_quantity(cartId));
    }
  }

  /**
   * Decreases the quantity of a cart item if it's greater than 1.
   */
  const decrease_quantity = (quantity, cartId) => {
    const temp = quantity - 1;
    if (temp !== 0) {
      dispatch(decrease_cart_quantity(cartId));
    }
  }


  return (
    <>
      <Headers />
      {/* Cart Banner */}
      <section className='pt-[80px] pb-[50px] my-6 bg-blue-50 relative'>
        <div className='w-[90%] h-full mx-auto'>
          <div className="flex flex-col items-start justify-start h-full w-full gap-3">
            <h2 className='text-5xl font-semibold'>Cart</h2>
            <div className="flex justify-start items-center gap-2 text-xl w-full">
              <Link to="/" className='text-[#6466E8]'>Home</Link>
              <span className='pt-1'><MdOutlineKeyboardArrowRight /></span>
              <span>Cart</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cart and Checkout  */}
      <section className='pt-[20px] pb-[10px] my-6 relative'>
        <div className='w-[90%] mx-auto'>
          {
            cart_products.length > 0 || out_of_stock_products.length > 0 ? <div className='flex flex-wrap '>
              {/* Shopping Cart Items */}
              <div className='w-[67%] md:w-full'>
                <div className="pr-3 md:pr-0">
                  <div className="flex flex-col gap-3">
                    <div className="bg-white p-4 border rounded-md">
                      <h2 className='font-semibold'>Stock Products: {cart_products_count}</h2>
                    </div>
                     {/* Cart Code starts here */}
                    
                    {
                      cart_products.map((c, i) => <div key={i} className="flex flex-col bg-white gap-2">
                        <div className="w-full flex flex-wrap">
                        {
                          c.products.map((p, j) => 
                          <div key={j} className='flex flex-col justify-between items-center shadow-sm border rounded-md p-4 sm:w-full w-full gap-2 mb-3'>
                            {/* Cart Product - details */}
                            <div className="flex md:flex-col justify-between md:justify-start items-start w-full md:p-2 ">
                              <div className="flex justify-start items-start gap-4 h-full">

                                <img className='h-100 w-[80px]' src={p.productInfo.images[0]} alt={p.productInfo.name} />
                                <div className="pr-4 text-slate-700 flex flex-col gap-1">

                                  <h2 className='text-md font-semibold tracking-tight text-gray-900'>{p.productInfo.name}</h2>
                                  <span className='text-xs font-bold'>Vendor : <span className='font-semibold'>{p.productInfo.shopName}</span></span>
                                  <span className='text-xs font-bold'>Price: <span className='text-lg font-semibold'>${p.productInfo.price - Math.floor(p.productInfo.price * p.productInfo.discount)/100}</span></span>
                                  
                                  
                                  {
                                    p.productInfo.discount > 0 && <span className='text-xs font-bold'> Discount: 
                                      <span className='text-base text-slate-500 font-semibold ml-3 line-through'>${p.productInfo.price}</span>
                                      <span className='text-sm font-semibold ml-2'>{p.productInfo.discount}%</span>
                                    </span>
                                  }

                                  {/* Show label if product is 'Out of Stock' */}
                                  {p.productInfo.stockLabel === 'Out of Stock' && (
                                    <div className="text-red-500 font-semibold">{p.productInfo.stockLabel}</div>
                                  )}


                                  {/* Inc/Dec quantity - Delete cart Item */}
                                  <div className="flex items-center justify-start gap-2 mt-2 ">
                                    <div className='flex items-start justify-start border rounded-sm'>
                                    
                                      <div 
                                        onClick={() => decrease_quantity(p.quantity, p._id)} 
                                        className=' h-[20px] w-[20px] flex justify-center items-center p-4 text-lg rounded-full cursor-pointer'><span><AiOutlineMinus /></span>
                                      </div>

                                      <div className='h-[20px] w-[20px] flex justify-center items-center p-4'>{p.quantity}</div>

                                      <div 
                                        onClick={() => increase_quantity(p.quantity, p.productInfo.stock, p._id)} 
                                        className=' h-[20px] w-[20px] flex justify-center items-center p-4 text-lg rounded-full cursor-pointer'><span><AiOutlinePlus /></span>
                                      </div>
                                    </div>

                                    {/* Delete Button */}
                                    <button onClick={() => delete_cart_item(p._id)} className='text-[#ed6c02] ml-4 hover:underline'>Delete</button>
                                  </div>


                                </div>
                              </div>
                            </div>
                          </div> )}
                        </div>
                      </div>)
                    }
                   </div>
                </div>
              </div>

              {/* Order Summary Card */}
              <div className="w-[33%] md:w-full">
                <div className="pl-3 md:pl-0 md:mt-5">
                  {
                    cart_products.length > 0 && <div className='bg-white p-4 text-slate-600 flex flex-col gap-3 border shadow-md rounded-md'>
                      <h2 className="text-xl font-bold">Order Summary</h2>
                      
                      <div className="flex justify-between items-center">
                        <span>{cart_products_count} Items</span>
                        <span>${price}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span>Shipping Fee</span>
                        <span>${shipping_fee}</span>
                      </div>

                      <div className="flex gap-2">
                        <input type="text" className='w-full px-3 py-2 border border-slate-200 outline-0 focus:border-[#6466E8] rounded-sm' placeholder='Enter Coupen Code' />
                        <button className='px-5 py-[1px] bg-[#6466E8] text-white rounded-sm uppercase text-sm'>Apply</button>
                      </div>

                      <div className="flex justify-between items-center py-1 mt-2 border-y">
                        <span>Total</span>
                        <span className='text-lg font-semibold text-[#6466E8]'>${price + shipping_fee}</span>
                      </div>

                      <button 
                        onClick={redirect} 
                        className='px-5 py-3 rounded-sm hover:shadow-[#6466E8] hover:shadow-md bg-[#6466E8] text-sm text-white uppercase'>
                          Proceed to Checkout
                      </button>
                    </div>
                  }
                </div>
              </div>

            </div> : <div>
              <Link className='px-4 py-1 bg-indigo-500 text-white' to='/shop'>Shop Now</Link>
            </div>
          }
        </div> 
      </section>
      <Footer />
    </>
  )     
}

export default Cart





