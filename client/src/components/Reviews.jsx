import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { customer_review, clearMessage, get_reviews } from '../store/reducers/homeReducer'
import { toast } from 'react-hot-toast'
// import RatingTemp from './RatingTemp'
// MUI Imports
import { Rating, Pagination, PaginationItem, TextField, Box } from '@mui/material'

const Reviews = ({ product }) => {

  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.auth)
  const { reviews, total_reviews, rating_review, successMessage } = useSelector(state => state.home)

  const [rating, setRating] = useState(0) // Initial rating value
  const [review, setReview] = useState('')

  /* pagination state variables */
  const [pageNumber, setPageNumber] = useState(1)
  const itemsPerPage = 5 // Number of items to display per page
  const totalItems = total_reviews  // Total number of items
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  console.log(pageNumber)


  /* This function will handle the submit review. */
  const submit_review = (e) => {
    e.preventDefault()
    const obj = {
        name: userInfo.name,
        review: review,
        rating: rating,
        productId: product._id
    }
    dispatch(customer_review(obj))
  }


  /* This useEffect hook will show success - error messages on state change */
  useEffect(() => {
    if(successMessage) {
      toast.success(successMessage)
      setRating('')
      setReview('')
      dispatch(clearMessage()) 
    }
  }, [successMessage, dispatch])


  /* This useEffect hook will get all reviews related to this product */
  useEffect(() => {
    if(product._id) {
        dispatch(get_reviews({
            productId: product._id,
            pageNumber
        }))
    }
  }, [product, pageNumber, dispatch])


  return (
    <div className='mt-8'>
      <div className="flex gap-10 md:flex-col">
        <div className="flex flex-col gap-2 justify-start items-start py-4">
            <div>
                <span className='text-6xl font-semibold'>{product.rating}</span>
                <span className='text-3xl font-semibold text-slate-600'>/5</span>
            </div>

            <div className="flex text-4xl">
                {/* MUI Rating */}
                <div className="flex justify-start items-center gap-4 pb-2 ">
                    <div className="flex text-xl">
                        <Rating name="half-rating-read" value={parseInt(product.rating)} precision={0.5} size="small" readOnly />
                    </div>
                    <span className='text-sm text-slate-500'>({total_reviews} reviews)</span>
                </div>
            </div>
        </div>

            <div className="flex flex-col gap-2 py-4">

                {/* MUI Rating */}
                <div className="flex justify-start items-center gap-5">
                    <div className="text-md flex gap-1 w-[93px]">
                        <Rating name="half-rating-read" defaultValue={5} precision={0.5} size="small" readOnly />
                    </div>
                    <div className='w-[200px] h-[14px] bg-slate-200 relative'>
                        <div 
                            className="h-full bg-[#EDBB0E]"
                            style={{ width: `${Math.floor((100 * (rating_review[0]?.sum || 0)) / total_reviews)}%` }}
                        >
                        </div>
                    </div>
                    <p className="text-sm text-slate-600 w-[0%]">{rating_review[0]?.sum}</p>
                </div>

                <div className="flex justify-start items-center gap-5">
                    <div className="text-md flex gap-1 w-[93px]">
                        <Rating name="half-rating-read" defaultValue={4} precision={0.5} size="small" readOnly />
                    </div>
                    <div className='w-[200px] h-[14px] bg-slate-200 relative'>
                        <div 
                            className="h-full bg-[#EDBB0E]"
                            style={{ width: `${Math.floor((100 * (rating_review[1]?.sum || 0)) / total_reviews)}%` }}
                        >
                        </div>
                    </div>
                    <p className="text-sm text-slate-600 w-[0%]">{rating_review[1]?.sum}</p>
                </div>

                <div className="flex justify-start items-center gap-5">
                    <div className="text-md flex gap-1 w-[93px]">
                        <Rating name="half-rating-read" defaultValue={3} precision={0.5} size="small" readOnly />
                    </div>
                    <div className='w-[200px] h-[14px] bg-slate-200 relative'>
                        <div 
                            className="h-full bg-[#EDBB0E]"
                            style={{ width: `${Math.floor((100 * (rating_review[2]?.sum || 0)) / total_reviews)}%` }}
                        >
                        </div>
                    </div>
                    <p className="text-sm text-slate-600 w-[0%]">{rating_review[2]?.sum}</p>
                </div>

                <div className="flex justify-start items-center gap-5">
                    <div className="text-md flex gap-1 w-[93px]">
                        <Rating name="half-rating-read" defaultValue={2} precision={0.5} size="small" readOnly />
                    </div>
                    <div className='w-[200px] h-[14px] bg-slate-200 relative'>
                        <div 
                            className="h-full bg-[#EDBB0E]"
                            style={{ width: `${Math.floor((100 * (rating_review[3]?.sum || 0)) / total_reviews)}%` }}
                        >
                        </div>
                    </div>
                    <p className="text-sm text-slate-600 w-[0%]">{rating_review[3]?.sum}</p>
                </div>

                <div className="flex justify-start items-center gap-5">
                    <div className="text-md flex gap-1 w-[93px]">
                        <Rating name="half-rating-read" defaultValue={1} precision={0.5} size="small" readOnly />
                    </div>
                    <div className='w-[200px] h-[14px] bg-slate-200 relative'>
                        <div 
                            className="h-full bg-[#EDBB0E]"
                            style={{ width: `${Math.floor((100 * (rating_review[4]?.sum || 0)) / total_reviews)}%` }}
                        >
                        </div>
                    </div>
                    <p className="text-sm text-slate-600 w-[0%]">{rating_review[4]?.sum}</p>
                </div>

                <div className="flex justify-start items-center gap-5">
                    <div className="text-md flex gap-1 w-[93px]">
                        <Rating name="half-rating-read" defaultValue={0} precision={0.5} size="small" readOnly />
                    </div>
                    <div className='w-[200px] h-[14px] bg-slate-200 relative'>
                        <div className="h-full bg-[#EDBB0E] w-[0%]"></div>
                    </div>
                    <p className="text-sm text-slate-600 w-[0%]">0</p>
                </div>

            </div>
        </div>

        {/* User Reviews  */}
        <h2 className="text-slate-600 text-xl font-bold py-5">Product Reviews: {total_reviews}</h2>
        <div className="flex flex-col gap-8 pb-10 pt-4">
            {
                reviews.map((review, i) => <div key={i} className='flex flex-col gap-1'>
                    <div className="flex justify-between items-center">
                        <div className="text-md flex">
                            <Rating name="half-rating-read" value={parseInt(review.rating)} precision={0.5} size="small" readOnly />
                        </div>
                        <span className='text-slate-600'>{review.date}</span>
                    </div>
                    <span className='text-[#ed6c02] text-md font-medium'>{review.name}</span>
                    <p className="text-slate-600 text-sm">
                        {review.review}
                    </p>
                </div>)
            }
            {/* Pagination component */}
            <div className="flex items-center md:justify-center justify-end mt-5">
                {
                    total_reviews > 5 && <Pagination
                        count={totalPages}
                        page={pageNumber}
                        color="warning"
                        renderItem={(item) => (
                        <PaginationItem component="div" {...item} />
                    )}
                />
                }
                
            </div>

            {/* Submit Review Section with condition */} 
            {
                userInfo 
                ?   <div className="flex flex-col gap-3">
                        <div className="flex gap-1">
                            <Rating 
                                name="half-rating-read"
                                value={rating} 
                                precision={0.5} 
                                size="large"
                                onChange={(e) => setRating(parseInt(e.target.value))}
                            />
                        </div>
                        <form onSubmit={submit_review}>
                            <textarea
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                className='border outline-0 p-3 w-full' name="review_message" id="" cols="30" rows="5" required>    
                            </textarea>
                            <div className="mt-2">
                                <button type='submit' className='py-2 px-6 bg-[#6466E8] text-white rounded-sm'>Submit Review</button>
                            </div>
                        </form>
                    </div>
                : <div><Link to="/login" className="py-2 px-6 bg-[#ed6c02] text-white rounded-sm">Login</Link></div>
            }
        </div>
        
      </div>
  )
}

export default Reviews