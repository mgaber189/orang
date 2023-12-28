import React, { useEffect, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "../../css/program.css"
import { instance } from "../../api/axios";
export default function Programline() {
  const [plans,setPlan]=useState([])
  const getPlansHandler=()=>{
    instance.get(`Programs/1/Plan`).then((res)=>{
      setPlan(res?.data?.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getPlansHandler()
  },[])
  return (
    <div className="mt-4">
      <VerticalTimeline layout={"1-column-left"} lineColor={"orange"}>
        {plans.map((plan,index)=>{
          return(
            <VerticalTimelineElement
            key={index}
            className="vertical-timeline-element--work"
            contentStyle={{ color: "black" , padding:"0" , fontSize:"2rem" }}
            contentArrowStyle={{  }}
            date={plan?.description}
            iconStyle={{
              background: "#fff",
              border: "2px solid orange",
              color: "orange",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow:"none",
              fontSize:"20px",
              width:"50px",
              height:"50px",
            }}
            icon={index<10?`0${index+1}`:index+1}>
              <p className="timelineP">{plan?.time}</p>
            </VerticalTimelineElement>
          )
        })}
      </VerticalTimeline>
    </div>
  );
}
