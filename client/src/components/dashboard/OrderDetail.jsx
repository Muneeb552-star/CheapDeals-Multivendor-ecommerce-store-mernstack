import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { get_order_details } from '../../store/reducers/orderReducer'

const OrderDetail = () => {
  const { orderId } = useParams()
  const dispatch = useDispatch()
  
  const { myOrder } = useSelector(state => state.order)
  const { userInfo } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(get_order_details(orderId))
  }, [dispatch, orderId])


  return (
    <div className='bg-white p-5'>
      <h2 className='text-slate-600 font-semibold'>Order ID: #{myOrder._id}</h2>
      <span className='text-sm'>Date: {myOrder.date}</span>

      <div className="grid grid-cols-2 md:grid-cols-1 gap-3">

        <div className="flex flex-col gap-1 border shadow-md rounded-md mt-3 py-2 px-5">
          <h2 className='text-slate-600 font-semibold'>Deliver to: {myOrder.shippingInfo?.name}</h2>
          <p>
            <span className='bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded'>Home</span>
            <span className='text-slate-600 text-sm'>{myOrder.shippingInfo?.address} {myOrder.shippingInfo?.province} {myOrder.shippingInfo?.city} {myOrder.shippingInfo?.area}</span>
          </p>
          <p className='text-slate-600 text-sm font-semibold mt-2'>Email to: {userInfo.email}</p>
        </div>

        <div className="flex flex-col gap-1 border shadow-md rounded-md mt-3 py-2 px-5">
          <h2 className='text-slate-500 font-semibold'>Price: ${myOrder.price} including shipping fee</h2>
          <p> Payment Status: <span className={`py-[1px] text-xs px-2 ${myOrder.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded-md`}>{myOrder.payment_status}</span></p>
          <p> Order Status: <span className={`py-[1px] text-xs px-2 ${myOrder.delivery_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded-md`}>{myOrder.delivery_status}</span></p>
        </div>

      </div>

      <div className="mt-3">
        <h2 className='text-slate-600 text-lg pb-2'>Products</h2>
        <div className="flex gap-5 flex-col ">
          {
            myOrder.products && myOrder.products.map((product, index) => 
            
            <div key={index}>
              {/* cart Product card */}
              <div className="flex justify-start items-center text-slate-600 shadow-md border py-3 px-5">
                <div className="flex gap-3">
                  <img className='w-[55px] h-[55px]' src={product.images[0]} alt={product.name} />
                  <div className='flex text-sm flex-col justify-start items-start gap-1'>

                    <Link>{product.name}</Link>
                    <span className='font-bold'>Brand: {product.brand}</span>                    
                    <h2 className='text-md font-bold text-orange-500'>Price: ${product.price - Math.floor((product.price * product.discount) / 100)}</h2>
                      
                    {
                      product.discount > 0
                      ? <span className='text-md font-bold'> Discount: 
                          <span className='text-base text-slate-500 font-semibold ml-3 line-through'>${product.price}</span>
                          <span className='text-sm font-semibold ml-2'>{product.discount}%</span>
                        </span>
                      : ''
                    }
                  </div>
                </div>
              </div>

            </div>
            )
          }
        </div>
      </div>

    </div>
  )
}

export default OrderDetail