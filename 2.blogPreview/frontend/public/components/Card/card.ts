class CardComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        Promise.all([
            this.loadCSS('card.css'),
            this.loadHTML('card.html'),
        ]).then(([cssContent, htmlContent]) => {
            const style = document.createElement('style');
            style.textContent = cssContent;
            shadow.appendChild(style);
            const wrapper = document.createElement('div');
            wrapper.innerHTML = htmlContent;
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

customElements.define('card-component', CardComponent);

export default CardComponent;
