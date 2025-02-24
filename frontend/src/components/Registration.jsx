import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PasswordField from "./PasswordField.jsx";
import { setNotification } from "../reducers/notificationReducer.js";
import userService from "../services/users";
import { Button, Input } from "./Styles";

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const validPassword = (password) => {
    if (password.length < 8) {
      return false;
    }

    return [/\d/.test(password)];
  };

  const handleRegistration = async (event) => {
    event.preventDefault();

    if (!validPassword(password)) {
      await dispatch(
        setNotification(
          {
            data: `Password must have at least 8 characters (including at least one number)`,
            type: "error",
          },
          4000,
        ),
      );
      return;
    }

    if (password !== password2) {
      await dispatch(
        setNotification({ data: `Passwords don't match`, type: "error" }, 3000),
      );
      setPassword("");
      setPassword2("");
      return;
    }

    try {
      const userObject = {
        username: username,
        name: name,
        email: email,
        password: password,
      };

      await userService.create(userObject);
      await dispatch(
        setNotification({ data: `Registration ok`, type: "info" }, 3000),
      );
      navigate("/login");
    } catch (exception) {
      await dispatch(
        setNotification(
          { data: `${exception.response.data.error}`, type: "error" },
          3000,
        ),
      );
    }
  };

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleRegistration}>
        <div>
          name
          <Input
            data-testid="name"
            type="text"
            value={name}
            name="name"
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          email
          <Input
            data-testid="email"
            type="text"
            value={email}
            name="name"
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div>
          username
          <Input
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <PasswordField
          inputText={"password"}
          password={password}
          handleChange={({ target }) => setPassword(target.value)}
        />
        <PasswordField
          inputText={"confirm password"}
          password={password2}
          handleChange={({ target }) => setPassword2(target.value)}
        />
        <Button type="submit">register</Button>
      </form>
    </>
  );
};

export default Registration;
