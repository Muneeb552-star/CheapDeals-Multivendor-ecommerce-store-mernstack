import { useState, useEffect } from "react"
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { customer_login, clearMessage } from "../store/reducers/authReducer"
import { toast } from 'react-hot-toast'
// react-Icons Import
import { FaFacebook } from 'react-icons/fa'
import { AiOutlineGoogle } from 'react-icons/ai'
// MUI Imports
import { CircularProgress } from "@mui/material"

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loader, errorMessage, successMessage, userInfo  } = useSelector(state => state.auth)

  const [state, setState] = useState({ email: '', password: '' })

  const handleInput = (e) => { setState({ ...state, [e.target.name]: e.target.value }) } 

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(customer_login(state))
  }

  useEffect(() => {
    if(errorMessage) {
      toast.error(errorMessage)
      dispatch(clearMessage())
    }

    if(successMessage) {
      toast.success(successMessage)
      dispatch(clearMessage()) 
    }

    if(userInfo){
      navigate("/")
    }
  }, [errorMessage, successMessage, dispatch, navigate])


  return (
    <div>
      <Headers />
      <div className="bg-slate-200 mt-4">
        <div className="w-full justify-center items-center p-10">
          <div className="grid grid-cols-2 md:grid-cols-1 w-[70%] md:w-[90%] mx-auto bg-white rounded-md">
            <div className="p-8">
              <h2 className="text-center w-full text-xl text-slate-600 font-bold">Login</h2>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md'
                      id="email"
                      name="email"
                      placeholder='email'
                      value={state.email}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="email">Password</label>
                    <input
                      type="password"
                      className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md'
                      id="password"
                      name="password"
                      placeholder='password'
                      value={state.password}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <button 
                    type="submit" 
                    className='px-8 py-2 mt-3 w-full bg-[#2a52be] shadow-lg hover:shadow-indigo-500/30 text-white cursor-pointer rounded-md' 
                  > 
                    { loader ? <CircularProgress color="inherit" size="1.5em"/> : 'Login' }
                  </button>
                </form>

                {/* Bottom text */}
                <div className="flex justify-center items-center py-2">
                  <div className='h-[1px] bg-slate-300 w-[95%]'></div>
                  <div className='px-3 text-slate-600'>or</div>
                  <div className='h-[1px] bg-slate-300 w-[95%]'></div>
                </div>
                <button className='flex justify-center items-center gap-2 mb-3 px-8 py-2 mt-3 w-full bg-purple-500 shadow-lg hover:shadow-indigo-500/30 text-white whitespace-nowrap cursor-pointer rounded-md'>
                  <span><FaFacebook/></span>
                  <span>Login with Facebook</span>
                </button>
                <button className='flex justify-center items-center gap-2 mb-3 px-8 py-2 mt-3 w-full bg-orange-500 shadow-lg hover:shadow-indigo-500/30 text-white whitespace-nowrap cursor-pointer rounded-md'>
                  <span><AiOutlineGoogle/></span>
                  <span>Login with Google</span>
                </button>
              </div>
              {/* Login call to action */}
              <div className="text-center text-slate-600 pt-1">
                <p>Don't have an account ? <Link to="/register" className="text-[#ed6c02]">Register</Link></p>
              </div>
            </div>

            <div className="w-full h-full md:hidden">
              <img src="/images/user/login.jpg" className='w-full h-[100%]' alt="user_login_image.png" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login