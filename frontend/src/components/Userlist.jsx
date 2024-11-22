import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { initializeUsers } from'../reducers/usersReducer.js'
import { getUserData} from '../reducers/userReducer.js'
import { listStyle, Button } from './Styles.jsx'
import UserDataAdmin from './UserDataAdmin.jsx'

const Userlist = () => {
    const [selectedUser, setSelectedUser] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserData());
      }, [dispatch]);

    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

    const userlist= useSelector(state => state.users)

    const handleUserSelection = (user) => {
        setSelectedUser(user)
    }

    if (userlist) {
        return (
            <div>
                <h1>Users</h1>
                { selectedUser 
                ? <UserDataAdmin user= {selectedUser} handleUserSelection= {handleUserSelection}/>
                : userlist.map(user => <div key= {user.id} style={listStyle}> 
                    <div>
                        {user.name} 
                    </div>
                    <Button onClick= {() => handleUserSelection(user)}>Change details</Button>
                    <></>
                </div>)
            }
            </div>
        )}
}

export default Userlist