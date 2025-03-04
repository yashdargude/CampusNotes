import { toast } from 'react-toastify';

const Notify = (type, message) => {
  switch (type) {
    case 'success':
      return toast.success(message);
    case 'warning':
      return toast.warn(message);
    case 'error':
      return toast.error(message);
    case 'info':
      return toast.info(message);
    default:
      return toast(message);
  }
}

export default Notify;