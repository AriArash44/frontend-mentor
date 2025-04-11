import { buttonCreator } from './components/button/button.js';
import { queryRequestHandler } from './utils/requestHandler.js';
import $ from 'jquery';

const buttonsSlot = document.getElementById('buttunsContainer');
const loader = document.getElementById('loader');
const content = document.getElementById('content');

function pascalToSpace(pascal) {
    return pascal.replace(/(?<!^)(?=[A-Z])/g, ' ');
}

async function init() {
    document.body.classList.remove('invisible');
    const linkData = await queryRequestHandler(`{ allLinks {
            Github
            FrontendMentor
            Linkedin
            Email
        }
    }`);
    for (const [key, value] of Object.entries(linkData["allLinks"])) {
        if (key !== '__typename'){
            let button = await buttonCreator({href: value, buttonText: pascalToSpace(key)});  
            buttonsSlot.appendChild(button);
        }
    }
    loader.classList.remove('flex');
    loader.classList.add('hidden');
    content.classList.remove('hidden');
    content.classList.add('flex');
}
  
await init();

$(function () {
    const $buttons = $("#buttunsContainer a")
    let activeIndex = -1;

    $buttons.on("mouseenter", function () {
        activeIndex = $buttons.index(this);
        $buttons.addClass("bg-gray700 text-white");
        $buttons.removeClass("bg-green text-gray900").trigger("blur");
        $(this).removeClass("bg-gray700 text-white");
        $(this).addClass("bg-green text-gray900").trigger("focus");
    });

    $buttons.on("mouseleave", function () {
        $(this).removeClass("bg-green text-gray900");
        $(this).addClass("bg-gray700 text-white").trigger("blur");
        activeIndex = -1;
    });
  
    $(document).on("keydown", function (e) {
        if (e.which === 40) {
            e.preventDefault();
            activeIndex = (activeIndex + 1) % $buttons.length;
            $buttons.addClass("bg-gray700 text-white");
            $buttons.removeClass("bg-green text-gray900").trigger("blur");
            let $newActive = $buttons.eq(activeIndex);
            $newActive.removeClass("bg-gray700 text-white");
            $newActive.addClass("bg-green text-gray900").trigger("focus");
        } else if (e.which === 38) {
            e.preventDefault();
            activeIndex = (activeIndex - 1 + $buttons.length) % $buttons.length;
            $buttons.addClass("bg-gray700 text-white");
            $buttons.removeClass("bg-green text-gray900").trigger("blur");
            let $newActive = $buttons.eq(activeIndex);
            $newActive.removeClass("bg-gray700 text-white");
            $newActive.addClass("bg-green text-gray900").trigger("focus");
        } else if (e.which === 13) {
            e.preventDefault();
            if (activeIndex !== -1) {
                $buttons.eq(activeIndex)[0].click();
            }
        }
    });
});