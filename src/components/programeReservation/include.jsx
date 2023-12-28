import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { instance } from "../../api/axios";
import { FaCheck } from "react-icons/fa";
import "../../css/reservation/include.css"
export default function IncludedExcluded() {
  const { id } = useParams();
  const [included, setIncluded] = useState([]);
  const [excluded, setExcluded] = useState([]);
  const getIncludedExcludedHandler = () => {
    instance(`Programs/${id}/IncludedAndExcluded`).then((res) => {
      setExcluded(res?.data?.data?.excluded);
      setIncluded(res?.data?.data?.included);
    });
  };
  useEffect(() => {
    getIncludedExcludedHandler();
  }, []);
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <h6 className="mb-4 text-secondary">Included</h6>
          {included?.map((include,index)=>{
            return(
              <div key={index} className="line">
                <FaCheck color="#007489" className="check-icon" />
                {include}
              </div>
            )
          })}
        </div>
        <div className="col-md-6">
          <h6 className="mb-4 text-secondary">Excluded</h6>
          {excluded?.map((include,index)=>{
            return(
              <div key={index} className="line">
                <FaCheck color="#007489" className="check-icon" />
                {include}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
