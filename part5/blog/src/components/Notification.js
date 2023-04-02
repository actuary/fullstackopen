const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  const className = message.success ? "success" : "error"
  return (
    <div className={className}>
      {message.message}
    </div>
  )
}

export default Notification
