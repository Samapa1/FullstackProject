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
        for (let i = 0; i <password.length; i++) {
          if (["0","1","2","3","4","5","6","7","8","9"].includes(password[i])) {
            return true
          }
        }
        return false
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
        console.log("handling changes")
        if (newPassword === newPassword2) {
            if (validPassword(newPassword) && validPassword(newPassword2)) {
                console.log("valid")
                console.log(user)
                await dispatch(updateUser({...user, name: nameOfTheUser, email: email, password: newPassword}))
                await dispatch(setNotification( {data: `Changes saved succesfully`, type: 'info'}, 3000))
            }
        }
        else {
            console.log("something went wrong")
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