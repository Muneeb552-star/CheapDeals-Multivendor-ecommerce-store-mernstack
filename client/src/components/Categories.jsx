import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const Categories = () => {

  const dispatch = useDispatch()
  const { categories } = useSelector(state => state.home)

  // const categories = [
  //   'shirts',
  //   'jackets',
  //   'jeans',
  //   'hoodies',
  //   'shoes',
  //   'coats',
  //   'bags'
  // ]

  // box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)

  /* Here we will set the Carousel responsiveness. Responsive Screen Sizes for different screens/devices */
  const responsive = {
    superLargeDesktop : {
      breakpoint : { max: 4000, min: 3000 },
      items : 6
    },
    desktop : {
      breakpoint : { max: 3000, min: 1024 },
      items : 6
    },
    tablet : {
      breakpoint : { max: 1024, min: 464 },
      items : 4
    },
    mdtablet : {
      breakpoint : { max: 991, min: 464 },
      items : 4
    },
    mobile : {
      breakpoint : { max: 768, min: 0 },
      items : 3
    },
    smmobile : {
      breakpoint : { max: 640, min: 0 },
      items : 2
    },
    xsmobile : {
      breakpoint : { max: 440, min: 0 },
      items : 1
    },
  }
  
  return (
    <div className="w-[95%] mx-auto relative">
        <Carousel
          autoPlay={true}
          infinite={true}
          responsive={responsive}
          transitionDuration={500}
          className='z-0'
        >
          {
            categories.map((c, i) => (
              <Link key={i} className="h-[185px] bg-white border block mx-2 shadow-lg rounded-lg" to='#'>
                <div className=' h-full relative p-3'>
                  <img className="w-[130px] h-[130px] mx-auto relative p-3" src={c.image} alt={c.name} />
                  <div className='absolute bottom-0 w-full mx-auto font-normal left-0 flex justify-center items-center'>
                    <span className='py-[8px] w-full bg-[#F5F5F5] text-black text-center'>{c.name}</span>
                  </div>
                </div>
              </Link>
            ))
          }
        </Carousel>
    </div>
  );
}

export default Categories