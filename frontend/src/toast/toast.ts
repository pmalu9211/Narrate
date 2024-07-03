import { Bounce, toast } from "react-toastify";

export const notifyError = (message: string) =>
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    theme: "dark",
    transition: Bounce,
  });

export const notifySuccess = (message: string) =>
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    theme: "dark",
    transition: Bounce,
  });
