import { useSelector} from 'react-redux'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserData } from '../reducers/userReducer'
import Loan from './Loan';
import Reservation from './Reservation';
import Notification from './Notification';
import { linkStyle2 } from './Styles'

const User = () => {
    const dispatch = useDispatch()

    const user = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(getUserData()) 
      }, [dispatch]) 


   const showLoans = () => {
    if (user.loans) {
        const borrowedBooks = user.loans.map (book => <Loan key ={book.id} loan = {book}/>)
        return borrowedBooks
    }
   }
   
   const showReservations = () => {
    if (user.reservations) {
        const reservations = user.reservations.map(reservedBook=> <Reservation key ={reservedBook.id} reservation = {reservedBook}/>)
        return reservations
    }
   }
   

    if (user) {
        return (
            <div>
                <Notification/>
                <h1>User</h1>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <Link style={linkStyle2} to="/userdata">Change user details</Link>
                <p>Borrowed books:</p>
                {showLoans()}
                <p>Reservations:</p>
                {showReservations()}
            </div>
        )
    }
}

export default User