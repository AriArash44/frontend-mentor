import Toastify from 'toastify-js';

export const showToast = (success: Boolean = true) => {
    const toastNode = document.createElement("div");
    if(success){
        toastNode.innerHTML = `
          <div class="flex gap-1">
            <img src="/images/icon-success-check.svg" alt="sucess" />
            <p class=font-bold>Message Sent!</p>
          </div>
          <p class="mt-2 font-extralight">Thanks for completing the form. We'll be in touch soon!</p>
        `;
    }
    Toastify({
        node: toastNode,
        duration: 2000,
        newWindow: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
            background: "var(--color-gray-900)",
            color: "white",
            padding: "1rem",
            "border-radius": "8px"
        },
    }).showToast();
};