import Toastify from 'toastify-js';
import _ from "lodash";

const showToast = (message: string) => {
    Toastify({
        text: message,
        duration: 2000,
        newWindow: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
            background: "#FFFFFF",
            color: "#000000",
            direction: "rtl",
            "border-radius": "5px"
        },
    }).showToast();
};

export const throttledToast = _.throttle((message: string) => {
    showToast(message);
}, 5000);