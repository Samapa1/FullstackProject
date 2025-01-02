import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { initializeUsers } from "../reducers/usersReducer.js";
import { getUserData } from "../reducers/userReducer.js";
import { linkStyle1 } from "./Styles.jsx";

const Userlist = () => {
  const dispatch = useDispatch();
  const adminUser = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  const userlist = useSelector((state) => state.users);

  if (userlist) {
    return (
      <div>
        <h1>Users</h1>
        {userlist
          .filter((user) => user.id !== adminUser.id)
          .map((user) => (
            <div key={user.id}>
              <Link style={linkStyle1} to={`/users/${user.id}`}>
                {user.name}
              </Link>
            </div>
          ))}
      </div>
    );
  }
};

export default Userlist;
