import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Link } from 'react-router-dom'

const Banner = () => {
  const responsive = {
    superLargeDesktop : {
      breakpoint : { max: 4000, min: 3000 },
      items : 1
    },
    desktop : {
      breakpoint : { max: 3000, min: 1024 },
      items : 1
    },
    tablet : {
      breakpoint : { max: 1024, min: 464 },
      items : 1
    },
    mobile : {
      breakpoint : { max: 464, min: 0 },
      items : 1
    },
  }
;
  
  return (
    <div className='w-[95%] mx-auto md:mt-6'>
      <div>
        <div className='w-full flex flex-wrap md:gap-8'>
          <div className='w-full'>
            <div className='mb-8'>
              <Carousel
                autoPlay={true}
                infinite={true}
                arrows={false}
                showDots={true}
                responsive={responsive}
                className='md:h-auto z-0'
              >
                {[1, 2, 3].map((img, i) => (
                  <Link key={i} className='h-auto w-full block'>
                    <img
                      className='w-full h-auto object-contain'
                      src={`../../images/banner/${img}.jpg`}
                      alt=''
                    />
                  </Link>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner