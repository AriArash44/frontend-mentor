import buttonTemplate from './button.html?raw';

export async function buttonCreator({ href, buttonText }) {
    try {
        const template = document.createElement('template');
        template.innerHTML = buttonTemplate.trim();
    
        const component = template.content.firstElementChild;
        if (!(component instanceof HTMLElement)) {
            throw new Error("Fetched component is not a valid HTML element.");
        }
        
        component.setAttribute('href', href);
        component.textContent = buttonText;
    
        return component;
    } catch (error) {
        console.error('Error fetching or processing the component:', error);
    }
}
  