import { useSelector } from 'react-redux'

const Notification = () => {

    
    const notificationStyle = {
        color: 'black',
        background: 'rgb(183, 231, 235)',
        fontSize: 16, 
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        marginTop: 20,
        marginRight: 800
    }

    const notificationStyleError = {
        color: 'black',
        background: 'rgb(254, 232, 182)',
        fontSize: 16, 
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        marginTop: 20,
        marginRight: 800
    }
  
//   .messagestyle.error {
//     color: rgb(226, 11, 11);
//     background: rgb(250, 212, 219);
//   }
    const message = useSelector((state) => state.notification)
    console.log(message.data)

    if (message.data === null) {
      return
    }
  
    if (message.type === 'error') {
      return <div style= {notificationStyleError}>{message.data}</div>
    }
  
    return <div style= {notificationStyle}>{message.data}</div>
  
}

export default Notification