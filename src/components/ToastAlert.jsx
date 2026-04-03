
function ToastAlert({ message }) {
  return (
    <div className="toast-alert">
      <i className="bi bi-check-circle-fill me-2"></i>
      {message}
    </div>
  );
}

export default ToastAlert;