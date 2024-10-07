import { useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";


const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate("/");
    await dispatch(logoutUser());
  };

  return <button onClick={handleLogout}>log out</button>;
};

export default Logout;
