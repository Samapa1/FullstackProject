import { useState } from "react"
import { useDispatch } from 'react-redux'
import { addBook } from '../reducers/bookReducer'
import Notification from "./Notification"
import { setNotification } from  "../reducers/notificationReducer.js"
import { Button, Input } from './Styles'

const BookForm = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [year, setYear] = useState('')
    const [items, setItems] = useState('')
    const [language, setLanguage] = useState('')

    const dispatch = useDispatch()

    const handleForm = async (e) => {
      e.preventDefault()

        try {
            const bookObject = {
                title: title, 
                author: author,
                year: Number(year), 
                language: language,
                numberOfBooks: items
            }
            await dispatch(addBook(bookObject))
            await dispatch(setNotification({data: `${bookObject.title} by ${bookObject.author} added`, type: 'info'}, 3000))
        }
        catch(exception){
            console.log("something went wrong")
            console.log(exception)
            await dispatch(setNotification({data: `${exception.response.data.error}`, type: 'error'}, 3000))

        }
    }

    return (
        <div>
        <Notification/>
        <h1>Add a book to the database</h1>
        <form onSubmit={handleForm}>
        <div>
          title
          <Input
            data-testid="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <Input
            data-testid="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          year
          <Input
            data-testid="year"
            type="number"
            value={year}
            name="year"
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <div>
          language
          <Input
            data-testid="language"
            type="text"
            value={language}
            name="language"
            onChange={({ target }) => setLanguage(target.value)}
          />
        </div>
        <div>
          number of books
          <Input
            data-testid="items"
            type="number"
            value={items}
            name="items"
            onChange={({ target }) => setItems(target.value)}
          />
        </div>
        <Button type="submit">add</Button>

        </form>
        </div>
    )
}


export default BookForm