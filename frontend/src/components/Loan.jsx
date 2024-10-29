import { useDispatch } from 'react-redux'
import { removeLoan } from '../reducers/loanReducer'
import { renewLoan } from '../reducers/loanReducer'
import { getUserData } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer.js'
import { Button } from './Styles'

const Loan = ( {book }) => {
    const dispatch = useDispatch()

    const returnBook = async (id) => {
        if (window.confirm(`Return book ${book.title} by ${book.author}?`)) {
        await dispatch(removeLoan(id))
        await dispatch(getUserData()) 
        await dispatch(setNotification( {data: `${book.title} returned`, type: 'info'}, 3000))
        }
    }

    const renewCurrentLoan = async (id) => {
        try {
            await dispatch(renewLoan(id))
            await dispatch(getUserData()) 
            await dispatch(setNotification( {data: `${book.title} loan renewed`, type: 'info'}, 3000))
        }
        catch(exception) {
            console.log(exception)
            await dispatch(setNotification( {data: `${book.title} is reserved!`, type: 'error'}, 3000))
        }

    }
   
    return (
    <div>
      
        <p>{book.title} by {book.author} due date: {book.loan.dueDate}
        <Button onClick= {() => returnBook(book.loan.id)}>Return</Button>
        <Button onClick= {() => renewCurrentLoan(book.loan.id)}>Renew</Button>
        </p> 
      
    </div>
    )
}

export default Loan