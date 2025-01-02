import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeLoans } from'../reducers/loanReducer.js'
import { Button, Table } from './Styles.jsx'
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
        const date = new Date()
        if (Date.parse(duedate) < date) {
            return <div>late</div>
        }
        else {
            return <div>ok</div>
        }
        }
    
    if (loanList.length >0) {
        return(
            <div>
            <Notification/>
            <h1>Loans</h1>
            <Table>
                <tbody>
                <tr>
                    <th>User</th>
                    <th>Book</th>
                    <th>Due date</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            {loanList.map(loan=> 
                <tr key= {loan.id}>
                    <td>{loan.user?.name}</td> 
                    <td>{loan.book?.title}</td>
                    <td>{formatDate(loan.dueDate)}</td>
                    <td>{isLate(loan.dueDate)}</td>
                    <td><Button onClick= {() => returnLoan(loan)}>Return</Button></td>
                </tr>
            )}
            </tbody>
            </Table>
            </div>
        )
    }
    return (
        <h1>Loans</h1>
    )
}

export default Loanlist