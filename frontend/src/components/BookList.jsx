import { useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import BookForm from './BookForm'

const Booklist = () => {
    const user = useSelector(state => state.user)
    const allBooks = useSelector(state => state.books)
    console.log(user)
    if (user && user.admin){
        return (
            <div>
            <><h1>Books</h1>
            {allBooks.map (book => 
            <div key={book.id}>
                <Link to={`/books/${book.id}`}>{book.title} by {book.author}</Link>
            </div>
            )}
            </>
            <br></br>
            <Link to={`/addBook`}>Add a book</Link>
            </div>
        )
    }
    
    return (
        <div>
        {user 
        ? <><h1>Books</h1>
            {allBooks.map (book => 
            <div key={book.id}>
                <Link to={`/books/${book.id}`}>{book.title} by {book.author}</Link>
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


export default Booklist