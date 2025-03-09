const Notification = ({ message }) => {
    if (message === null) {
        return 
    } else {
        return <div className={message.type}>{message.text}</div>
    }
  }
  
export default Notification