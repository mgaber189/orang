import React from 'react'
import "../../css/popular.css";
import { Link } from 'react-router-dom';

export default function Popular() {
  return (
<section className='mb-5'>
  <h2 class="section-title mb-4 ml-auto"> <span className='text-dark'> Most Popular in </span> Orange Bay</h2>
  <div class="row justify-content-center">
    <div class="col-md-4 image1-item">
    <Link to="/videos">
        <img src="vid.png"  alt="Videos"/>   </Link>
        <p class="image-title">Videos</p>
      
    
    </div>
    
    <div class="col-md-4 image1-item">
      <Link to='/gallery'>
        <img src="img.png"  alt="Images"/>  </Link>
        <p class="image-title">Images</p>
     
    </div>
   
  </div>
  <br /> 
  <h2 className='text-center '> Programms </h2>
</section>

  )
}
