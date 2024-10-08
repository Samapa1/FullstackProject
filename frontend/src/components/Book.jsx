import { useParams } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { addLoan } from "../reducers/loanReducer.js"
import { getUserData } from "../reducers/userReducer"
import { useState, useEffect, useCallback} from 'react'
import { useSelector} from 'react-redux'
import statusService from "../services/status"

const Book = (  ) => {  
    const id = useParams().id

    const [available, changeAvailability] = useState(true)
    const [borrowed, changeBorrowed] = useState(null)
    const allBooks = useSelector(state => state.books)
    const book = allBooks.find(book => book.id === Number(id))
    const user = useSelector(state => state.user)
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserData()) 
      }, [borrowed, dispatch]) 
  
    const isAvailable = useCallback(async () => {
        let bookStatus = await statusService.getStatus(book.id)
        if (bookStatus === "available") {
            changeAvailability(true)
        }
        else {
            changeAvailability(false)
        }
    }, [book])
        
    useEffect(() => {
        if (user.books.find(userbook => userbook.title === book.title )) {
            changeBorrowed(true)

        }
        else {
            changeBorrowed(false)
        }
       
    }, [book, user])


    useEffect(() => {
        isAvailable()
      }, [isAvailable])

    
    const borrow = async () => {
        await dispatch (addLoan({
            userId: user.id,
            bookId: book.id
        }))
        await dispatch(getUserData()) 
        isAvailable()

    }

    if (available && !borrowed) {
    return (
        <div>
            <h2>{book.title}</h2>
            <p>author: {book.author}</p>
            <p>year: {book.year}</p>
            <div>
                <button onClick= {borrow}>Borrow</button>
            </div>
        </div>
    )
    }

    if (borrowed)
    return (
        <div>
            <h2>{book.title}</h2>
            <p>author: {book.author}</p>
            <p>year: {book.year}</p>
            <p>You have borrowed the book.</p>
        </div>
    )

    return (
        <div>
            <h2>{book.title}</h2>
            <p>author: {book.author}</p>
            <p>year: {book.year}</p>
            <p>not available (all items are borrowed)</p>
        </div>
    )
}

export default Book