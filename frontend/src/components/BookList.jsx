import { useSelector} from 'react-redux'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { linkStyle1, linkStyle2 } from './Styles'
import Notification from './Notification';
import { Input } from './Styles'


const Booklist = () => {
    const user = useSelector(state => state.user)
    const allBooks = useSelector(state => state.books)
    const [filter, setFilter] = useState('')
    const [booksToShow, setBooks] = useState(allBooks)

    useEffect(() => {
        setBooks(allBooks)
    }, [allBooks])

    const filterBooks = () => {
        return (
            <div>
                <label>
                    filter books:
                    <Input
                        value={filter}
                        onChange={({ target }) => setFilter(target.value)}
                    />
                </label>
            </div>
        )
    }

    if (user && user.admin){
        return (
            <div>
            <Notification/>
            <><h1>Books</h1>
            {filterBooks()}
            {booksToShow.map (book => 
            <div key={book.id}>
                <Link style={linkStyle1} to={`/books/${book.id}`}>{book.title} by {book.author}</Link>
            </div>
            )}
            </>
            <br></br>
            <Link style={linkStyle2} to={`/addBook`}>Add a book</Link>
            </div>
        )
    }
    
    else {
    return (
        <div>
        <Notification/>
        {user 
        ? <><h1>Books</h1>
            {filterBooks()}
            {allBooks.map (book => 
            <div key={book.id}>
                <Link style={linkStyle1} to={`/books/${book.id}`}>{book.title} by {book.author}</Link>
            </div>
            )}
            </>
        : <><h1>Books</h1>
        {allBooks.map (book => 
        <div key= {book.id}>
        <p>{book.title} by {book.author}</p>
        </div>
        )}
        <p>Please log in to view book details.</p>
        </>
        }
        </div>
    )
}
}


export default Booklist