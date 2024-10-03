import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
// import { useSelector} from 'react-redux'
import { initializeBooks } from './reducers/bookReducer'
import Booklist from './components/BookList'
import Book from './components/Book'
import User from './components/User'
import Login from './components/Login'

const Home = () => {
  return ( 
    <div>
      <h1>Book app</h1>
    </div>
)}

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBooks()) 
  }, [dispatch]) 

  // const firstBook = useSelector(state => state.books.find(book => book.title === "The Stranger" ))

  // const showFirst = () => {
  //   if (firstBook) {
  //     return  <Book book={firstBook}/>
  //   }
  // }

  const padding = {
    padding: 5
  }


  return (
    <Router>
    <div>
      <Link style={padding} to="/">home</Link>
      <Link style={padding} to="/books">books</Link>
      <Link style={padding} to="/login">log in</Link>
      <Link style={padding} to="/user">my page</Link>
    </div>
    <Routes>
      <Route path="/books" element={<Booklist />} />
      <Route path="/books/:id" element={<Book />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user" element={<User />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>
    
  )
}

export default App


