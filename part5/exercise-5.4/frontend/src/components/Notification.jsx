const Notification = ({ message }) => {
  console.log("Notification component - message:", message);

  return (
    <div className="notification">
      {message && <p className="error">{message}</p>}
    </div>
  );
};

export default Notification;
