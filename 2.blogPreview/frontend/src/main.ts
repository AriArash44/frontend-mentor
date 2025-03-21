import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './components/Avatar/avatar.ts';
import './components/Card/card.ts';
import './components/Image/image.ts';
import './components/ThemeButton/themeButton.ts';
import { ThemeStore } from './stores/themeStore.ts';

const loginButton = document.getElementById("login-button");
const logoutButton = document.getElementById("logout-button");
const loginForm = document.getElementById("login-form");
const themeSelector = document.getElementById("theme-selector");
const usernameFeild = document.getElementById("username-feild") as HTMLInputElement;
const themeButtons = document.querySelectorAll("theme-button-component");

loginButton?.addEventListener('click', (event) => {
    event.preventDefault();
    if(usernameFeild?.value?.trim()) {
        loginForm?.classList.remove("d-flex");
        loginForm?.classList.add("d-none");
        themeSelector?.classList.remove("d-none");
        themeSelector?.classList.add("d-flex");
    }
});

logoutButton?.addEventListener('click', () => {
    themeSelector?.classList.remove("d-flex");
    themeSelector?.classList.add("d-none");
    loginForm?.classList.remove("d-none");
    loginForm?.classList.add("d-flex");
});

themeButtons.forEach((clikedThemeButton) => {
    clikedThemeButton.addEventListener("buttonClicked", (event) => {
        const customEvent = event as CustomEvent;
        clikedThemeButton.setAttribute('active', 'true');
        const otherThemeButtons = Array.from(themeButtons).filter((themeButton) => themeButton !== clikedThemeButton);
        otherThemeButtons.forEach((otherThemeButton) => {
            otherThemeButton.setAttribute('active', 'false');
            ThemeStore.getInstance().setTheme(customEvent.detail.color); 
        });
    });
});

window.onload = () => {
    document.body.style.visibility = 'visible';
};