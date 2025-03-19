import themeButtonTemplateRaw from './themeButton.html?raw';
import themeButtonStyles from './themeButton.css?raw';
import bootstrapCss from 'bootstrap/dist/css/bootstrap.min.css?raw';

class ThemeButtonComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        style.textContent = bootstrapCss.concat(themeButtonStyles);
        shadow.appendChild(style);
        const wrapper = document.createElement('div');
        wrapper.innerHTML = themeButtonTemplateRaw;
        const button = wrapper.querySelector('button');
        if (this.getAttribute('active') === 'true') {
            button?.classList.add('border-4');
        }
        const theme = this.getAttribute('color');
        button?.classList.add("bg-" + theme);
        shadow.appendChild(wrapper);
    }
}

customElements.define('theme-button-component', ThemeButtonComponent);

export default ThemeButtonComponent;
