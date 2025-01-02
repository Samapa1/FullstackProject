import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { Input } from "./Styles";

const PasswordField = ({ inputText, password, handleChange }) => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<IoEyeOffOutline />);

  const handlePasswordVisibility = () => {
    if (type === "password") {
      setIcon(<IoEyeOutline />);
      setType("text");
    } else {
      setIcon(<IoEyeOffOutline />);
      setType("password");
    }
  };
  return (
    <div>
      {inputText}
      <Input
        data-testid="password"
        type={type}
        value={password}
        name="Password"
        onChange={handleChange}
      />
      <span onClick={handlePasswordVisibility}>{icon}</span>
    </div>
  );
};

export default PasswordField;
