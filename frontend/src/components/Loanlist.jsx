import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeLoans } from'../reducers/loanReducer.js'
import { listStyle, Button } from './Styles.jsx'
import { removeLoan } from '../reducers/loanReducer'
import { setNotification } from '../reducers/notificationReducer.js'

const Loanlist = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeLoans()) 
      }, [dispatch]) 
    
    const loanList = useSelector(state => state.loans) 
    console.log(loanList)
    
    const returnLoan = async (loan) => {
        console.log("returning")
        if (window.confirm(`Return ${loan.user.name}'s book ${loan.book.title} by ${loan.book.author}?`)) {
            await dispatch(removeLoan(loan.id))
            await dispatch(setNotification( {data: `${book.title} returned`, type: 'info'}, 3000))
            }
    }

    const isLate = (duedate) => {
        let date = new Date()
        console.log(duedate)
        if (Date.parse(duedate) < date) {
            return <div style={{ color: 'red' }}>late!</div>
        }
        else {
            return <div>ok</div>
        }
        }
    
    const formatDate = (duedate) => {
        let formatteddate = new Date(duedate)
        return formatteddate.toLocaleDateString()
    }

    

    if (loanList) {
    return (
        <div>
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