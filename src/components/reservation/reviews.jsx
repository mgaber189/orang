import React from 'react'

export default function Reviews() {
  return (
<div>
  <div className="row mt-4">
    <div className="col-md-12">
      <img src="review.png" width={706} alt="" />
    </div>
    <div className="col-md-6">
      <div className="form-group">
        <label htmlFor="review">Write your review</label>
        <textarea className="form-control" style={{ width: '700px' }} id="review" rows="4"></textarea>
      </div>
      <button className="btn btn-orange">Submit</button>
    </div>
  </div>
</div>

  )
}
