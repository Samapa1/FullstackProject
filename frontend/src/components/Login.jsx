import { useState } from "react"
import { useDispatch } from "react-redux"
import { loginUser } from "../reducers/userReducer.js"


const Login = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
  
    try {
      await dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')

    } catch (exception) {
      console.log(exception) 
    }



  }

  return (
    <>
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
        <button type="submit">log in</button>
      </form>
    </>
  )
}

export default Login;