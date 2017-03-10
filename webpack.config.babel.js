/**
 * Created by zhongfan on 2017/1/17.
 */
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

export default {
    entry:[
        'webpack-hot-middleware/client',
        './src/app.js'
    ],
    output: {
        path: path.join(__dirname, 'assets'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015'],
                env: {
                    "development": {
                        "presets": ["react-hmre"]
                    }
                }
            }
        }]
    },
    devtool: 'source-map',
    plugins: [
        // new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: './index.html'
        })
    ]
};