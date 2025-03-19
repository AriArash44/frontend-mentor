import cardTemplateRaw from './card.html?raw';
import cardStyles from './card.css?raw';
import bootstrapCss from 'bootstrap/dist/css/bootstrap.min.css?raw';

class CardComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const styleElem = document.createElement('style');
        styleElem.textContent = bootstrapCss.concat(cardStyles);
        shadow.appendChild(styleElem);
        const temp = document.createElement('div');
        temp.innerHTML = cardTemplateRaw;
        const template = temp.querySelector('template#card-template') as HTMLTemplateElement;
        if (template) {
            shadow.appendChild(template.content.cloneNode(true));
        } else {
            console.error('Template not found in card.html');
        }
    }
}

customElements.define('card-component', CardComponent);
export default CardComponent;
