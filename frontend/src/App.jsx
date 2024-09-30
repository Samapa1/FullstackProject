import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useSelector} from 'react-redux'
import { initializeBooks } from './reducers/bookReducer'
import Booklist from './components/BookList'
import Book from './components/Book'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBooks()) 
  }, [dispatch]) 

  const firstBook = useSelector(state => state.books.find(book => book.title === "The Stranger" ))

  const showFirst = () => {
    if (firstBook) {
      return  <Book book={firstBook}/>
    }
  }

  return (
    <div>
     <h1>Book app</h1>
     <Booklist/>
    {showFirst()}
     </div>
  )
}

export default App


