import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addRating } from "../reducers/ratingReducer.js";
import { addUserBookRating } from "../reducers/userReducer";
import { initializeBooks } from "../reducers/bookReducer";

const StarRating = ({ id } = {}) => {
  const dispatch = useDispatch();
  const allBooks = useSelector((state) => state.books);
  const book = allBooks.find((book) => book.id === Number(id));
  const user = useSelector((state) => state.user);
  const userRatings = user?.ratings;
  const userBookRating = userRatings?.find(
    (rating) => rating.bookId === book.id,
  );
  const stars = userBookRating?.stars;

  const [hover, setHover] = useState(0);
  const starBar = [1, 2, 3, 4, 5];

  useEffect(() => {
    dispatch(initializeBooks());
  }, [user]);

  const rateBook = async (star) => {
    const newRating = {
      bookId: book.id,
      userId: user.id,
      stars: star,
    };
    await dispatch(addRating(newRating));
    dispatch(addUserBookRating(newRating));
  };

  return (
    <div>
      {starBar.map((star) => (
        <span
          key={star}
          style={{
            cursor: "pointer",
            color: (stars || hover) >= star ? "gold" : "gray",
            fontSize: `30px`,
          }}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => {
            rateBook(star);
          }}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
