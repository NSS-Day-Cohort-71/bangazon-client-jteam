import { RatingCard } from './card'
import RatingForm from './form'

export function RatingsContainer({ ratingCount, saveRating }) {
  return (
    <div className="tile is-parent is-12 is-vertical container">
      <RatingForm saveRating={saveRating} />
      {/* Display the rating count instead of mapping through ratings */}
      <p>{`This product has ${ratingCount} ratings.`}</p>
    </div>
  )
}