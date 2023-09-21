import React from 'react'
import { Link } from 'react-router-dom'
import { BiLogoFacebook, BiLogoTwitter, BiLogoLinkedin, BiLogoGithub } from 'react-icons/bi'

const Footer = () => {
  return (
    <footer className='bg-[#f3f6fa]'>
        <div className='w-[95%] flex flex-wrap mx-auto border-b py-16 md:pb-10 sm:pb-6'>
            <div className="w-3/12  md:w-4/12 xs:w-full">
                <div className="flex flex-col gap-3">
                    <img className='w-[190px] h-[70px]' src="/images/logo/website_logo.png" alt="website_logo"/>
                    <span className='text-slate-900 text-base font-medium'>CheapDeals is a growing eCommerce Store. We provide wide range of products that best suite for you.</span>
                </div>
            </div>
            <div className="w-3/12  md:w-4/12 xs:w-full">
              <div className="flex justify-center sm:justify-start sm:mt-6 w-full">
                <div>
                  <h2 className='font-bold text-lg mb-2'>Useful Links</h2>
                    <ul className='flex flex-col gap-2 text-slate-600 font-medium text-sm'>
                      <li><Link>About Us</Link></li>
                      <li><Link>About Our Shop</Link></li>
                      <li><Link>Delivery Information</Link></li>
                      <li><Link>Privacy Policy</Link></li>
                      <li><Link>Blogs</Link></li>
                      <li><Link>Sitemap</Link></li>
                    </ul>
                </div>
              </div>
            </div>
            <div className="w-3/12  md:w-4/12 xs:w-full">
              <div className="flex justify-center sm:justify-start sm:mt-6 w-full">
                <div>
                  <h2 className='font-bold text-lg mb-2'>Information</h2>
                    <ul className='flex flex-col gap-2 text-slate-600 font-medium text-sm'>
                      <li><Link>Who We Are</Link></li>
                      <li><Link>Our Services</Link></li>
                      <li><Link>Projects</Link></li>
                      <li><Link>Contact</Link></li>
                      <li><Link>Innovation</Link></li>
                      <li><Link>Testimonials</Link></li>
                    </ul>
                </div>
              </div>
            </div>
            {/* Subscribe call to action */}
            <div className='w-3/12  md:w-4/12 xs:w-full md:mt-7'>
              <div className="w-full flex flex-col justify-start gap-5">
                <h2 className='font-bold text-lg mb-2'>Join Us</h2>
                <span>Get Email updates about our latest and shop special offers</span>

                <div className='h-[50px] w-full bg-white border rounded-md relative'>
                  <input type="email" className='h-full w-full pl-3 pr-[90px] outline-0 bg-transparent' placeholder='Enter your email' />
                  <button className='w-[90px] h-full absolute right-0 bg-[#6466E8] text-white uppercase px-2 font-bold text-sm rounded-md'>Subscribe</button>
                </div>

                <ul className='flex justify-start items-start gap-3'>
                  <li>
                    <a className='w-[38px] h-[38px] flex justify-center items-center bg-white hover:bg-[#6466E8] hover:text-white text-lg cursor-pointer shadow-md rounded-md'><BiLogoFacebook /></a>
                  </li>
                  <li>
                    <a className='w-[38px] h-[38px] flex justify-center items-center bg-white hover:bg-[#6466E8] hover:text-white text-lg cursor-pointer shadow-md rounded-md'><BiLogoTwitter /></a>
                  </li>
                  <li>
                    <a className='w-[38px] h-[38px] flex justify-center items-center bg-white hover:bg-[#6466E8] hover:text-white text-lg cursor-pointer shadow-md rounded-md'><BiLogoLinkedin /></a>
                  </li>
                  <li>
                    <a className='w-[38px] h-[38px] flex justify-center items-center bg-white hover:bg-[#6466E8] hover:text-white text-lg cursor-pointer shadow-md rounded-md'><BiLogoGithub /></a>
                  </li>
                </ul>

              </div>
            </div>
        </div>

        {/* copyright section */}
        <div className='w-[85%] flex flex-wrap justify-center items-center text-slate-600 mx-auto py-5 text-center'>
          <span>Copyright &copy;2023 All Rights Reserved | made by <a className='text-blue-500 underline' href="#">Cheap Deals</a></span>
        </div>
    </footer>
  )
}

export default Footer