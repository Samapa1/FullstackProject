import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { initializeUsers } from'../reducers/usersReducer.js'
import { getUserData} from '../reducers/userReducer.js'
import { listStyle, Button, Table2 } from './Styles.jsx'
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
                <Table2>
                    <tbody>
                    { selectedUser 
                    ? <UserDataAdmin user= {selectedUser} handleUserSelection= {handleUserSelection}/>
                    : userlist.map(user => 
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td><Button onClick= {() => handleUserSelection(user)}>Change details</Button></td>
                        </tr>
                    )
                    }
            </tbody>
            </Table2>
            </div>
        )}
}

export default Userlist