import { useDispatch } from 'react-redux'
import { removeReservation } from '../reducers/reservationReducer'
import { getUserData } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer.js'


const Reservation = ( { reservedBook }) => {
    const dispatch = useDispatch()
  

    const remove = async (id) => {
        console.log(reservedBook)
        console.log(reservedBook.id)
        await dispatch(removeReservation(id))
        await dispatch(getUserData()) 
        await dispatch(setNotification( {data: `reservation removed`, type: 'info'}, 3000))
       }
   
    return (
    <div>
        <p>{reservedBook.title} by {reservedBook.author} <button onClick= {() => remove(reservedBook.reservation.id)}> Cancel </button></p> 
    </div>
    )
}

export default Reservation