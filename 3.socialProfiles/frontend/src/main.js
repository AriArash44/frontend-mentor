import { buttonCreator } from './components/button/button.js';
import { queryRequestHandler } from './utils/requestHandler.js';

const buttonsSlot = document.getElementById('buttunsContainer');
const loader = document.getElementById('loader');
const content = document.getElementById('content');

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
    loader.classList.remove('flex');
    loader.classList.add('hidden');
    content.classList.remove('hidden');
    content.classList.add('flex');
}
  
await init();