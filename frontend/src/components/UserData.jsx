import { useSelector} from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { getUserData } from '../reducers/userReducer'
import { updateUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer';
import Notification from './Notification';

const UserData = () => {

    const validPassword = (password) => {
        if (password.length < 8) {
          return false
        }
    
        return ([/\d/.test(password)])
      }
    
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(getUserData()) 
      }, [dispatch]) 

    const [nameOfTheUser, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPassword2, setNewPassword2] = useState('')

    const handleChanges = async (event) => {
        event.preventDefault()
        try {
            if (newPassword === newPassword2) {
                if (validPassword(newPassword) && validPassword(newPassword2)) {
                    await dispatch(updateUser({...user, name: nameOfTheUser, email: email, oldPassword: password, newPassword: newPassword}))
                    await dispatch(setNotification( {data: `Changes saved succesfully`, type: 'info'}, 3000))
                }
                else {
                    await dispatch(setNotification( {data: `Invalid password`, type: 'error'}, 3000))
                    return
                }
            }
            else {
                await dispatch(setNotification( {data: `Passwords don't match`, type: 'error'}, 3000))
                return
            }
        }
      
        catch(exception){
            console.log(exception)
            await dispatch(setNotification({data: `${exception.response.data.message}`, type: 'error'}, 3000))
    
        }
    }



    return (
        <div>
            <Notification/>
            <form onSubmit={handleChanges}>
            <div>
                name
                <input
                    type="text"
                    value={nameOfTheUser}
                    name="nameOfTheUser"
                    onChange={({ target }) => setName(target.value)}
                />
            </div>
            <div>
                email
                <input
                    type="text"
                    value={email}
                    name="email"
                    onChange={({ target }) => setEmail(target.value)}
                />
            </div>
            <div>
                current password
                <input
                    type="text"
                    value={password}
                    name="newPassword"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <div>
                new password
                <input
                    type="text"
                    value={newPassword}
                    name="newPassword"
                    onChange={({ target }) => setNewPassword(target.value)}
                />
            </div>
            <div>
                type password again
                <input
                    type="text"
                    value={newPassword2}
                    name="newPassword2"
                    onChange={({ target }) => setNewPassword2(target.value)}
                />
            </div>
            <button type="submit">Save changes</button>
        </form>
      </div>
    )

   

}

export default UserData