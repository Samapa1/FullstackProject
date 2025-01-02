import { useDispatch } from "react-redux";
import { removeReservation } from "../reducers/reservationReducer";
import { getUserData } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer.js";
import { collectReservation } from "../reducers/reservationReducer";
import { Button } from "./Styles";
import { formatDate } from "../../utils/helper.js";

const Reservation = ({ reservation }) => {
  const dispatch = useDispatch();

  const remove = async (id) => {
    if (
      window.confirm(
        `Cancel book reservation (${reservation.book.title} by ${reservation.book.author})?`,
      )
    )
      await dispatch(removeReservation(id));
    await dispatch(getUserData());
  };

  const borrow = async () => {
    await dispatch(
      collectReservation({
        reservationId: reservation.id,
        userId: reservation.userId,
        bookId: reservation.bookId,
      }),
    );
    await dispatch(getUserData());
    await dispatch(
      setNotification(
        { data: `${reservation.book.title} borrowed`, type: "info" },
        3000,
      ),
    );
  };

  if (reservation.available) {
    return (
      <tbody>
        <tr>
          <td>
            {reservation.book.title} by {reservation.book.author}
          </td>
          <td>{formatDate(reservation.dueDate)}</td>
          <td>
            <Button onClick={() => remove(reservation.id)}> Cancel </Button>
          </td>
          <td>
            <Button onClick={() => borrow()}> Borrow </Button>
          </td>
        </tr>
      </tbody>
    );
  } else {
    return (
      <tbody>
        <tr>
          <td>
            {reservation.book.title} by {reservation.book.author}
          </td>
          <td>
            <Button onClick={() => remove(reservation.id)}> Cancel </Button>
          </td>
        </tr>
      </tbody>
    );
  }
};

export default Reservation;
