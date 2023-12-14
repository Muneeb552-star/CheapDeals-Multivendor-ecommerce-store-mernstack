import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { get_categories } from './store/reducers/homeReducer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import ContactUs from './pages/ContactUs'
import Shipping from './pages/Shipping'
import Payment from './pages/Payment'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductDetails from './pages/ProductDetails'
import CategoryShop from './pages/CategoryShop'
import SearchProduct from './pages/SearchProduct'
import Dashboard from './pages/Dashboard'
import ProtectUser from './utils/ProtectUser'
// User dashboard Imports
import Index from './components/dashboard/Index'
import Orders from './components/dashboard/Orders'
import Wishlist from './components/dashboard/Wishlist'
import Chat from './components/dashboard/Chat'
import ChangePassword from './components/dashboard/ChangePassword'
import OrderDetail from './components/dashboard/OrderDetail'


function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(get_categories())
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/' element={<Home/>} />
        <Route path='/shop' element={<Shop/>} />
        <Route path='/products?' element={<CategoryShop/>} />
        <Route path='/products/search?' element={<SearchProduct/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/shipping' element={<Shipping/>} />
        <Route path='/payment' element={<Payment/>} />
        <Route path='/product/details/:slug' element={<ProductDetails/>} />
        <Route path='/contact-us' element={<ContactUs/>} />

        <Route path='/dashboard' element={<ProtectUser />}>
          <Route path='' element={<Dashboard />}>
            <Route path='' element={<Index />} />
            <Route path='my-orders' element={<Orders />} />
            <Route path='order/details/:orderId' element={<OrderDetail />} />
            <Route path='my-wishlist' element={<Wishlist />} />
            <Route path='chat' element={<Chat />} />
            <Route path='chat/:sellerId' element={<Chat />} />
            <Route path='change-password' element={<ChangePassword />} />
          </Route>
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App

