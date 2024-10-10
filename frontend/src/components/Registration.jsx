import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addUser } from "../reducers/userReducer"
import Notification from "./Notification"
import { setNotification } from  "../reducers/notificationReducer.js"


const Registration= () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  
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

  const handleRegistration = async (event) => {
    event.preventDefault()

    if (!validPassword(password)) {
      await dispatch(setNotification({data: `Password must have at least 8 characters (including at least one number)`, type: 'error'}, 4000))
      return
    } 

    if (password !== password2) {
      await dispatch(setNotification({data: `Passwords don't match`, type: 'error'}, 3000))
      setPassword('')
      setPassword2('')
      return

  }
  
    try {
        
        const userObject = {
            username: username,
            name: name,
            email: email,
            password: password

        }
        await dispatch(addUser(userObject))
        await dispatch(setNotification({data: `Registration ok`, type: 'info'}, 3000))
        navigate("/"); 
      

    } catch (exception) {
        console.log(exception)
        await dispatch(setNotification({data: `${exception.response.data.message}`, type: 'error'}, 3000))
    }



  }

  return (
    <>
    <Notification/>
      <h2>Register</h2>
      <form onSubmit={handleRegistration}>
      <div>
          name
          <input
            type="text"
            value={name}
            name="name"
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          email
          <input
            type="text"
            value={email}
            name="name"
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          confirm password
          <input
            type="text"
            value={password2}
            name="Password2"
            onChange={({ target }) => setPassword2(target.value)}
          />
        </div>
        <button type="submit">register</button>
      </form>
    </>
  )
}

export default Registration;