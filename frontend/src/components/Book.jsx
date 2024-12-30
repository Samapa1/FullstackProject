import { useParams } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import { addLoan } from "../reducers/loanReducer.js"
import { addReservation } from "../reducers/reservationReducer.js"
import { getUserData } from "../reducers/userReducer"
import { useState, useEffect } from 'react'
import { useSelector} from 'react-redux'
import { setNotification } from '../reducers/notificationReducer.js'
import statusService from "../services/status"
import Notification from './Notification.jsx'
import { Button, linkStyle2, pstyle } from './Styles'
import StarRating from './StarRating' 
import StarBar from './StarBar'
import BasicBookData from './BasicBookData.jsx'

const Book = () => {  
    const id = useParams().id

    const [available, changeAvailability] = useState(null)
    const [borrowed, changeBorrowed] = useState(null)
    const [reserved, changeReserved] = useState(null)
    const [numberOfReservations, changeNumberOfReservations] = useState(null)
    const allBooks = useSelector(state => state.books)
    const book = allBooks.find(book => book.id === Number(id))
    const user = useSelector(state => state.user)
  
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserData()) 
      }, [borrowed, reserved, dispatch]) 
  
    useEffect(() => {
        const checkAvailability = async () => {
            if (book) {
                let bookStatus = await statusService.getStatus(book.id)
                changeNumberOfReservations(bookStatus.reservations)
                if (bookStatus.status === "available") {
                    changeAvailability(true)
                }
                else {
                    changeAvailability(false)
                }
            }
        }
        checkAvailability()
    }, [book, user])

    useEffect(() => {
        if (user && user.loans) {
        if (user.loans.find(userbook => userbook.book.title === book.title )) {
            changeBorrowed(true)

        }
        else {
            changeBorrowed(false)
        }
    }
    }, [book, user])


    useEffect(() => {
        if (user && user.reservations) {
            if (user.reservations.find(reservedBook => reservedBook.bookId === book.id )) {
                changeReserved(true)

            }
            else {
                changeReserved(false)
            }
        }
    }, [book, user])
    
    const borrow = async () => {
        await dispatch (addLoan({
            userId: user.id,
            bookId: book.id
        }))
        await dispatch(getUserData()) 
        await dispatch(setNotification( {data: `${book.title} borrowed`, type: 'info'}, 3000))
    }

    const reserve = async () => {
        await dispatch (addReservation({
            user: user,
            book: book
        }))
        await dispatch(getUserData()) 
        await dispatch(setNotification( {data: `${book.title} reserved`, type: 'info'}, 3000))
    }

    if (book && user) {
        if (available) {
            return (
                <div>
                    <Notification/>
                    <BasicBookData book={book}/>
                    {!borrowed ? <Button onClick= {borrow}>Borrow</Button> : <p>You have borrowed the book.</p>}
                    <div style= {pstyle}>
                    <p>Your rating:</p>
                    <StarRating id = {book.id}/>
                    <p>Average: {book.rating.toFixed(2)}</p>
                    </div>
                    <br/>
                    {user && user.admin 
                    ? <Link style= {linkStyle2} to={`/bookdata/${book.id}`}>Change book details or delete it from the database.</Link>
                    : <></> }
                </div>
            )
            }

        if (reserved) {
            return (
                <div>
                    <Notification/>
                    <BasicBookData book={book}/>
                    <div style= {pstyle}>
                    <p>Reservations: {numberOfReservations}</p>
                    <p>You have reserved the book.</p>
                    </div>
                    <div style= {pstyle}>
                    <p>Your rating:</p>
                    <StarRating id = {book.id}/>
                    <p>Average: {book.rating.toFixed(2)}</p>
                    </div>
                    <br/>
                    {user && user.admin 
                    ? <Link style= {linkStyle2} to={`/bookdata/${book.id}`}>Change book details or delete it from the database.</Link>
                    : <></> }
                </div>
            )
        }

        return (
            <div>
                <Notification/>
                <BasicBookData book={book}/>
                <div style= {pstyle}>
                <p>Not available (all books are borrowed).</p>
                <p>Reservations: {numberOfReservations}</p>
                </div>
                <div>
                    <Button onClick= {reserve}>Reserve</Button>
                </div>
                <div style= {pstyle}>
                <p>Your rating:</p>
                <StarRating id = {book.id}/>
                <p>Average: {book.rating.toFixed(2)}</p>
                </div>
                <br></br>
                {user && user.admin
                ? <Link style= {linkStyle2} to={`/bookdata/${book.id}`}>Change book details or delete it from the database.</Link>
                : <></> }
            </div>
        )
    }
    if (book) {
        return (
            <div>
                <Notification/>
                <BasicBookData book={book}/>
                <div style={pstyle}>
                {available ? <p>The book is available.</p> : <p>The book is not available (all items are borrowed).</p>}
                </div>
                <div style={pstyle}>
                <p>Rating</p>
                <StarBar book={book}/>
                </div>
                {available ? <p>Please log in to borrow or rate the book.</p> : <p>Please log in to reserve or rate the book.</p>}
                <br/>
            </div>
                )
    }
}

export default Book