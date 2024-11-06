import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeUsers } from'../reducers/usersReducer.js'
import { getUserData} from '../reducers/userReducer.js'
import Notification from './Notification.jsx'
import { listStyle, Button } from './Styles.jsx'
import { removeUser } from '../reducers/usersReducer'
import { setNotification } from '../reducers/notificationReducer.js'

const Userlist = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserData());
      }, [dispatch]);

    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

    console.log("rendering Userlist")
    // const user = useSelector (state => state.user)
    const userlist= useSelector(state => state.users)

    const handleRemoveUser = async (user) => {
        console.log(user)
        console.log("removing")
        if (window.confirm(`Remove ${user.name} permanently?`)) {
            await dispatch(removeUser(user.id))
            await dispatch(setNotification( {data: `${user.name} removed`, type: 'info'}, 3000))
            }
    }

    if (userlist) {
    return (
        <div>
            <Notification/>
            <h1>Users</h1>
            {userlist.map(user => <div key= {user.id} style={listStyle}> 
                <div>{user.name} {user.email} books borrowed: {user.books.length}</div>
                {user.books.length === 0 
                ? <Button onClick= {() => handleRemoveUser(user)}>Remove</Button>
                : <></>
                }
            </div>)}
            <p>Please note that all books need to be returned before removing an user.</p>
        </div>
    )
}
}

export default Userlist