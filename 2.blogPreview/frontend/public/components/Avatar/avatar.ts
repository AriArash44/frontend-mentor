class AvatarComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        Promise.all([this.loadHTML('card.html')]).then(([htmlContent]) => {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = htmlContent;
            const img = wrapper.querySelector('img') as HTMLImageElement;
            img.src = this.getAttribute('src') || '';
            img.alt = this.getAttribute('alt') || '';
            const head3 = wrapper.querySelector('h3') as HTMLImageElement;
            head3.textContent = this.getAttribute('txt') || '';
            shadow.appendChild(wrapper);
        });
    }

    private async loadHTML(file: string): Promise<string> {
        return fetch(file).then((response) => response.text());
    }
}

customElements.define('avatar-component', AvatarComponent);

export default AvatarComponent;
