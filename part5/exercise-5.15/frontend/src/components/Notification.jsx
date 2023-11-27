import PropTypes from 'prop-types'

const Notification = ({ message }) => {
  console.log('Notification component - message:', message)

  return (
    <div className="notification">
      {message && <p className="error">{message}</p>}
    </div>
  )
}

// Notification.propTypes = {
//   message: PropTypes.string.isRequired,
// };

export default Notification
