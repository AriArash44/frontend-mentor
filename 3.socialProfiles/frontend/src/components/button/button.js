export async function buttonCreator({ href, buttonText }) {
    try {
      const response = await fetch('/src/components/button/button.html');
      const htmlText = await response.text();
  
      const template = document.createElement('template');
      template.innerHTML = htmlText.split('</script>')[1].trim();
  
      const component = template.content.firstElementChild;
      if (!(component instanceof HTMLElement)) {
        throw new Error("Fetched component is not a valid HTML element.");
      }
      
      component.setAttribute('href', href);
      const button = component.querySelector('button');
      button.textContent = buttonText;
  
      return component;
    } catch (error) {
      console.error('Error fetching or processing the component:', error);
    }
  }
  