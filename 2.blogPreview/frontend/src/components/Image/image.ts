import imageTemplate from './image.html?raw';
import bootstrapCss from 'bootstrap/dist/css/bootstrap.min.css?raw';

class ImageComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        style.textContent = bootstrapCss;
        shadow.appendChild(style);
        const wrapper = document.createElement('div');
        wrapper.innerHTML = imageTemplate;
        const img = wrapper.querySelector('img') as HTMLImageElement;
        img.src = this.getAttribute('src') || '';
        img.alt = this.getAttribute('alt') || '';
        shadow.appendChild(wrapper);
    }
}

customElements.define('image-component', ImageComponent);

export default ImageComponent;