import { useState } from "react";
import { useSelector } from "react-redux";

const starBarNumbers = [1, 2, 3, 4, 5];

const StarBar = ({ book, showHover = false, onClickEvent = null }) => {
  const [hover, setHover] = useState(0);
  const user = useSelector((state) => state.user);
  const userRatings = user?.ratings;
  const userBookRating = userRatings?.find(
    (rating) => rating.bookId === book.id,
  );
  const stars = userBookRating?.stars;

  return (
    <div>
      {starBarNumbers.map((star) => (
        <span
          key={star}
          style={{
            color: (stars || hover) >= star ? "gold" : "gray",
            fontSize: `30px`,
          }}
          onMouseEnter={showHover ? () => setHover(star) : undefined}
          onMouseLeave={showHover ? () => setHover(0) : undefined}
          onClick={onClickEvent ? () => onClickEvent(star) : undefined}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarBar;
