import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevConfig from './webpack.config.babel';
import proxy from 'http-proxy-middleware';

const compiler = webpack(webpackDevConfig);
const app = express();
app.use(express.static( webpackDevConfig.output.path));
app.use(webpackDevMiddleware(compiler,{
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));

app.use('/adapter', proxy({
    target: 'http://218.107.217.49:9000/',
    ws: true,
}));
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

