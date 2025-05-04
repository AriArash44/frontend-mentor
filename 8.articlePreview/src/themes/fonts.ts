import Manrope700 from '../assets/fonts/Manrope/Manrope-Bold.ttf';
import Manrope500 from '../assets/fonts/Manrope/Manrope-Medium.ttf';

const globalFonts = `
    @font-face {
        font-family: 'Manrope';
        font-style: normal;
        font-weight: 700;
        src: url(${Manrope700}) format('truetype');
    }
    
    @font-face {
        font-family: 'Manrope';
        font-style: normal;
        font-weight: 500;
        src: url(${Manrope500}) format('truetype');
    }
`;

export default globalFonts;