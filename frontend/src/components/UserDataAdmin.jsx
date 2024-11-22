import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { updateUser } from '../reducers/usersReducer'
import { removeUser } from '../reducers/usersReducer'
import { setNotification } from '../reducers/notificationReducer';
import Notification from './Notification';
import { Button, Input } from './Styles'


const UserDataAdmin = ({user, handleChange}) => {
    const [nameOfTheUser, setName] = useState(user.name)
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [adminStatus, setAdminStatus] = useState(user.admin)
   
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChanges = async (event) => {
        event.preventDefault()

        try {
            await dispatch(updateUser({...user, username: username, name: nameOfTheUser, email: email}))
            await dispatch(setNotification( {data: `Changes saved succesfully`, type: 'info'}, 3000))
        }
        catch(exception){
            console.log(exception)
            await dispatch(setNotification({data: `Request failed`, type: 'error'}, 3000))
    
        }
    }

    const addAdminStatus = async () => {
        if (window.confirm(`Make the user an admin?`)) {
            await dispatch(updateUser({...user, admin: true}))
            setAdminStatus(true)
            await dispatch(setNotification( {data: `Changes saved succesfully`, type: 'info'}, 3000))
        }
    }

    const removeAdminStatus = async () => {
        if (window.confirm(`Remove admin status from this user?`)) {
            await dispatch(updateUser({...user, admin: false}))
            setAdminStatus(false)
            await dispatch(setNotification( {data: `Changes saved succesfully`, type: 'info'}, 3000))
        }
    }

        const handleRemoveUser = async (user) => {
            if (window.confirm(`Remove ${user.name} permanently?`)) {
                navigate("/users")
                await dispatch(removeUser(user))
                handleChange(null)
                await dispatch(setNotification( {data: `${user.name} removed`, type: 'info'}, 3000))
                }
        }

    return (
        <div>
            <Notification/>
            <br></br>
            <form onSubmit={handleChanges}>
            <div>
                username
                <Input
                    type="text"
                    value={username}
                    name="username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                name
                <Input
                    type="text"
                    value={nameOfTheUser}
                    name="nameOfTheUser"
                    onChange={({ target }) => setName(target.value)}
                />
            </div>
            <div>
                email
                <Input
                    type="text"
                    value={email}
                    name="email"
                    onChange={({ target }) => setEmail(target.value)}
                />
            </div>
            <Button type="submit">Save changes</Button>
        </form>
        <p>books borrowed: {user.loans.length}</p>
        <p>is admin: {adminStatus ? 'yes' : 'no'}</p>
        {user.loans.length === 0 
            ? <Button onClick= {() => handleRemoveUser(user)}>Delete account</Button>
            : <p>User has loans. If you wish to delete account, please return books first. </p>
        }
        {adminStatus 
            ? <Button onClick={() => removeAdminStatus()}>Remove admin status</Button>
            : <Button onClick={() => addAdminStatus()}>Make this user an admin</Button>
        }

      </div>
    )

   

}

export default UserDataAdmin