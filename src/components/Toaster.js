import { ToastContainer, toast as toastify } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const Toaster = () => {
    return (
        <ToastContainer
            toastStyle={{ boxShadow: '0px 0px 2px #000' }}
        />
    )
};

export const toast = (message, type = 'success') => {
    toastify[`${type}`](message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};