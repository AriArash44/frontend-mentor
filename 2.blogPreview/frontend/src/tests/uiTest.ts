import { Builder, By } from 'selenium-webdriver';
import { themes } from '../consts/themeMapper';

function rgbToHex(rgb: string): string {
    const result = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!result) return 'INVALID_RGB';
    
    const r = parseInt(result[1]).toString(16).padStart(2, "0");
    const g = parseInt(result[2]).toString(16).padStart(2, "0");
    const b = parseInt(result[3]).toString(16).padStart(2, "0");
    
    return `#${r}${g}${b}`;
}

(async function testApp() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get("https://ariarash44.github.io/frontend-mentor/2.blogPreview/");

        const loginButton = await driver.findElement(By.id('login-button'));
        const usernameField = await driver.findElement(By.id('username-feild'));
        const loader = await driver.findElement(By.css('loading-component'));

        await usernameField.sendKeys('testUser');
        await loginButton.click();

        await driver.wait(async () => {
            const activeAttr = await loader.getAttribute('active');
            return activeAttr === 'true';
        }, 5000);
        console.log('Loader activated');

        await driver.wait(async () => {
            const activeAttr = await loader.getAttribute('active');
            return activeAttr === 'false';
        }, 25000);
        console.log('Loader deactivated');

        const loginForm = await driver.findElement(By.id('login-form'));
        const themeSelector = await driver.findElement(By.id('theme-selector'));

        const loginFormHidden = (await loginForm.getAttribute('class')).includes('d-none');
        const themeSelectorVisible = (await themeSelector.getAttribute('class')).includes('d-flex');

        console.assert(loginFormHidden, 'Login form should be hidden after login');
        console.assert(themeSelectorVisible, 'Theme selector should be visible after login');

        const themeButtons = await driver.findElements(By.css('theme-button-component'));
        const firstThemeButton = themeButtons[0];
        let expectedColor = await firstThemeButton.getAttribute('color');

        await firstThemeButton.click();
        await driver.sleep(25000);

        let isActive = await firstThemeButton.getAttribute('active');
        console.assert(isActive === 'true', 'Theme button should have active attribute set to true');

        const body = await driver.findElement(By.css('body'));
        let computedBackgroundColor = await body.getCssValue('background-color');
        console.assert(rgbToHex(computedBackgroundColor).includes(themes[expectedColor as keyof typeof themes]),
            `Background color (${computedBackgroundColor}) should match the theme color "${expectedColor}"`);

        const thirdThemeButton = themeButtons[2];
        expectedColor = await thirdThemeButton.getAttribute('color');

        await thirdThemeButton.click();
        await driver.sleep(25000);

        isActive = await thirdThemeButton.getAttribute('active');
        console.assert(isActive === 'true', 'Theme button should have active attribute set to true');

        computedBackgroundColor = await body.getCssValue('background-color');
        console.assert(rgbToHex(computedBackgroundColor).includes(themes[expectedColor as keyof typeof themes]),
            `Background color (${computedBackgroundColor}) should match the theme color "${expectedColor}"`);

        const logoutButton = await driver.findElement(By.id('logout-button'));
        await logoutButton.click();

        await driver.wait(async () => {
            const activeAttr = await loader.getAttribute('active');
            return activeAttr === 'true';
        }, 5000);
        console.log('Loader reactivated during logout');

        await driver.wait(async () => {
            const activeAttr = await loader.getAttribute('active');
            return activeAttr === 'false';
        }, 25000);
        console.log('Loader deactivated after logout');

        const themeSelectorHidden = (await themeSelector.getAttribute('class')).includes('d-none');
        const loginFormVisible = (await loginForm.getAttribute('class')).includes('d-flex');

        console.assert(themeSelectorHidden, 'Theme selector should be hidden after logout');
        console.assert(loginFormVisible, 'Login form should be visible after logout');  
    } finally {
        await driver.quit();
    }
})();
