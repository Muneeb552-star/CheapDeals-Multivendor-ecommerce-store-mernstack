import React from 'react'
import { LiaShippingFastSolid } from 'react-icons/lia'
import { MdSupportAgent } from 'react-icons/md'
import { FaRegCreditCard } from 'react-icons/fa'
import { FiGift } from 'react-icons/fi'

const Perks = () => {
  return (
    <div className='w-[95%] mx-auto relative'>
        <div className="w-full grid grid-cols-4 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-8">

            <div className="flex items-start justify-start gap-4 p-5 rounded-md bg-slate-100">
                <div className='text-6xl text-center text-blue-500 p-3 rounded-md bg-white'><LiaShippingFastSolid /></div>
                <div className='flex flex-col gap-2'>
                    <h4 className='text-lg font-medium text-black'>Free Delivery</h4>
                    <h4 className='text-base text-slate-600'>Free shipping on orders $200.00</h4>
                </div>
            </div>

            <div className="flex items-start justify-start gap-4 p-5 rounded-md bg-slate-100">
                <div className='text-6xl  text-center text-blue-500 p-3 rounded-md bg-white'><MdSupportAgent /></div>
                <div className='flex flex-col gap-2'>
                    <h4 className='text-lg font-medium text-black'>24/7 Help Center</h4>
                    <h4 className='text-base text-slate-600'>Support online 24h on day</h4>
                </div>
            </div>

            <div className="flex items-start justify-start gap-4 p-5 rounded-md bg-slate-100">
                <div className='text-6xl  text-center text-blue-500 p-3 rounded-md bg-white'><FaRegCreditCard /></div>
                <div className='flex flex-col gap-2'>
                    <h4 className='text-lg font-medium text-black'>Money Guarantee</h4>
                    <h4 className='text-base text-slate-600'>30 days money back</h4>
                </div>
            </div>

            <div className="flex items-start justify-start gap-4 p-5 rounded-md bg-slate-100">
                <div className='text-6xl  text-center text-blue-500 p-3 rounded-md bg-white'><FiGift /></div>
                <div className='flex flex-col gap-2'>
                    <h4 className='text-lg font-medium text-black'>Gift Promotion</h4>
                    <h4 className='text-base text-slate-600'>on orders over $49</h4>
                </div>
            </div>
            
            

        </div>
    </div>
  )
}

export default Perks