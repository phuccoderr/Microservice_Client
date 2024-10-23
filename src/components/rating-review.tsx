import React, { Dispatch } from "react";
import { Rating, RatingProps } from "react-simple-star-rating";

const tooltipArray = ["Rất tệ", "Tệ", "Trung bình", "Tốt", "Tuyệt vời"];

const RatingReview = (props: RatingProps) => {
  return (
    <Rating
      SVGstyle={{ display: "inline" }}
      className="flex"
      size={25}
      tooltipArray={tooltipArray}
      {...props}
    />
  );
};

export default RatingReview;
