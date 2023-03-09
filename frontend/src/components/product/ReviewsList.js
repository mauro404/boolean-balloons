import React from "react";

const ReviewsList = ({ reviews }) => {
  return (
    <div className="row d-flex justify-content-around">
      <div className="col-lg-11 col-10 mt-5">
        <h4 className="">Reviews:</h4>
        <hr className="" />
        {reviews &&
          reviews.map((review) => (
            <div key={review._id} className="review-card my-3">
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(review.rating / 5) * 100}%` }}
                ></div>
              </div>
              <p className="review_user">by {review.name}</p>
              <p className="review_comment">{review.comment}</p>

              <hr />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ReviewsList;
