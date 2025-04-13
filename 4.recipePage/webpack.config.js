import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import glob from 'glob-all';
import { PurgeCSSPlugin } from 'purgecss-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = (env, argv) => {
    const isDevMode = argv.mode === 'development';
    const outputPath = isDevMode
        ? path.resolve(__dirname, 'dist/dev')
        : path.resolve(__dirname, 'dist/prod');
    const plugins = [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash].css',
        }),
    ];
    if (!isDevMode) {
        plugins.push(
            new PurgeCSSPlugin({
                paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, { nodir: true }),
            })
        );
    }
    return {
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: outputPath,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {    
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                    ],
                },
                {
                    test: /\.less$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'less-loader',
                    ],
                },
            ],
        },
        plugins: plugins,
        devServer: {
            static: isDevMode ? './dist/dev' : './dist/prod',
            devMiddleware: {
                writeToDisk: true,
            },
        },
        mode: argv.mode,
        optimization: {
            minimizer: [
                '...',
                new CssMinimizerPlugin(),
            ],
        },
    };
};

export default config;