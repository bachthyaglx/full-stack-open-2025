import { useContext } from 'react';
import { NotificationContext } from '../contexts/NotificationContext';

const Notification = () => {
  const [notification] = useContext(NotificationContext);

  if (!notification) return null; // Hide if empty

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: notification.includes('error') ? 'lightcoral' : 'lightgreen',
    color: 'black'
  };

  return <div style={style}>{notification}</div>;
};

export default Notification;
