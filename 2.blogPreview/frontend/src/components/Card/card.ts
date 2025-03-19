import cardTemplate from './card.html?raw';
import cardStyles from './card.css?raw';
import bootstrapCss from 'bootstrap/dist/css/bootstrap.min.css?raw';

class CardComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        style.textContent = bootstrapCss.concat(cardStyles);
        shadow.appendChild(style);
        const wrapper = document.createElement('div');
        wrapper.innerHTML = cardTemplate;
        shadow.appendChild(wrapper);
    }
}

customElements.define('card-component', CardComponent);

export default CardComponent;
