import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { updateBook} from '../reducers/bookReducer'
import { removeBook } from "../reducers/bookReducer"
import { Button, Input } from './Styles'
import { setNotification } from '../reducers/notificationReducer';
import Notification from './Notification';

const BookData = () => {
    const id = useParams().id
    const allBooks = useSelector(state => state.books)
    const book = allBooks.find(book => book.id === Number(id))
    const [title, setTitle] = useState(book.title)
    const [author, setAuthor] = useState(book.author)
    const [items, setItems] = useState(book.numberOfBooks)
    const [year, setYear] = useState(book.year)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChanges =  async (event) => {
        event.preventDefault()
        console.log("changing book details")
        
        try {
            await dispatch(updateBook({...book, title: title, author: author, year: year, numberOfBooks: items}))
            await dispatch(setNotification({data: `Changes saved succesfully`, type: 'info'}, 3000))
        }
        catch (exception) {
            await dispatch(setNotification({data: `${exception.response.data.error}`, type: 'error'}, 3000))
        }
        
    }

    const handleDelete = async () => {
        console.log("deleting")
        console.log(book.id)
        if (window.confirm(`Remove ${book.title} by ${book.author} permanently?`)) {
            try {
                navigate("/books")
                await dispatch(removeBook(book.id))
                await dispatch(setNotification({data: `Book deleted`, type: 'info'}, 3000))
            }
            catch {
                await dispatch(setNotification({data: `${exception.response.data.error}`, type: 'error'}, 3000))
            }
        }
    }


    return (
        <div>
        <Notification/>
        <h2>Change book details</h2>
        <form onSubmit={handleChanges}>
            <div>
                title
                <Input
                    type="text"
                    value={title}
                    name="title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author
                <Input
                    type="text"
                    value={author}
                    name="author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                year
                <Input
                    type="number"
                    value={year}
                    name="year"
                    onChange={({ target }) => setYear(target.value)}
                />
            </div>
            <div>
                number of books
                <Input
                    type="number"
                    value={items}
                    name="items"
                    onChange={({ target }) => setItems(target.value)}
                />
            </div>
            <Button type="submit">Save changes</Button>
        </form>
        <br></br>
        <p>Remove book from the database?</p>
        <Button onClick={handleDelete}>Delete book</Button>
        </div>

    )
}


export default BookData