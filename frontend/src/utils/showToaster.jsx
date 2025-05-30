import { toast } from "react-toastify";

export const showToastMessage = (message, type = "success", theme = "dark") => {

  toast[type](message, {
    position: "top-left",
    bodyClassName: "toastBody",
    autoClose: 3000, // Auto close after 2 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: theme
  });
};