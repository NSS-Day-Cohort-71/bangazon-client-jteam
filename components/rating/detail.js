import { useState, useEffect } from "react";
import { rateProduct } from "../../data/products";
import { RatingsContainer } from "./container";
import { Header } from "./header";

export function Ratings({
  average_rating,
  refresh,
  ratingCount,
  number_purchased,
  number_of_likes,
}) {
  const [productId, setProductId] = useState(0);
  const saveRating = (newRating) => {
    rateProduct(productId, newRating).then(refresh);
  };
  useEffect(() => {
    if (ratingCount) {
      setProductId(ratingCount.product);
    }
  }, [ratingCount]);
  return (
    <div className="tile is-ancestor is-flex-wrap-wrap">
      <Header
        averageRating={average_rating}
        ratingsLen={ratingCount}
        numberPurchased={number_purchased}
        likesLength={number_of_likes}
      />
      <RatingsContainer ratingCount={ratingCount} saveRating={saveRating} />
    </div>
  );
}
