const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'source-map',
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
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true
                        }
                    }
                ],
                include: /\.module\.css$/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
                exclude: /\.module\.css$/
            },
            // {
            //     test: /\.ejs$/,
            //     use: [
            //         {
            //             loader: "ejs-webpack-loader",
            //             options: {
            //                 data: {title: "New Title", someVar:"hello world"},
            //                 htmlmin: true
            //             }
            //         }
            //     ]
            // },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        }
                    },
                    // Creates `style` nodes from JS strings
                    // 'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',

                    'resolve-url-loader',
                    // Compiles Sass to CSS
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                ],
            },
            // {
            //     test: /\.ejs$/,
            //     use: {
            //         loader: 'ejs-compiled-loader',
            //         options: {
            //             htmlmin: true,
            //             htmlminOptions: {
            //                 removeComments: true
            //             }
            //         }
            //     }
            // }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
        new HtmlWebpackPlugin({
            title: 'Custom template using Handlebars',
            template: 'ejs-webpack-loader!src/index.ejs',
            cache: false,
        }),
        // HTMLInlineCSSWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                'src/resources'
            ]
        }),
    ]
};