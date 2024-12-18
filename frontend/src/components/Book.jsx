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
import { Button, linkStyle2 } from './Styles'
import StarRating from './StarRating' 
import StarBar from './StarBar'

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
        isAvailable()

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
        if (available && !borrowed) {
            return (
                <div>
                    <Notification/>
                    <h2>{book.title}</h2>
                    <p>Author: {book.author}</p>
                    <p>Year: {book.year}</p>
                    <p>Language: {book.language}</p>
                    <p>Class: {book.class}</p>
                    <p>{book.genre ? `Genre: ${book.genre}` : `Subjects: ${book.subjects}`}</p>
                    <div>
                        <Button onClick= {borrow}>Borrow</Button>
                    </div>
                    <p>Your rating:</p>
                    <StarRating id = {book.id}/>
                    <p>Average: {book.rating.toFixed(2)}</p>
                    <br></br>
                    {user && user.admin 
                    ? <Link style= {linkStyle2} to={`/bookdata/${book.id}`}>Change book details or delete it from the database.</Link>
                    : <></> }
                </div>
            )
            }
            
        if (borrowed) {
        return (
            <div>
                <Notification/>
                <h2>{book.title}</h2>
                <p>Author: {book.author}</p>
                <p>Year: {book.year}</p>
                <p>Language: {book.language}</p>
                <p>Class: {book.class}</p>
                <p>{book.genre ? `Genre: ${book.genre}` : `Subjects: ${book.subjects}`}</p>
                <p>You have borrowed the book.</p>
                <p>Your rating:</p>
                <StarRating id = {book.id}/>
                <p>Average: {book.rating.toFixed(2)}</p>
                <br></br>
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
                    <h2>{book.title}</h2>
                    <p>Author: {book.author}</p>
                    <p>Year: {book.year}</p>
                    <p>Language: {book.language}</p>
                    <p>Class: {book.class}</p>
                    <p>{book.genre ? `Genre: ${book.genre}` : `Subjects: ${book.subjects}`}</p>
                    <p>Reservations: {numberOfReservations}</p>
                    <p>You have reserved the book.</p>
                    <p>Your rating:</p>
                    <StarRating id = {book.id}/>
                    <p>Average: {book.rating.toFixed(2)}</p>
                    <br></br>
                    {user && user.admin 
                    ? <Link style= {linkStyle2} to={`/bookdata/${book.id}`}>Change book details or delete it from the database.</Link>
                    : <></> }
                </div>
            )
        }

        return (
            <div>
                <Notification/>
                <h2>{book.title}</h2>
                <p>Author: {book.author}</p>
                <p>Year: {book.year}</p>
                <p>Language: {book.language}</p>
                <p>Class: {book.class}</p>
                <p>{book.genre ? `Genre: ${book.genre}` : `Subjects: ${book.subjects}`}</p>
                <p>Not available (all books are borrowed).</p>
                <p>Reservations: {numberOfReservations}</p>
                <div>
                    <Button onClick= {reserve}>Reserve</Button>
                </div>
                <p>Your rating:</p>
                <StarRating id = {book.id}/>
                <p>Average: {book.rating.toFixed(2)}</p>
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
                <h2>{book.title}</h2>
                <p>Author: {book.author}</p>
                <p>Year: {book.year}</p>
                <p>Language: {book.language}</p>
                <p>Class: {book.class}</p>
                <p>{book.genre ? `Genre: ${book.genre}` : `Subjects: ${book.subjects}`}</p>
                {available ? <p>Available</p> : <p>Not available (all books are borrowed).</p>}
                Rating
                <StarBar book={book}/>
                {available ? <p>Please log in to borrow or rate the book.</p> : <p>Please log in to reserve or rate the book.</p>}
            </div>
                )
    }
}

export default Book