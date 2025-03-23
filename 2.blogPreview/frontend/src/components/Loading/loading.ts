import loadingTemplate from './loading.html?raw';
import loadingStyles from './loading.css?raw';
import bootstrapCss from 'bootstrap/dist/css/bootstrap.min.css?raw';

class LoadingComponent extends HTMLElement {
    static get observedAttributes() {
        return ['active'];
    }

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const styleElem = document.createElement('style');
        styleElem.textContent = bootstrapCss.concat(loadingStyles);
        shadow.appendChild(styleElem);
        const wrapper = document.createElement('div');
        wrapper.innerHTML = loadingTemplate;
        if(this.getAttribute('active') === "false") {
            wrapper.querySelector('div')?.classList.add('d-none');
        }
        shadow.appendChild(wrapper);
    }

    attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
        if (name === 'active') {
            this.updateActiveness(newValue);
        }
    }

    updateActiveness(activeness: string) {
        if(activeness === 'true') {
            this.shadowRoot?.querySelector('div')?.classList.remove('d-none');
        }
        else {
            this.shadowRoot?.querySelector('div')?.classList.add('d-none');
        }
    }
}

customElements.define('loading-component', LoadingComponent);
export default LoadingComponent;