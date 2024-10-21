import { useDispatch } from 'react-redux'
import { removeReservation } from '../reducers/reservationReducer'
import { getUserData } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer.js'
import { addLoan } from '../reducers/loanReducer.js'


const Reservation = ( { reservedBook }) => {
    const dispatch = useDispatch()
  

    const remove = async (id) => {
       if (window.confirm(`Cancel book reservation (${reservedBook.title} by ${reservedBook.author})?`))
        await dispatch(removeReservation(id))
        await dispatch(getUserData()) 
       }

       const borrow = async () => {
        await dispatch (addLoan({
            userId: reservedBook.reservation.userId,
            bookId: reservedBook.reservation.bookId
        }))
        await dispatch(removeReservation(reservedBook.reservation.id))
        await dispatch(getUserData()) 
        await dispatch(setNotification( {data: `${reservedBook.title} borrowed`, type: 'info'}, 3000))
     

    }
       
    if (reservedBook.reservation.available) {
    return (
    <div>
        <p>{reservedBook.title} by {reservedBook.author} <button onClick= {() => remove(reservedBook.reservation.id)}> Cancel </button>
        <button onClick= {() => borrow()}> Borrow </button>
        </p> 
    </div>
    )
    }

    return (
    <div>
        <p>{reservedBook.title} by {reservedBook.author} <button onClick= {() => remove(reservedBook.reservation.id)}> Cancel </button></p> 
    </div>
    )
}

export default Reservation