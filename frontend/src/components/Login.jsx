import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { loginUser } from "../reducers/userReducer.js"
import { useNavigate } from "react-router-dom"
import Notification from "./Notification"
import { setNotification } from  "../reducers/notificationReducer.js"
import { Button } from './Styles'


const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
  
    try {
      navigate("/");
      await dispatch(loginUser({ username, password }))
      await dispatch(setNotification( {data: `${username} logged in`, type: 'info'}, 3000))
      setUsername('')
      setPassword('')

    } catch (exception) {
      console.log(exception)
      navigate("/login"); 
      await dispatch(setNotification( {data: 'Invalid username or password', type: 'error'}, 3000))
    }



  }

  return (
    <>
    <Notification/>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
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
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button type="submit">log in</Button>
      </form>
      <div>
        <br/>
        <Link to={`/register`}>Do not have an account yet? Please register.</Link>
      </div>
    </>
  )
}

export default Login;