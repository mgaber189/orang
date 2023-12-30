import React from 'react'
import Slider from '../homepage/slider'
import SearchBar from '../homepage/searchbar'
import Welcome from '../homepage/welcome'
import Popular from '../homepage/popular'
import Program from '../homepage/program'
import Explore from '../homepage/explore'
import Membership from '../homepage/membership'
import Activities from '../homepage/activities'
import RelatedTripsComponent from '../homepage/related'
import Sponsors from '../homepage/sponsers'
import Footer from '../homepage/footer'
export default function Home() {
  
  return (
    <div >
      <Slider/>
      <SearchBar/>
      <div className='container'>
      <Welcome/>
      {/* <Popular/> */}
      </div>
      {/* <Program  /> */}
      <RelatedTripsComponent />

      <br /> 
      <Explore />
      <Membership/>
      {/* <Activities/> */}
      {/* <RelatedTripsComponent /> */}
      <Sponsors /> 
       

    </div>
  )
}
