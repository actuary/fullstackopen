import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(notification => notification.notification)

  if (notification === null) {
    return null
  }

  const className = notification.success ? "success" : "error"
  return (
    <div className={className}>
      {notification.message}
    </div>
  )
}

export default Notification
