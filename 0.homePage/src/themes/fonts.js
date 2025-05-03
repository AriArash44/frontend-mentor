import SpaceGrotesk700 from '../assets/fonts/SpaceGrotesk/SpaceGrotesk-Bold.ttf';
import SpaceGrotesk400 from '../assets/fonts/SpaceGrotesk/SpaceGrotesk-Regular.ttf';

const globalFonts = `
    @font-face {
        font-family: 'SpaceGrotesk';
        font-style: normal;
        font-weight: 700;
        src: url(${SpaceGrotesk700}) format('truetype');
    }
    
    @font-face {
        font-family: 'SpaceGrotesk';
        font-style: normal;
        font-weight: 400;
        src: url(${SpaceGrotesk400}) format('truetype');
    }
`;

export default globalFonts;
