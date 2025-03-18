import avatarTemplate from './avatar.html?raw';
import bootstrapCss from 'bootstrap/dist/css/bootstrap.min.css?raw';

class AvatarComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const styleElem = document.createElement('style');
        styleElem.textContent = bootstrapCss;
        shadow.appendChild(styleElem);
        const wrapper = document.createElement('div');
        wrapper.innerHTML = avatarTemplate;
        const img = wrapper.querySelector('img');
        if (!img) {
            console.error("avatar.html does not include an <img> element!");
            return;
        }
        img.src = this.getAttribute('src') || '';
        img.alt = this.getAttribute('alt') || '';

        const head3 = wrapper.querySelector('h3');
        if (head3) {
            head3.textContent = this.getAttribute('txt') || '';
        } else {
            console.warn("avatar.html does not include an <h3> element!");
        }
        
        shadow.appendChild(wrapper);
    }
}

customElements.define('avatar-component', AvatarComponent);
export default AvatarComponent;