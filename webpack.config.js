const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'retro_fps.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ]
    }

};