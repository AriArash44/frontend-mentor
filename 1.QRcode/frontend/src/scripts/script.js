import axios from 'axios';
import Toastify from 'toastify-js';

const template = document.getElementById("loader");
const container = document.getElementById("QR_container");
const qrImage = document.getElementById("QR_code");
const submitButton = document.getElementById("submit_button");

const EMPTY_IMAGE = "../public/images/empty-frame.avif";
const API_URL = import.meta.env.MODE === 'development' ? `/api/v1/create?access-token=${import.meta.env.VITE_API_KEY}` :
    'https://qr-code-generator-ouc2zbnse-arashs-projects-9cfaceed.vercel.app/api/qrcode';

const generateUniqueId = () => `loader-${Math.random().toString(36).substr(2, 9)}`;

const showToast = (message, success) => {
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

const fetchQRCode = async (linkText) => {
    const payload = {
        "frame_name": "no-frame",
        "qr_code_text": linkText,
        "image_format": "SVG",
        "qr_code_logo": "scan-me-square"
    };
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    return await axios.post(API_URL, payload, config);
};

let isProcessing = false;

submitButton.addEventListener("click", async () => {
    if (isProcessing) return;
    isProcessing = true;
    submitButton.disabled = true;
    qrImage.src = "";
    const loader = template.content.cloneNode(true);
    const loaderId = generateUniqueId();
    loader.querySelector('*').id = loaderId;
    container.appendChild(loader);
    let toastText = "";
    let success = false;
    let qrSrc = EMPTY_IMAGE;
    try {
        const linkAddress = document.getElementById("link_address").value.trim();
        const response = await fetchQRCode(linkAddress);
        toastText = "QR code generated";
        success = true;
        const svgData = response.data;
        const base64SVG = window.btoa(unescape(encodeURIComponent(svgData)));
        qrSrc = `data:image/svg+xml;base64,${base64SVG}`;
    } catch (error) {
        console.error(error);
        toastText = "An error occurred";
        success = false;
        qrSrc = EMPTY_IMAGE;
    } finally {
        const loaderElement = document.getElementById(loaderId);
        if (loaderElement) {
            loaderElement.remove();
        }
        qrImage.src = qrSrc;
        isProcessing = false;
        submitButton.disabled = false;
        showToast(toastText, success);
    }
});