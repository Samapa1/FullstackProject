import { useParams } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { addLoan } from "../reducers/loanReducer.js";
import { useState, useEffect} from 'react'
import { useSelector} from 'react-redux'
import statusService from "../services/status"

const Book = (  ) => {  
    const id = useParams().id

    const [available, changeAvailability] = useState(true)
    const allBooks = useSelector(state => state.books)
    const book = allBooks.find(book => book.id === Number(id))

    useEffect(() => {
        isAvailable()
      }, [])

    const dispatch = useDispatch();
    
    const isAvailable = async () => {
        console.log("checking availability")
        let bookStatus = await statusService.getStatus(book.id)
        console.log(bookStatus)
        if (bookStatus === "available") {
            changeAvailability(true)
        }
        else {
            changeAvailability(false)
        }
        

    }
    const borrow = async () => {
        console.log(book.id)
        await dispatch (addLoan({
            userId: 1,
            bookId: book.id
        }))
        isAvailable()
        console.log("borrowing")


    }

    
    if (available) {
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