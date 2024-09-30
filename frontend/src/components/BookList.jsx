import { useSelector} from 'react-redux'

const Booklist = () => {
    
    const allBooks = useSelector(state => state.books)

    return (
        <div>
            {allBooks.map (book => 
            <div key={book.id}>
                {book.title} by {book.author}
            </div>
            )}
        </div>
    )
}

export default Booklist