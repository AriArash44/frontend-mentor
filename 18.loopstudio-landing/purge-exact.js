import { PurgeCSS } from 'purgecss';
import fs from 'fs';

const purgeCSS = new PurgeCSS();

const result = await purgeCSS.purge({
    content: [
        'src/**/*.tsx',
        'src/**/*.jsx',
        'src/**/*.js',
        'src/**/*.html'
    ],
    css: ['styles/globals.css'],
        defaultExtractor: (content) => {
        return content.match(/[A-Za-z0-9-_:/]+/g) || [];
    },
});

fs.writeFileSync('styles/globals.min.css', result[0].css);