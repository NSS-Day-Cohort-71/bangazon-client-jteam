import { useState } from "react";
import dynamic from "next/dynamic";

export default function RatingForm({ saveRating }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const Rating = dynamic(
    () => import("react-simple-star-rating").then((mod) => mod.Rating),
    {
      ssr: true,
    }
  );

  const handleRating = (rate) => {
    setRating(rate);
  };

  const submitRating = () => {
    const outOf5 = rating;

    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    const ratingData = {
      score: outOf5,
      rating_text: comment,
    };

    saveRating(ratingData);

    // Reset form
    setRating(0);
    setComment("");
  };

  return (
    <div className="tile is-child">
      <article className="media box">
        <figure className="media-left">
          <Rating
            onClick={handleRating}
            ratingValue={rating}
            initialValue={0}
          />
        </figure>
        <div className="media-content">
          <div className="field">
            <p className="control">
              <textarea
                className="textarea"
                placeholder="Add your review"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className="button" onClick={submitRating}>
                Post Rating
              </button>
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
