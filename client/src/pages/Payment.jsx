import React, { useState } from 'react'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom'

const Payment = () => {
  const { state : { price, items } } = useLocation()
  const [paymentMethod, setPaymentMethod] = useState('stripe')
  return (
    <div>
      <Headers/>
        <section className='bg-[#eeeeee]'>
          <div className='w-[90%] mx-auto py-16'>
            <div className="flex flex-wrap md:flex-col-reverse">

              {/* <div className="w-7/12 md:w-full">
                <div className="pr-2 md:pr-2">
                  <div className="flex flex-wrap">

                    <div onClick={() => setPaymentMethod('stripe')} className={`w-[20%] border-r cursor-pointer py-8 px-12 ${paymentMethod === 'stripe' ? 'bg-white' : 'bg-slate-100'}`}>
                      <div className='flex flex-col gap-[3px] justify-center items-center'>
                        <img src="../../images/payment/stripe.png" alt="stripe" />
                      </div>
                    </div>

                    <div onClick={() => setPaymentMethod('nogot')} className={`w-[20%] border-r cursor-pointer py-5 px-3 ${paymentMethod === 'nogot' ? 'bg-white' : 'bg-slate-100'}`}>
                      <div className='flex flex-col gap-[3px] justify-center items-center'>
                        <img src="../../images/payment/nogot.png" alt="nogot" />
                      </div>
                    </div>

                    <div onClick={() => setPaymentMethod('rocket')} className={`w-[20%] border-r cursor-pointer py-5 px-3 ${paymentMethod === 'rocket' ? 'bg-white' : 'bg-slate-100'}`}>
                      <div className='flex flex-col gap-[3px] justify-center items-center'>
                        <img src="../../images/payment/rocket.png" alt="rocket" />
                      </div>
                    </div>

                    <div onClick={() => setPaymentMethod('bkash')} className={`w-[20%] border-r cursor-pointer pt-8 px-2 ${paymentMethod === 'bkash' ? 'bg-white' : 'bg-slate-100'}`}>
                      <div className='flex flex-col gap-[3px] justify-center items-center'>
                        <img src="../../images/payment/bkash.png" alt="bkash" />
                      </div>
                    </div>

                  </div>
                </div>
              </div> */}

              {/* Summary Card Section */}
              <div className="w-6/12 md:w-full">
                <div className="pl-2 md:pl-0 md:mb-0">
                  <div className="bg-white shadow p-5 text-slate-600 flex flex-col gap-5">

                    <h2 className='font-semibold border-b pb-4'>ORDER SUMMARY</h2>

                    <div className='flex justify-between items-center border-b pb-4'>
                      <span>{items} Items and shipping fee included</span>
                      <span>${price}</span>
                    </div>

                    <div className='flex justify-between items-center font-semibold border-b pb-4'>
                      <span>Total Amount</span>
                      <span className='text-lg text-orange-500'>${price}</span>
                    </div>

                    <div className='flex justify-between items-center font-semibold border p-4 shadow-md'>
                      <span>Payment Method:</span>
                      {/* <span className='text-lg text-orange-500'>Stripe</span> */}
                      <img src="../../images/payment/stripe.png" className='h-[35px] rounded-md' alt="stripe" />
                    </div>

                    <button className='bg-orange-500 text-white py-3 transition-all duration-500 hover:bg-orange-400'>Pay Now (${price})</button>

                  </div>
                </div>
              </div>


            </div>
          </div>
        </section>
      <Footer/>
    </div>
  )
}

export default Payment