import React, { useContext, useEffect, useState } from "react";
import r from "../../assets/Review.png";
import "../../css/reservation/reviews.css";
import { useParams } from "react-router";
import { useSSR } from "react-i18next";
import { instance } from "../../api/axios";
import Rating from "react-rating";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
export default function Reviews() {
  const {id} = useParams();
  const auth=useContext(AuthContext);
  const token=localStorage.getItem("token")
  const [reviews,setReviews]=useState([])
  const [textArea,setTextArea]=useState("");
  const postReview=()=>{
    if(token){
      instance.post("Programs/Reviews",{
          programId:id,
          userId:auth?.id,
          review:textArea,
          rateFromFive:0,
      }).then((res)=>{
        setTextArea("")
        getReviewsHandler();
      })
    }else{
      toast.warning("Please sign in first")
    }
  }
  const getReviewsHandler=()=>{
    instance.get(`Programs/${id}/Reviews`).then((res)=>{
      setReviews(res?.data?.data)
    }).catch((err)=>{
      console.log(err)

    })
  }
  useEffect(()=>{
    getReviewsHandler()
  },[])
  console.log(textArea)
  return (
    <div>
      <div className="row mt-4">
        <div className="col-md-12">
          {reviews?.map((review,index)=>{
            return(
              <div key={index} className="reviewCard">
                <div className="reviewLeftCard">
                  <div className="imageContainer">
                    <img width={100} height={100} src={review?.userPhotoUrl} alt="userPhoto" />
                  </div>
                </div>
                <div className="reviewRightCard">
                  <div className="cardText">
                    <h2>{review?.userFullName}</h2>
                    <p>{review?.description}</p>
                  </div>
                  <Rating emptySymbol={<IoIosStarOutline  />} fullSymbol={<IoIosStar color="#F47732" />} initialRating={review?.rate} readonly />
                </div>
              </div>
            )
          })}
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="review">Write your review</label>
            <textarea
              value={textArea}
              onChange={(e)=>setTextArea(e.target.value)}
              className="form-control"
              style={{ width: "700px" }}
              id="review"
              rows="4"></textarea>
          </div>
          <button onClick={()=>postReview()} className="btn btn-orange">Submit</button>
        </div>
      </div>
    </div>
  );
}
