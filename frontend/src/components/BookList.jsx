import { useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

const Booklist = () => {
    
    const allBooks = useSelector(state => state.books)

    return (
        <div>
            <h1>Books</h1>
            {allBooks.map (book => 
            <div key={book.id}>
                <Link to={`/books/${book.id}`}>{book.title} by {book.author}</Link>
            </div>
            )}
        </div>
    )
}

export default Booklist