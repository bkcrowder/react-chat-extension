const HTMLPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { resolve } = require('path');

const tsRule = {
    test: /\.ts(x?)$/,
    exclude: [/node_modules/, /__tests__/, /backup/],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },
    use: 'ts-loader'
}

const cssRule = {
    test: /\.(s(a|c)ss|less|css)$/,
    use: [
        'style-loader',
        'css-loader',
        'sass-loader'
    ]
}

const plugins = [
    //...getHtmlPlugins(["index"]),
    new CopyWebpackPlugin({
        patterns: [
            { from: "public", to: "." }
        ]
    })
];

function getHtmlPlugins(chunks) {
    return chunks.map(
        chunk =>
            new HTMLPlugin({
                title: "React Chat extension",
                filename: `${chunk}.html`,
                chunks: [chunk]
            })
    );
}

module.exports = {
    entry: {
        //extension: './src/app.popup.tsx',
        contentscript: './src/app.contentscript.tsx'
    },
    output: {
        clean: true,
        filename: '[name].js',
        path: resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            tsRule,
            cssRule
        ]
    },
    resolve: {
        alias: {
            Components: resolve(__dirname, 'src')
        }
    },
    plugins
}