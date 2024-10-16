import { useParams } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { addLoan } from "../reducers/loanReducer.js"
import { addReservation } from "../reducers/reservationReducer.js"
import { getUserData } from "../reducers/userReducer"
import { useState, useEffect, useCallback} from 'react'
import { useSelector} from 'react-redux'
import { setNotification } from '../reducers/notificationReducer.js'
import statusService from "../services/status"
import Notification from './Notification.jsx'

const Book = (  ) => {  
    const id = useParams().id

    const [available, changeAvailability] = useState(null)
    const [borrowed, changeBorrowed] = useState(null)
    const [reserved, changeReserved] = useState(null)
    const allBooks = useSelector(state => state.books)
    const book = allBooks.find(book => book.id === Number(id))
    const user = useSelector(state => state.user)
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserData()) 
      }, [borrowed, reserved, dispatch]) 
  
    const isAvailable = useCallback(async () => {
        let bookStatus = await statusService.getStatus(book.id)
        console.log("Bookstatus")
        console.log(bookStatus)
        if (bookStatus === "available") {
            changeAvailability(true)
        }
        else {
            changeAvailability(false)
        }
    }, [book])
        
    useEffect(() => {
        if (user.books) {
        if (user.books.find(userbook => userbook.title === book.title )) {
            changeBorrowed(true)

        }
        else {
            changeBorrowed(false)
        }
    }
    }, [book, user])


    useEffect(() => {
        if (user.reservedBooks) {
            if (user.reservedBooks.find(reservedBook => reservedBook.id === book.id )) {
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
                <button onClick= {borrow}>Borrow</button>
            </div>
        </div>
    )
    }

    if (borrowed) {
    return (
        <div>
             <Notification/>
            <h2>{book.title}</h2>
            <p>author: {book.author}</p>
            <p>year: {book.year}</p>
            <p>You have borrowed the book.</p>
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
                <p>You have reserved the book.</p>
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
            <div>
                <button onClick= {reserve}>Reserve</button>
            </div>
        </div>
    )
}

export default Book