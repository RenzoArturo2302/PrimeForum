import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastPromise = (message, options) => {
  return new Promise((resolve) => {
    toast(message, {
      ...options,
      onClose: resolve,
    });
  });
};

export { toastPromise };
