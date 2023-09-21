import React, { useEffect } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { get_dashboard_index_data } from '../../store/reducers/dashboardReducer'

const Index = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo } = useSelector(state => state.auth)
  const { total_orders, recent_orders, pending_orders, cancelled_orders } = useSelector(state => state.dashboard)

  useEffect(() => {
    dispatch(get_dashboard_index_data(userInfo.id))
  }, [userInfo])
  

  const redirect = (order) => {
    let items = 0
    for (let i = 0; i < order.products.length; i++) {
      items += 1; // Increment the count for each product in the order
    }
    navigate('/payment', {
      state: {
        price: order.price,
        items,
        orderId: order._id
      }
    })
  }

  return (
    <div>
      <div className='grid grid-cols-3 md:grid-cols-1 gap-5'>

        <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className='text-xl text-green-800'>
              <AiOutlineShoppingCart />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className='text-3xl font-bold'>{total_orders}</h2>
            <span>Orders</span>
          </div>
        </div>

        <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
          <div className="bg-blue-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className='text-xl text-blue-800'>
              <AiOutlineShoppingCart />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className='text-3xl font-bold'>{pending_orders}</h2>
            <span>Pending Orders</span>
          </div>
        </div>

        <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
          <div className="bg-red-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className='text-xl text-red-800'>
              <AiOutlineShoppingCart />
            </span>
          </div>
          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className='text-3xl font-bold'>{cancelled_orders}</h2>
            <span>Cancelled Orders</span>
          </div>
        </div>

      </div>

      {/* Recent Orders Table */}
      <div className="bg-white p-4 mt-5 rounded-md">
        <div className="text-lg font-semibold text-slate-600">Recent Orders</div>
        <div className="pt-4">
          <div className="relative overflow-x-auto">
            <table className='w-full text-sm text-left text-gray-500 shadow-md'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                <tr>
                  <th scope='col' className='px-6 py-3'>ORDER ID</th>
                  <th scope='col' className='px-6 py-3'>PRICE</th>
                  <th scope='col' className='px-6 py-3'>PAYMENT STATUS</th>
                  <th scope='col' className='px-6 py-3'>ORDER STATUS</th>
                  <th scope='col' className='px-6 py-3'>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {
                  recent_orders.map((order, index) => 
                  
                  <tr key={index} className='bg-white border-b'>
                    <td className='px-6 py-4 font-medium whitespace-nowrap'>{order._id}</td>
                    <td className='px-6 py-4 font-medium whitespace-nowrap'>${order.price}</td>
                    <td className='px-6 py-4 font-medium whitespace-nowrap'>{order.payment_status}</td>
                    <td className='px-6 py-4 font-medium whitespace-nowrap'>{order.delivery_status}</td>
                    <td className='px-6 py-4 font-medium whitespace-nowrap'>
                      <Link to={`/dashboard/order/details/${order._id}`}>
                        <span className='bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded'>View</span>
                      </Link>
                      <span onClick={() => redirect(order)} className='bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded cursor-pointer'>Pay Now</span>
                    </td>
                  </tr>)
                }

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index