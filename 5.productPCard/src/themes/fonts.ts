import Fraunces from '../assets/fonts/Fraunces/Fraunces_700.ttf';
import Montserrat500 from '../assets/fonts/Montserrat/Montserrat_500.ttf';
import Montserrat700 from '../assets/fonts/Montserrat/Montserrat_700.ttf';

const globalFonts = `
    @font-face {
        font-family: 'Fraunces';
        font-style: normal;
        font-weight: 700;
        src: url(${Fraunces}) format('truetype');
    }
    
    @font-face {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 700;
        src: url(${Montserrat700}) format('truetype');
    }
    
    @font-face {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 500;
        src: url(${Montserrat500}) format('truetype');
    }
`;

export default globalFonts;
