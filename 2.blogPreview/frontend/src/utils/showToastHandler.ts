import Toastify from 'toastify-js';

export const showToast = (message: string, success: boolean) => {
    Toastify({
        text: message,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
        background: "#FFFFFF",
        border: `1px solid ${success ? "#00FF00" : "#FF0000"}`,
        color: success ? "#00FF00" : "#FF0000",
        direction: "rtl",
        "border-radius": "5px"
        },
    }).showToast();
};