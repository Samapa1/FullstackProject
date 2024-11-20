import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { initializeBooks } from './reducers/bookReducer'
import { getUserData } from './reducers/userReducer'
import Booklist from './components/BookList'
import Book from './components/Book'
import User from './components/User'
import Login from './components/Login'
import Logout from './components/Logout'
import Registration from './components/Registration'
import Notification  from './components/Notification'
import BookForm from './components/BookForm'
import UserData from './components/UserData'
import BookData from './components/BookData'
import Loanlist from './components/Loanlist'
import Userlist from './components/Userlist'
import Reservationlist from './components/Reservationlist'
import Ratinglist from './components/Ratinglist'
import { Page, NavBar, UpperBar, Footer } from './components/Styles'


const Home = ({user}) => {
  let reservationsForCollection = false

    if (user && user.reservations) {
      if (user.reservations.find(reservedBook => reservedBook.available === true)) {
        reservationsForCollection = true
      }
    }
  
  return ( 
    <div>
      <Notification/>
      <h1>Welcome to the book app</h1>
      <p>Here you can borrow books and return your loans.</p>
      {reservationsForCollection ? 
      <p>You have reservations that are ready for collection. Please remember to borrow them at your own page!</p>
      : ''}
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

  const padding = {
    padding: 5,
    color: "white"
  }

  const user = useSelector((state) => state.user);

  return (
    <Page>
    <Router>
    <div>
    < UpperBar>
      { user 
      ? <><Link style={padding} to="/logout">log out</Link></>
      : <Link style={padding} to="/login">log in</Link>
      } 
      </ UpperBar>
     
    </div>
    <div style={{display: "flex"}}>
      
      <div>
      <NavBar>
      <Link style={padding} to="/">home</Link>
      <br></br>
      { user 
      ? <> <Link style={padding} to="/user">my page</Link><br></br></>
      : <></>
      } 
      <Link style={padding} to="/books">books</Link>
      <br></br>
      { user && user.admin 
      ? <> <Link style={padding} to="/loans">loans</Link>
           <br></br>
           <Link style={padding} to="/reservations">reservations</Link>
           <br></br>
           <Link style={padding} to="/ratings">ratings</Link>
           <br></br>
           <Link style={padding} to="/users">users</Link>
       
        </>
      : <></>
      } 
      </NavBar></div>
      <div>
    <Routes>
      <Route path="/books" element={<Booklist />} />
      <Route path="/books/:id" element={<Book />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration/>} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/user" element={<User />} />
      <Route path="/userdata" element={<UserData />} />
      <Route path="/" element={<Home user= {user} />} />
      <Route path="/addBook" element={<BookForm/>} />
      <Route path="/bookdata/:id" element={<BookData/>} />
      <Route path="/loans" element={<Loanlist />} />
      <Route path="/reservations" element={<Reservationlist />} />
      <Route path="/users" element={<Userlist />} />
      <Route path="/ratings" element={<Ratinglist />} />
    </Routes></div>
    </div>
  </Router>
  <Footer>
    <em>Book app 2024</em>
  </Footer>
  </Page>

  )
}

export default App


