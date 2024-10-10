import { useSelector} from 'react-redux'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { getUserData } from '../reducers/userReducer'
import Loan from './Loan';
import Notification from './Notification';

const User = () => {
    const dispatch = useDispatch()

    const user = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(getUserData()) 
      }, [dispatch]) 


   const showBooks = () => {
    if (user.books) {
        const booksToShow = user.books.map (book => <Loan key ={book.id} book = {book}/>)
        return booksToShow
    }
   }
   console.log(user)
    if (user) {
        return (
            <div key= {user.id}>
                 <Notification/>
                User information: 
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Borrowed books:</p>
                {showBooks()}
                
            </div>
        )
    }
}

export default User