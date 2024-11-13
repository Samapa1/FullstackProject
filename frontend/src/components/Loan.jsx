import { useDispatch } from 'react-redux'
import { removeLoan } from '../reducers/loanReducer'
import { renewLoan } from '../reducers/loanReducer'
import { getUserData } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer.js'
import { Button } from './Styles'

const Loan = ( {loan} ) => {
    const dispatch = useDispatch()
    console.log(loan)
    const returnBook = async (id) => {
        if (window.confirm(`Return book ${loan.book.title} by ${loan.book.author}?`)) {
        await dispatch(removeLoan(id))
        await dispatch(getUserData()) 
        await dispatch(setNotification( {data: `${loan.book.title} returned`, type: 'info'}, 3000))
        }
    }

    const renewCurrentLoan = async (id) => {
        try {
            await dispatch(renewLoan(id))
            await dispatch(getUserData()) 
            await dispatch(setNotification( {data: `${loan.book.title} loan renewed`, type: 'info'}, 3000))
        }
        catch(exception) {
            console.log(exception)
            await dispatch(setNotification( {data: `${loan.book.title} is reserved!`, type: 'error'}, 3000))
        }

    }

    const formatDate = (duedate) => {
        let formatteddate = new Date(duedate)
        return formatteddate.toLocaleDateString()
    }

   
    return (
    <div>
        <p>{loan.book.title} by {loan.book.author} due date: {formatDate(loan.dueDate)}
        <Button onClick= {() => returnBook(loan.id)}>Return</Button>
        <Button onClick= {() => renewCurrentLoan(loan.id)}>Renew</Button>
        </p> 
      
    </div>
    )
}

export default Loan