import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//MUI imports
import { MenuItem, Select } from "@mui/material"
import { useSelector, useDispatch } from 'react-redux'
import { get_orders } from '../../store/reducers/orderReducer'

const Orders = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo } = useSelector( state => state.auth )
  const { myOrders } = useSelector( state => state.order )
  const [status, setStatus] = useState('all')



  useEffect(() => {
    dispatch(get_orders({ status: status, customerId: userInfo.id }))
  }, [status, userInfo])

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
    <div className='bg-white p-4 rounded-md'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-semibold text-slate-600'>My Orders</h2>
        {/* MUI Select component */}
        <Select
          className="w-[170px] text-slate-600"
          id="select-category-small"
          name='category'
          size="small"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="all">--order status--</MenuItem>
          <MenuItem value="placed">Placed</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
          <MenuItem value="warehouse">Warehouse</MenuItem>

        </Select>
      </div>

      {/* Orders table */}
      <div className="pt-4">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
              <tr>
                <th scope='col' className='px-6 py-3'>Order id</th>
                <th scope='col' className='px-6 py-3'>price</th>
                <th scope='col' className='px-6 py-3'>payment status</th>
                <th scope='col' className='px-6 py-3'>order status</th>
                <th scope='col' className='px-6 py-3'>action</th>
              </tr>
            </thead>
            <tbody>
              {
                myOrders.map((order, index) => 
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
  )
}

export default Orders