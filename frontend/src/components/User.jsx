import { useSelector} from 'react-redux'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserData } from '../reducers/userReducer'
import Loan from './Loan';
import Reservation from './Reservation';
import Notification from './Notification';

const User = () => {
    const dispatch = useDispatch()

    const user = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(getUserData()) 
      }, [dispatch]) 


   const showBooks = () => {
    if (user.books) {
        const booksToShow = user.books.map (book => <Loan key ={book.id} book = {book}/>)
        return booksToShow
    }
   }
   
   const showReservations = () => {
    if (user.reservedBooks) {
        console.log(user.reservedBooks)
        const reservations = user.reservedBooks.map(reservedBook=> <Reservation key ={reservedBook.id} reservedBook = {reservedBook}/>)
        return reservations
    }
   }

   const linkStyle = {
        color: "#54A4A6"
    }

    if (user) {
        return (
            <div key= {user.id}>
                 <Notification/>
                <br></br>
                User: 
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <Link style={linkStyle} to="/userdata">Change user details</Link>
                <p>Borrowed books:</p>
                {showBooks()}
                <p>Reservations:</p>
                {showReservations()}
            </div>
        )
    }
}

export default User