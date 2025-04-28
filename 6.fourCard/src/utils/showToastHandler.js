import Toastify from 'toastify-js';

export const showToast = (message) => {
    const toastNode = document.createElement("div");
    toastNode.innerHTML = `<span style="color: hsl(234, 12%, 12%); font-weight: 600;">${message.split(":")[0].concat(":")}</span>`;
    toastNode.innerHTML = toastNode.innerHTML.concat(message.split(":")[1].split(",").map((color, index, arr) => 
        `<span style="color: var(--color-custom-${color.trim()}); font-weight: 600;">${color}${index === arr.length - 1 ? "" : ","}</span>`
    ));
    Toastify({
        node: toastNode,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
        background: "#FFFFFF",
        border: `1px solid "#FF0000"`,
        direction: "rtl",
        "border-radius": "5px"
        },
    }).showToast();
};