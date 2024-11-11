import { useDispatch } from 'react-redux'
import { removeReservation } from '../reducers/reservationReducer'
import { getUserData } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer.js'
import { collectReservation } from '../reducers/reservationReducer'
import { Button } from './Styles'


const Reservation = ( { reservedBook }) => {
    const dispatch = useDispatch()
  

    const remove = async (id) => {
       if (window.confirm(`Cancel book reservation (${reservedBook.title} by ${reservedBook.author})?`))
        await dispatch(removeReservation(id))
        await dispatch(getUserData()) 
       }

       const borrow = async () => {
        await dispatch(collectReservation({
            reservationId: reservedBook.reservation.id,
            userId: reservedBook.reservation.userId,
            bookId: reservedBook.reservation.bookId
        }))
        await dispatch(getUserData()) 
        await dispatch(setNotification( {data: `${reservedBook.title} borrowed`, type: 'info'}, 3000))
    }

    const formatDate = (duedate) => {
        let formatteddate = new Date(duedate)
        return formatteddate.toLocaleDateString()
    }

    if (reservedBook.reservation.available) {
    return (
    <div>
        <p>{reservedBook.title} by {reservedBook.author} {formatDate(reservedBook.reservation.dueDate)} <Button onClick= {() => remove(reservedBook.reservation.id)}> Cancel </Button>
        <Button onClick= {() => borrow()}> Borrow </Button>
        </p> 
    </div>
    )
    }

    return (
    <div>
        <p>{reservedBook.title} by {reservedBook.author} <Button onClick= {() => remove(reservedBook.reservation.id)}> Cancel </Button></p> 
    </div>
    )
}

export default Reservation