import React from 'react';
import "../../css/welcome.css";
import { Link } from 'react-router-dom';
const Welcome =() => {
return (
<div className="container popular-section">
  <div className="row mb-5">
    <div className="col-md-6">
      <h2 className="section-title"><span className="text-dark">Welcome</span> to Orange Bay</h2>
      <p className="section-description">
        Orange Bay is a stunning natural bay in the ecologically protected island of Giftun.
        <br /> <br /> 
        The island is surrounded by unspoiled coral reefs, impressive marine life species, and white sandy beaches.
        The shallow crystal-clear turquoise sea stretches for almost one and a half KM and has a maximum depth of five M, making it an ideal spot to float away your worries.
        <br /> <br />
        It is located just forty minutes by boat from the new marina in 
        <br />Hurghada.
      </p>
      <div className="row justify-content-center">
    <Link to='./aboutus' className="text-center">
      <button className="btn-orange mt-5">More</button>
    </Link>
  </div>
      </div>
    <div className="col-md-6 mt-4 mb-5 ">
      <div className="row">
        
        <div className="col-md-10 mb-4 ml-5">
          <img src="coup.png" alt="Image 2" className="img-fluid" />
        </div>
       
      </div>
    </div>
  </div>
</div>

)
}
export default Welcome ; 