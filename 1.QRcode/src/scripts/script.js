import axios from 'axios'
import dotenv from "dotenv"
import Toastify from 'toastify-js'

dotenv.config();

const template = document.getElementById("loader");
const container = document.getElementById("QR_container");
const QRImage = document.getElementById("QR_code");

let success = false;
let toastText = "";
let QRsrc = "../public/images/empty-frame.avif";

document.getElementById("submit_button").addEventListener("click", async () => {
    QRImage.src = "";
    const loader = template.content.cloneNode(true);
    container.appendChild(loader);
    axios.post(`https://api.qr-code-generator.com/v1/create?access-token=${process.env.API_KEY}}`, {
        "frame_name": "no-frame",
        "qr_code_text": document.getElementById("link_address").value.trim(),
        "image_format": "SVG",
        "qr_code_logo": "scan-me-square"
    },
    {
        "Content-Type": "application/json"
    })
    .then(response => {
        toastText = "QR code generated";
        success = true;
        QRsrc = response.data;
    })
    .catch(error => {
        console.log(error);
        toastText = "an error occured";
        success = false;
        QRsrc = "../public/images/empty-frame.avif";
    })
    .finally(
        container.removeChild(loader),
        Toastify({
            text: toastText,
            duration: 2000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "left",
            stopOnFocus: true,
            style: {
                background: "#FFFFFF",
                border: `1px solid ${success ? "#00FF00" : "#FF0000"}`,
            },
          }).showToast()
    );
});