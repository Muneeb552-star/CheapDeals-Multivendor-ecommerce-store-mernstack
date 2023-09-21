import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { get_products } from "../store/reducers/homeReducer"
// Componenets Import
import Headers from "../components/Headers"
import Banner from "../components/Banner"
import Categories from "../components/Categories"
import Footer from "../components/Footer"
import FeaturedProducts from "../components/products/FeaturedProducts"
import Products from "../components/products/Products"
import Perks from "../components/Perks"

const Home = () => {

  const dispatch = useDispatch()
  const { products, latest_products, top_rated_products, discount_products } = useSelector(state => state.home )

  
  useEffect(() => {
    dispatch(get_products())
  }, [])

  return (
    <div className="w-full">
      <Headers />
      <Banner />

      {/* <div className="mt-3 mb-7">
        <Perks />
      </div> */}
      
      <div className="my-4">
        <Categories />
      </div>

      <div className="py-[45px]">
        <FeaturedProducts products={products} />
      </div>

      {/* Carousel slide products */}
      <div className="py-10">
        <div className="w-[95%] flex flex-wrap mx-auto">
          <div className="grid w-full grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-7">
            <div className="overflow-hidden">
              <Products title="Latest Products" products={latest_products}/>
            </div>
            <div className="overflow-hidden">
              <Products title="To Rated Products" products={top_rated_products}/>
            </div>
            <div className="overflow-hidden">
              <Products title="Discount Products" products={discount_products} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home

