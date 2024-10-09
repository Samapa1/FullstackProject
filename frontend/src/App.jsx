import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { initializeBooks } from './reducers/bookReducer'
import { getUserData } from './reducers/userReducer'
import { initializeLoans } from './reducers/loanReducer'
import Booklist from './components/BookList'
import Book from './components/Book'
import User from './components/User'
import Login from './components/Login'
import Logout from './components/Logout'
import Registration from './components/Registration'
import Notification  from './components/Notification'

const Home = () => {
  return ( 
    <div>
      <Notification/>
      <h1>Book app</h1>
    </div>
)}

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBooks()) 
  }, [dispatch]) 

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeLoans());
  }, [dispatch]);

  const padding = {
    padding: 5
  }

  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification);
  console.log(notification)


  return (
    <Router>
    <div>
      <Link style={padding} to="/">home</Link>
      <Link style={padding} to="/books">books</Link>
      { user 
      ? <><Link style={padding} to="/logout">log out</Link>
        <Link style={padding} to="/user">my page</Link></>
      : <Link style={padding} to="/login">log in</Link>
      }   
      {/* <Link style={padding} to="/user">my page</Link> */}
    </div>
    <Routes>
      <Route path="/books" element={<Booklist />} />
      <Route path="/books/:id" element={<Book />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration/>} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/user" element={<User />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>
    
  )
}

export default App


