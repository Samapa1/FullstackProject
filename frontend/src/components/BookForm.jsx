import { useState } from "react"
import { useDispatch } from 'react-redux'
import { addBook } from '../reducers/bookReducer'
import Notification from "./Notification"
import { setNotification } from  "../reducers/notificationReducer.js"

const BookForm = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [year, setYear] = useState('')
    const [items, setItems] = useState('')

    const dispatch = useDispatch()

    const handleForm = async () => {

        try {
            const bookObject = {
                title: title, 
                author: author,
                year: Number(year), 
                numberOfBooks: items
            }
            await dispatch(addBook(bookObject))
            await dispatch(setNotification({data: `${bookObject.title} by ${bookObject.author} added`, type: 'info'}, 3000))
        }
        catch(exception){
            console.log(exception)
            await dispatch(setNotification({data: `${exception.response.data.message}`, type: 'error'}, 3000))

        }
    }

    return (
        <div>
        <Notification/>
        <h1>Add a book to the database</h1>
        <form onSubmit={handleForm}>
        <div>
          title
          <input
            data-testid="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            data-testid="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          year
          <input
            data-testid="year"
            type="number"
            value={year}
            name="year"
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <div>
          number of books
          <input
            data-testid="items"
            type="number"
            value={items}
            name="items"
            onChange={({ target }) => setItems(target.value)}
          />
        </div>
        <button type="submit">add</button>

        </form>
        </div>
    )
}


export default BookForm