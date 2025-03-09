const Notification = ({ message }) => {
    if (message === null) {
        return 
    } else if (message.includes("Error")) {
        return <div>{message}</div>;
    }
  
    return <div className='success'>{message}</div>;
  };
  
export default Notification;