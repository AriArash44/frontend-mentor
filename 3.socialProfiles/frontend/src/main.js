import { buttonCreator } from './components/button/button.js';
import { queryRequestHandler } from './utils/requestHandler.js';

const buttonsSlot = document.getElementById('buttunsContainer');

async function init() {
    const linkData = await queryRequestHandler(`{ allLinks {
            Github
            FrontendMentor
            Linkedin
            Email
        }
    }`);
    for (const [key, value] of Object.entries(linkData["allLinks"])) {
        if (key !== '__typename'){
            let button = await buttonCreator({href: value, buttonText: key});  
            buttonsSlot.appendChild(button);
        }
    }
}
  
await init();