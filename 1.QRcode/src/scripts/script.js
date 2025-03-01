import axios from 'axios'
import Toastify from 'toastify-js'

const template = document.getElementById("loader");
const container = document.getElementById("QR_container");
const QRImage = document.getElementById("QR_code");

let success = false;
let toastText = "";
let QRsrc = "../public/images/empty-frame.avif";

const generateUniqueId = () => 'loader-' + Math.random().toString(36).substr(2, 9);

document.getElementById("submit_button").addEventListener("click", async () => {
    QRImage.src = "";
    const loader = template.content.cloneNode(true);
    const loaderId = generateUniqueId();
    loader.querySelector('*').id = loaderId;
    container.appendChild(loader);
    axios.post(`/api/v1/create?access-token=${import.meta.env.VITE_API_KEY}`, {
        "frame_name": "no-frame",
        "qr_code_text": document.getElementById("link_address").value.trim(),
        "image_format": "SVG",
        "qr_code_logo": "scan-me-square"
    },
    {
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        toastText = "QR code generated";
        success = true;
        const svgData = response.data;
        const base64SVG = btoa(unescape(encodeURIComponent(svgData)));
        QRsrc = `data:image/svg+xml;base64,${base64SVG}`;
    })
    .catch(error => {
        console.log(error);
        toastText = "an error occured";
        success = false;
        QRsrc = "../public/images/empty-frame.avif";
    })
    .finally (() => {
        const loaderElement = document.getElementById(loaderId);
        if (loaderElement) {
            loaderElement.remove();
        }
        QRImage.src = QRsrc;
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
                color: success ? "#00FF00" : "#FF0000",
                dir: "ltr",
                boredrRadius: "5px"
            },
        }).showToast();
    });
});