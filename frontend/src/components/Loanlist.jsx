import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeLoans } from'../reducers/loanReducer.js'
import { listStyle, Button } from './Styles.jsx'
import { removeLoan } from '../reducers/loanReducer'
import { getUserData} from '../reducers/userReducer.js'
import Notification from './Notification.jsx'
import { setNotification } from '../reducers/notificationReducer.js'
import { formatDate } from '../../utils/helper.js'

const Loanlist = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserData());
      }, [dispatch]);
      
    useEffect(() => {
        dispatch(initializeLoans()) 
      }, [dispatch]) 
    
    const loanList = useSelector(state => state.loans) 
    
    const returnLoan = async (loan) => {
        if (window.confirm(`Return ${loan.user.name}'s book ${loan.book.title} by ${loan.book.author}?`)) {
            await dispatch(removeLoan(loan.id))
            await dispatch(setNotification( {data: `${loan.book.title} returned`, type: 'info'}, 3000))
        }
    }

    const isLate = (duedate) => {
        let date = new Date()
        if (Date.parse(duedate) < date) {
            return <div style={{ color: 'red' }}>late!</div>
        }
        else {
            return <div>ok</div>
        }
        }
    
    if (loanList.length >0) {
    return (
        <div>
        <Notification/>
        <h1>Loans</h1>
        {loanList.map(loan => 
            <div key = {loan.id} style={listStyle}>
            <div>{loan.user.name} {loan.book.title} by {loan.book.author} due date: {formatDate(loan.dueDate)}</div>status: {isLate(loan.dueDate)}
            <Button onClick= {() => returnLoan(loan)}>Return</Button>
            </div>
        )}
        </div>
    )
    }
}

export default Loanlist