import { useDispatch } from 'react-redux'
import { removeReservation } from '../reducers/reservationReducer'
import { getUserData } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer.js'
import { collectReservation } from '../reducers/reservationReducer'
import { Button } from './Styles'


const Reservation = ( { reservation }) => {
    const dispatch = useDispatch()

    const remove = async (id) => {
       if (window.confirm(`Cancel book reservation (${reservation.book.title} by ${reservation.book.author})?`))
        await dispatch(removeReservation(id))
        await dispatch(getUserData()) 
       }

       const borrow = async () => {
        await dispatch(collectReservation({
            reservationId: reservation.id,
            userId: reservation.userId,
            bookId: reservation.bookId
        }))
        await dispatch(getUserData()) 
        await dispatch(setNotification( {data: `${reservation.book.title} borrowed`, type: 'info'}, 3000))
    }

    const formatDate = (duedate) => {
        let formatteddate = new Date(duedate)
        return formatteddate.toLocaleDateString()
    }

    if (reservation.available) {
    return (
    <div>
        <p>{reservation.book.title} by {reservation.book.author} {formatDate(reservation.dueDate)} <Button onClick= {() => remove(reservation.id)}> Cancel </Button>
        <Button onClick= {() => borrow()}> Borrow </Button>
        </p> 
    </div>
    )
    }

    return (
    <div>
        <p>{reservation.book.title} by {reservation.book.author} <Button onClick= {() => remove(reservation.id)}> Cancel </Button></p> 
    </div>
    )
}

export default Reservation