import path from 'path';
import { fileURLToPath } from 'url';
import CopyPlugin from 'copy-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
    mode: 'production',
    target: 'node',
    entry: './src/server.ts',
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs2',
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets' },
                { from: 'src/consts/data.json', to: 'consts/data.json' }
            ],
        }),
    ],
};

export default config;