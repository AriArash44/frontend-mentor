import Toastify from 'toastify-js';

export const showToast = (message: string) => {
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
        border: `1px solid "#FF0000"`,
        color: "#FF0000",
        direction: "rtl",
        "border-radius": "5px"
        },
    }).showToast();
};