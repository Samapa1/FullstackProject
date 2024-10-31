import { useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { linkStyle1, linkStyle2 } from './Styles'
import Notification from './Notification';

const Booklist = () => {
    const user = useSelector(state => state.user)
    const allBooks = useSelector(state => state.books)
    console.log(user)

    if (user && user.admin){
        return (
            <div>
            <Notification/>
            <><h1>Books</h1>
            {allBooks.map (book => 
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