import { useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

const Booklist = () => {

    const user = useSelector(state => state.user)
    const allBooks = useSelector(state => state.books)

    
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