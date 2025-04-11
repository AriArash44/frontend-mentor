import { buttonCreator } from './components/button/button.js';
import { queryRequestHandler } from './utils/requestHandler.js';

async function init() {
    const linkData = queryRequestHandler(`{ allLinks {
            Github
            FrontendMentor
            Linkedin
            Email
        }
    }`);
    for (const [key, value] of Object.entries(linkData)) {
        let button = await buttonCreator({href: value, buttonText: key});  
        targetElement.appendChild(button);  
    }
    // const button1 = await buttonCreator({href: 'https://example.com', buttonText: 'Click Me!'});
    // const button2 = await buttonCreator({href: 'https://another-example.com', buttonText: 'Go There'});
    // const button3 = await buttonCreator({href: 'https://and-another-example.com', buttonText: 'Click Me!'});
    // const button4 = await buttonCreator({href: 'https://and-also-another-example.com', buttonText: 'Go There'});
    // const targetElement = document.getElementById('buttunsContainer');
    // targetElement.appendChild(button1);
    // targetElement.appendChild(button2);
    // targetElement.appendChild(button3);
    // targetElement.appendChild(button4);
}
  
await init();