import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './components/Avatar/avatar.ts';
import './components/Card/card.ts';
import './components/Image/image.ts';
import './components/ThemeButton/themeButton.ts';
import './components/Loading/loading.ts';
import { ThemeContext } from './contexts/themeContext.ts';
import { apiGet } from './utils/requestHandler.ts';
import { showToast } from './utils/showToastHandler.ts';
import { errorMessages } from './consts/errorMessages.ts';
import { NameContext } from './contexts/nameContext.ts';
import { WsConnectionContext } from './contexts/wsConnectionContext.ts';

const loginButton = document.getElementById("login-button");
const logoutButton = document.getElementById("logout-button");
const loginForm = document.getElementById("login-form");
const themeSelector = document.getElementById("theme-selector");
const usernameFeild = document.getElementById("username-feild") as HTMLInputElement;
const themeButtons = document.querySelectorAll("theme-button-component");
const loader = document.querySelector("loading-component");

function handleApiError(error: any) {
    const message = (error instanceof Error && Object.values(errorMessages).includes(error.message))
        ? error.message
        : errorMessages.unknownError;
    showToast(message);
    loader?.setAttribute('active', 'false');
}

async function logoutCleanUp() {
    if (NameContext.isLoggedIn()){
        (await ThemeContext.getInstance()).removeTheme();
        (await NameContext.getInstance()).removeName();
        (await WsConnectionContext.getInstance()).closeConnection();
    }
}
  
loginButton?.addEventListener('click', async (event) => {
    event.preventDefault();
    if(usernameFeild?.value?.trim()) {
        try {
            loader?.setAttribute('active', 'true');
            await apiGet(`/api/authentication/login/${usernameFeild?.value?.trim()}`);
            ThemeContext.affectTheme((await ThemeContext.getInstance()).getTheme());
            loginForm?.classList.remove("d-flex");
            loginForm?.classList.add("d-none");
            themeSelector?.classList.remove("d-none");
            themeSelector?.classList.add("d-flex");
            await WsConnectionContext.getInstance();
            loader?.setAttribute('active', 'false');
        }
        catch(err) {
            handleApiError(err);
        }
    }
});

logoutButton?.addEventListener('click', async () => {
    loader?.setAttribute('active', 'true');
    try {
        await apiGet('/api/authentication/logout');
        await logoutCleanUp();
        themeSelector?.classList.remove("d-flex");
        themeSelector?.classList.add("d-none");
        loginForm?.classList.remove("d-none");
        loginForm?.classList.add("d-flex");
        loader?.setAttribute('active', 'false');
    }
    catch(err) {
        handleApiError(err);
    }
});

themeButtons.forEach((clikedThemeButton) => {
    clikedThemeButton.addEventListener("buttonClicked", async (event) => {
        try{
            loader?.setAttribute('active', 'true');
            const customEvent = event as CustomEvent;
            (await ThemeContext.getInstance()).setTheme(customEvent.detail.color); 
            clikedThemeButton.setAttribute('active', 'true');
            const otherThemeButtons = Array.from(themeButtons).filter((themeButton) => themeButton !== clikedThemeButton);
            otherThemeButtons.forEach((otherThemeButton) => {
                otherThemeButton.setAttribute('active', 'false');
            });
            loader?.setAttribute('active', 'false');
        }
        catch(err){
            handleApiError(err);
        }
    });
});

window.onload = () => {
    ThemeContext.affectTheme('yellow');
    document.body.style.visibility = 'visible';
};

window.addEventListener('beforeunload', async () => {
    try {
        await logoutCleanUp();
    }
    catch(err) {
        handleApiError(err);
    }
});