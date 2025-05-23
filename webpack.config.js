const path = require('path');

module.exports = {
    entry: './src/js/main.js', // or your actual main JS file
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/resources/js'),
    },
    mode: 'development', // change to 'production' for minified builds
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};