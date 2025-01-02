import { useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import { Button } from "./Styles";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate("/");
    await dispatch(logoutUser());
  };

  return (
    <div>
      <h2>Log out from the application?</h2>
      <Button onClick={handleLogout}>log out</Button>
    </div>
  );
};

export default Logout;
