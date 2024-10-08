import { useSelector} from 'react-redux'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { getUserData } from '../reducers/userReducer'
import Loan from './Loan';

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

    if (user) {
        return (
            <div key= {user.id}>
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