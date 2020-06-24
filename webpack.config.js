const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const {data, languages} = require('./l18n_parcer.js');
const argv = require('minimist')(process.argv.slice(2));
const { dev: DEV } = argv;

const main_index = data.find(e => e.main_index) || data[0];

module.exports = {
    mode: DEV ? 'development' : 'production',
    entry: './src/index.js',
    output: {
        filename: DEV ? 'js/main.js' : 'js/main.[hash].min.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: DEV ? 'source-map' : '',
    devServer: {
        port: 8080,
        contentBase: './src',
        watchContentBase: true
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                // loader: 'svg-inline-loader'
                loader: 'base64-inline-loader?limit=1000',
                exclude: /about/i
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'fonts',
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        }
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        }
                    },
                    'css-loader',

                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer()
                            ],
                            sourceMap: true
                        }
                    },
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                ],
            },
        ]
    },
    plugins: [
        DEV ? () => {} : new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: DEV ? 'css/[name].css' : 'css/[name].[hash].css',
            chunkFilename: DEV ? 'css/[id].[name].css' : 'css/[id].[name].[hash].css',
        }),
        ...data.map(data => {

            return new HtmlWebpackPlugin({
                template: 'ejs-webpack-loader!src/index.ejs',
                cache: false,
                data,
                languages,
                filename: `${data.lang.name}/index.html`
            })
        }),
        new HtmlWebpackPlugin({
            template: 'ejs-webpack-loader!src/index.ejs',
            cache: false,
            data: main_index,
            languages,
            filename: `index.html`
        }),
        new CopyPlugin({
            patterns: [
                'src/resources'
            ]
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        }
    },
};