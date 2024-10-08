import { useDispatch } from 'react-redux'
import { removeLoan } from '../reducers/loanReducer'
import { getUserData } from '../reducers/userReducer'

const Loan = ( {book }) => {
    const dispatch = useDispatch()

    const returnBook = async (id) => {
        await dispatch(removeLoan(id))
        await dispatch(getUserData()) 
       }
   
    return (
    <div>
        <p>{book.title} by {book.author} due date: {book.loan.dueDate} <button onClick= {() => returnBook(book.loan.id)}> Return </button></p> 
    </div>
    )
}

export default Loan