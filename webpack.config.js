module.exports = {
    entry: './_src/index.js',
    output: {
        path: './dist',
        filename: 'index.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: /_src/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
};
