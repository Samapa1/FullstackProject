import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addRating } from "../reducers/ratingReducer.js";
import { addUserBookRating } from "../reducers/userReducer";
import { initializeBooks } from "../reducers/bookReducer";
import StarBar from "./StarBar";

const StarRating = ({ id } = {}) => {
  const dispatch = useDispatch();
  const allBooks = useSelector((state) => state.books);
  const book = allBooks.find((book) => book.id === Number(id));
  const user = useSelector((state) => state.user);

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
      <StarBar book={book} showHover={true} onClickEvent={rateBook} />
    </div>
  );
};

export default StarRating;
