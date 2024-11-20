import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeReservations } from "../reducers/reservationReducer";
import { removeReservation } from "../reducers/reservationReducer";
import { getUserData } from "../reducers/userReducer"
import { formatDate } from "../../utils/helper.js";
import { listStyle, Button } from './Styles.jsx'
import Notification from './Notification.jsx'
import { setNotification } from '../reducers/notificationReducer.js'

const Reservationlist = () => {

    const dispatch = useDispatch()
    const reservations = useSelector(state => state.reservations)
    console.log(reservations)

    useEffect(() => {
        dispatch(getUserData());
      }, [dispatch]);
      
    useEffect(() => {
        dispatch(initializeReservations()) 
      }, [reservations]) 

    const handleRemoval = async (reservation) => {
      
        if (window.confirm(`Remove ${reservation.user.name}'s book ${reservation.book.title} by ${reservation.book.author}?`)) {
            dispatch(removeReservation(reservation.id))
            dispatch(setNotification( {data: `Reservation removed`, type: 'info'}, 3000))
        }  
    }


    if (reservations.length > 0) {
        return(
            <div>
            <Notification/>
            <h1>Reservations</h1>
            {reservations.map(reservation => 
                <div key = {reservation.id} style={listStyle}>
                    <div>
                        {reservation.user.name} {reservation.book.title} by {reservation.book.author} 
                        {reservation.available ? `, due date: ${formatDate(reservation.dueDate)}` : `, not available`}
                    </div>
                        <Button onClick = {() => handleRemoval(reservation)}>Remove</Button>
                </div>
            )}
            </div>
        )
    }
}

export default Reservationlist