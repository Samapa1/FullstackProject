import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeReservations } from "../reducers/reservationReducer";
import { removeReservation } from "../reducers/reservationReducer";
import { getUserData } from "../reducers/userReducer"
import { formatDate } from "../../utils/helper.js";
import { Button, Table } from './Styles.jsx'
import Notification from './Notification.jsx'
import { setNotification } from '../reducers/notificationReducer.js'

const Reservationlist = () => {

    const dispatch = useDispatch()
    const reservations = useSelector(state => state.reservations)
 
    useEffect(() => {
        dispatch(getUserData());
      }, [dispatch]);
      
    useEffect(() => {
        dispatch(initializeReservations()) 
      }, []) 

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
            <Table>
                <tbody>
                <tr>
                    <th>User</th>
                    <th>Book</th>
                    <th>Available</th>
                </tr>
            {reservations.map(reservation => 
                <tr key = {reservation.id}>
                    <td> {reservation.user.name}</td> 
                    <td>{reservation.book.title} by {reservation.book.author} </td>
                    <td>{reservation.available ? `due date: ${formatDate(reservation.dueDate)}` : `not available`}</td>
                    <td><Button onClick = {() => handleRemoval(reservation)}>Remove</Button></td>
                </tr>
            )}
            </tbody>
            </Table>
            </div>
        )
    }

    return(
        <h1>Reservations</h1>
    )
}

export default Reservationlist