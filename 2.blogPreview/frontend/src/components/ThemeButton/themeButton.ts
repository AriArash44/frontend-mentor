class ThemeButtonComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        Promise.all([
            this.loadCSS('themeButton.css'),
            this.loadHTML('themeButton.html'),
        ]).then(([cssContent, htmlContent]) => {
            const style = document.createElement('style');
            style.textContent = cssContent;
            shadow.appendChild(style);
            const wrapper = document.createElement('div');
            wrapper.innerHTML = htmlContent;
            const button = wrapper.querySelector('button');
            if (button?.getAttribute('active') === 'true') {
                button.classList.add('but-active');
            }
            shadow.appendChild(wrapper);
        });
    }

    private async loadCSS(file: string): Promise<string> {
        return fetch(file).then((response) => response.text());
    }

    private async loadHTML(file: string): Promise<string> {
        return fetch(file).then((response) => response.text());
    }
}

customElements.define('themeBottun-component', ThemeButtonComponent);

export default ThemeButtonComponent;
