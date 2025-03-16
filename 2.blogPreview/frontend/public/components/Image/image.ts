class ImageComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        Promise.all([this.loadHTML('image.html')]).then(
            ([htmlContent]) => {
                const wrapper = document.createElement('div');
                wrapper.innerHTML = htmlContent;
                const img = wrapper.querySelector('img') as HTMLImageElement;
                img.src = this.getAttribute('src') || '';
                img.alt = this.getAttribute('alt') || '';
                shadow.appendChild(wrapper);
            }
        );
    }

    private async loadHTML(file: string): Promise<string> {
        return fetch(file).then((response) => response.text());
    }
}

customElements.define('image-component', ImageComponent);

export default ImageComponent;