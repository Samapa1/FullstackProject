import { useDispatch } from 'react-redux'
import { removeLoan } from '../reducers/loanReducer'

const Loan = ( {book }) => {
    const dispatch = useDispatch()

    const returnBook = (id) => {
        console.log("return")
        dispatch(removeLoan(id))
       }
   
    return (
    <div>
        <p>{book.title} by {book.author} due date: {book.loan.dueDate} <button onClick= {() => returnBook(book.loan.id)}> Return </button></p> 
    </div>
    )
}

export default Loan