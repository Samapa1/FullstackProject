import { useDispatch } from 'react-redux'
import { removeLoan } from '../reducers/loanReducer'
import { renewLoan } from '../reducers/loanReducer'
import { getUserData } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer.js'

const Loan = ( {book }) => {
    const dispatch = useDispatch()

    const returnBook = async (id) => {
        if (window.confirm(`Return book ${book.title} by ${book.author}?`)) {
        await dispatch(removeLoan(id))
        await dispatch(getUserData()) 
        await dispatch(setNotification( {data: `${book.title} returned`, type: 'info'}, 3000))
        }
    }

    const renewCurrentLoan = async (updatedObject) => {
        console.log("renewing")
        console.log(updatedObject.id)
        await dispatch(renewLoan(updatedObject))
        await dispatch(getUserData()) 
        await dispatch(setNotification( {data: `${book.title} loan renewed`, type: 'info'}, 3000))
    }
   
    return (
    <div>
        <p>
            {book.title} by {book.author} due date: {book.loan.dueDate} 
            <button onClick= {() => returnBook(book.loan.id)}> Return </button>
            <button onClick= {() => renewCurrentLoan(book.loan)}> Renew </button>
        </p> 
    </div>
    )
}

export default Loan