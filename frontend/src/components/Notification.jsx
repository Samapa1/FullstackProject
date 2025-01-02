import { useSelector } from "react-redux";

import { notificationStyle, notificationStyleError } from "./Styles";

const Notification = () => {
  const message = useSelector((state) => state.notification);

  if (message.data === null) {
    return;
  }

  if (message.type === "error") {
    return <div style={notificationStyleError}>{message.data}</div>;
  }

  return <div style={notificationStyle}>{message.data}</div>;
};

export default Notification;
