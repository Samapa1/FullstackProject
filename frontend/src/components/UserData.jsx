import { useSelector} from 'react-redux'
import { useState } from 'react'
import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../reducers/userReducer'
import { updateUser } from '../reducers/userReducer'
import { removeUser } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';
import { Button, Input } from './Styles'
import PasswordField from './PasswordField';

const UserData = () => {

    const [nameOfTheUser, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPassword2, setNewPassword2] = useState('')
   
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(getUserData()) 
      }, [dispatch]) 

    const setUserData = useCallback(async () => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
        }
    }, [user])

    useEffect(() => {
        setUserData()
      }, [setUserData])

    const handleRemoval = async () => {
        try {
            if (window.confirm(`Delete account permanently?`)) {
                await dispatch(removeUser({id: user.id, password: password}))
                navigate("/"); 
                await dispatch(setNotification( {data: `User removed permanently.`, type: 'info'}, 3000))

            }
        }
        catch(exception){
            console.log(exception)
            await dispatch(setNotification({data: `${exception.response.data.error}`, type: 'error'}, 3000))
        }
    }

    const handleChanges = async (event) => {
        event.preventDefault()

        try {
            if (!newPassword && !newPassword2){
                await dispatch(updateUser({...user, name: nameOfTheUser, email: email, oldPassword: password}))
                await dispatch(setNotification( {data: `Changes saved succesfully`, type: 'info'}, 3000))
            }

            await dispatch(updateUser({...user, name: nameOfTheUser, email: email, oldPassword: password, newPassword: newPassword, newPassword2: newPassword2}))
            await dispatch(setNotification( {data: `Changes saved succesfully`, type: 'info'}, 3000))
        }
      
        catch(exception){
            console.log(exception)
            await dispatch(setNotification({data: `${exception.response.data.error}`, type: 'error'}, 3000))
    
        }
    }

    return (
        <div>
            <br></br>
            <form onSubmit={handleChanges}>
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
            <PasswordField inputText={"password"} password={password} handleChange={({ target }) => setPassword(target.value)}/>
            <PasswordField inputText={"new password"} password={newPassword} handleChange={({ target }) => setNewPassword(target.value)}/>
            <PasswordField inputText={"confirm new password"} password={newPassword2} handleChange={({ target }) => setNewPassword2(target.value)}/>
            <Button type="submit">Save changes</Button>
        </form>
        <br></br>
        <Button onClick={() => handleRemoval()}>Delete account</Button>
      </div>
    )

   

}

export default UserData