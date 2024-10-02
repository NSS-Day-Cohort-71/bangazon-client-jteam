import { rateProduct } from "../../data/products";
import { RatingsContainer } from "./container";
import { Header } from "./header";

export function Ratings({
  productId,
  average_rating,
  refresh,
  ratingCount,
  number_purchased,
  number_of_likes,
}) {
  const saveRating = (newRating) => {
    if (!productId) {
      console.error("No product ID available");
      return;
    }
    rateProduct(productId, newRating).then(refresh);
  };

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
