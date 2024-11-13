import { useParams } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import { addLoan } from "../reducers/loanReducer.js"
import { addReservation } from "../reducers/reservationReducer.js"
import { getUserData } from "../reducers/userReducer"
import { useState, useEffect, useCallback} from 'react'
import { useSelector} from 'react-redux'
import { setNotification } from '../reducers/notificationReducer.js'
import statusService from "../services/status"
import Notification from './Notification.jsx'
import { Button, linkStyle2 } from './Styles'
import StarRating from './StarRating' 

const Book = (  ) => {  
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
  
    const isAvailable = useCallback(async () => {
        if (book) {
            let bookStatus = await statusService.getStatus(book.id)
            console.log(bookStatus)
            changeNumberOfReservations(bookStatus.reservations)
            if (bookStatus.status === "available") {
                changeAvailability(true)
            }
            else {
                changeAvailability(false)
            }
        }
    }, [book, user])
    console.log(user)
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


    useEffect(() => {
        isAvailable()
      }, [isAvailable])

    
    const borrow = async () => {
        console.log("borrowing")
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

    if (available && !borrowed) {
    return (
        <div>
            <Notification/>
            <h2>{book.title}</h2>
            <p>author: {book.author}</p>
            <p>year: {book.year}</p>
            <div>
                <Button onClick= {borrow}>Borrow</Button>
            </div>
            <p>rating:</p>
            <StarRating id = {id}/>
            <br></br>
            {user && user.admin 
            ? <Link style= {linkStyle2} to={`/bookdata/${book.id}`}>Change book details or delete it from the database.</Link>
            : <></> }
        </div>
    )
    }

    if (book) {
        if (borrowed) {
        return (
            <div>
                <Notification/>
                <h2>{book.title}</h2>
                <p>author: {book.author}</p>
                <p>year: {book.year}</p>
                <p>You have borrowed the book.</p>
                <p>rating:</p>
                <StarRating id = {id}/>
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
                    <p>author: {book.author}</p>
                    <p>year: {book.year}</p>
                    <p>reservations: {numberOfReservations}</p>
                    <p>You have reserved the book.</p>
                    <p>rating:</p>
                    <StarRating id = {id}/>
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
                <p>author: {book.author}</p>
                <p>year: {book.year}</p>
                <p>not available (all items are borrowed)</p>
                <p>reservations: {numberOfReservations}</p>
                <div>
                    <Button onClick= {reserve}>Reserve</Button>
                </div>
                <p>rating:</p>
                <StarRating id = {id}/>
                <br></br>
                {user && user.admin
                ? <Link style= {linkStyle2} to={`/bookdata/${book.id}`}>Change book details or delete it from the database.</Link>
                : <></> }
            </div>
        )

    }
}

export default Book