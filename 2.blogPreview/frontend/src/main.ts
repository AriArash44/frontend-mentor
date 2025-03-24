import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './components/Avatar/avatar.ts';
import './components/Card/card.ts';
import './components/Image/image.ts';
import './components/ThemeButton/themeButton.ts';
import './components/Loading/loading.ts';
import { ThemeStore } from './stores/themeStore.ts';
import { apiGet } from './utils/requestHandler.ts';
import { LoginApiResponse } from './types/loginApiResponse.ts';

const loginButton = document.getElementById("login-button");
const logoutButton = document.getElementById("logout-button");
const loginForm = document.getElementById("login-form");
const themeSelector = document.getElementById("theme-selector");
const usernameFeild = document.getElementById("username-feild") as HTMLInputElement;
const themeButtons = document.querySelectorAll("theme-button-component");
const loader = document.querySelector("loading-component");

loginButton?.addEventListener('click', async (event) => {
    event.preventDefault();
    if(usernameFeild?.value?.trim()) {
        loginForm?.classList.remove("d-flex");
        loginForm?.classList.add("d-none");
        themeSelector?.classList.remove("d-none");
        themeSelector?.classList.add("d-flex");
        try {
            const response: LoginApiResponse = await apiGet(`/api/authentication/login/${usernameFeild?.value?.trim()}`);
            localStorage.setItem('access-token', response.accessToken);
            localStorage.setItem('refresh-token', response.refreshToken);
        }
        catch(err) {
            console.log(err);
        }
    }
});

logoutButton?.addEventListener('click', () => {
    themeSelector?.classList.remove("d-flex");
    themeSelector?.classList.add("d-none");
    loginForm?.classList.remove("d-none");
    loginForm?.classList.add("d-flex");
    localStorage.setItem('access-token', '');
    localStorage.setItem('refresh-token', '');
});

themeButtons.forEach((clikedThemeButton) => {
    clikedThemeButton.addEventListener("buttonClicked", async (event) => {
        try{
            loader?.setAttribute('active', 'true');
            const customEvent = event as CustomEvent;
            await ThemeStore.getInstance().setTheme(customEvent.detail.color); 
            clikedThemeButton.setAttribute('active', 'true');
            const otherThemeButtons = Array.from(themeButtons).filter((themeButton) => themeButton !== clikedThemeButton);
            otherThemeButtons.forEach((otherThemeButton) => {
                otherThemeButton.setAttribute('active', 'false');
            });
            loader?.setAttribute('active', 'false');
        }
        catch(error){
            console.log(error);
            loader?.setAttribute('active', 'false');
        }
    });
});

window.onload = () => {
    document.body.style.visibility = 'visible';
};