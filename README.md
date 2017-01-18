# reactExample
react项目示例
学习 React 时，很苦恼。前前后后看了十几二十篇教程，历经一个月，终于算是有了一些理解。其中不乏有许多困惑的地方，借本文，在此梳理。引用 <a href="http://www.runoob.com/react/react-tutorial.html" title="Title">菜鸟教程的话</a>：
>React 是一个用于构建用户界面的 JAVASCRIPT 库。
React主要用于构建UI，很多人认为 React 是 MVC 中的 V（视图）。
React 起源于 Facebook 的内部项目，用来架设 Instagram 的网站，并于 2013 年 5 月开源。
React 拥有较高的性能，代码逻辑非常简单，越来越多的人已开始关注和使用它。

正由于react主要用于构建UI，所以要完成一个完整的项目我们不得不配合使用其他的工具，如webpack(打包工具)、gulp(自动化构建工具)、express(应用程序框架)等。
## express
<a href="http://expressjs.com/zh-cn/starter/hello-world.html" title="Title"> express </a>可以在本地启动一个服务，当你访问对应端口时，你可以在服务里面进行处理，返回文字，图片，页面等，是一个web应用的基础。
>新建一个server.js，里面如下：
```javascript
var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```
然后执行
```
npm init  //初始化packag.json
npm install express --save //安装express
node server.js //把服务器跑起来
```
现在你能看到
Hello World!
我们也可以返回一个标签：
```
res.send('<h1>Hello World!</h1>')
```
看到就是这样了
<h1>Hello World!</h1>
我们项目需要做的就是把一些写好的组件、页面呈现给访问者，然后处理一些逻辑和展示数据。
我们再新建一个index.html，内容如下：
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
hello world!
</body>
</html>
```
我们再改一下server.js文件，把html传出去：
```
res.sendfile('./index.html');
```

## webpack
我们一般用webpack来打包文件和资源，并通过它来实时更新和打包。详细可以看<a href="https://webpack.github.io/docs/usage.html" title="Title">文档</a>。包括webpack的安装，配置文件的解释和使用，打包，实时更新等内容。
>由于react需要用到react.js、react-dom.js等库，项目中也会用到其他许许多多的库我们先学习用webpack打包成一个很小的bundle.js文件，然后在html文件中引用。
安装webpack命令：
 ```
npm install webpack --save
```
一个最简单的Webpack配置文件webpack.config.js如下所示：
```
module.exports = {
    entry:[
        './src/app.js'
    ],
    output: {
        path: __dirname + '/assets/',
        publicPath: "/assets/",
        filename: 'bundle.js'
    }
};
```
我们创建两个文件夹src、assets，并在src下新建app.js文件。执行如下命令安装react和react-dom：
```
npm install react --save
npm install react-dom --save
```
app.js文件内容如下：
```
import { render } from 'react-dom'
render((
    <div>hello world!</div>
), document.getElementById('root'));
```
为了让webpack识别ES6和jsx语法我们需要安装加载器loader了：
```
npm install --save-dev babel-core babel-preset-es2015
npm install --save-dev babel-loader
npm install babel-preset-react --save
```
在webpack.config.js中添加：
```
module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']
            }
        }]
    }
```
在命令行执行:
```
webpack
```
完成后就能在assets目录下看到一个bundle.js文件了。
为了让我们的app.js允许访问本地资源，我们加入以下代码：
```
app.use(express.static('assets'));
```
我们为之前的index.html添加一个script引用bundle.js：
```
//Express 相对于静态目录查找文件，因此静态目录的名称不是此 URL 的一部分
<script src="/bundle.js"></script>
```
再次执行：
```
node server.js
```
我们便可以看到两个hello world!了，这样我们就把react这个“V”和服务器联系了起来，接下来可以专心写界面了。


## react
react的<a href="http://www.infoq.com/cn/articles/react-and-webpack" title="Title">官方文档</a>对我们的理解和使用有很大的帮助。文档介绍了react的基本使用(组件的创建和渲染)，组件的生命周期(componentDidMount)，属性的更新和值的传递(state、setState、props)。
>####jsx语法
HTML 语言直接写在 JavaScript 语言之中，不加任何引号，这就是 JSX 的语法，它允许 HTML 与 JavaScript 的混写。
```
var names = ['a', 'b', 'c'];
render((
    <div>
        {
            names.map(function (name) {
                return <div>Hello, {name}!</div>
            })
        }
    </div>
), document.getElementById('root'));
```
重新打包，执行
```
webpack
node server.js
```
可以看到
Hello, a!
Hello, b!
Hello, c!
hello world!
####组件(component)
新建一个Home.js文件，如下：
```
import React from 'react';
class Home extends React.Component {
    render() {
        return <div>
            home
        </div>
    }
}
export default Home
```
在app.js中引用
```
import { render } from 'react-dom';
import React from 'react';
import Home from './Home';
var names = ['a', 'b', 'c'];
render((
    <div>
        {
            names.map(function (name) {
                return <div>Hello, {name}!</div>
            })
        }
        <Home />
    </div>
), document.getElementById('root'));
```
重新打包，执行
```
webpack
node server.js
```
可以看到
Hello, a!
Hello, b!
Hello, c!
home
hello world!

## gulp
<a href="http://www.gulpjs.com.cn/docs/getting-started/" title="Title">gulp</a>就是一个自动化工具，可以开启多个任务，然后将它们按序执行，也可以结合其他插件使用。
>每次都要打包，运行是不是很麻烦，我们就需要用工具来帮我们完成这些工作。在根目录新建一个gulpfile.babel.js文件。
gulp原生并不支持es6语法，但是我们可以告诉gulp使用babel将gulpfile转换为es5，方法就是将gulpfile命名为gulpfile.babel.js。如果你的babel是6.0以上的版本，你需要添加一个.babelrc文件：
```
{
  "presets": ["es2015"]
}
```
安装gulp相关工具：
```
npm install --save gulp-cli
npm install --save-dev gulp gulp-babel
npm install --save gulp-util
npm install --save-dev del
npm install --save exec
```
gulpfile.babel.js文件如下：
```
import gulp from 'gulp';
import gulpUtil from 'gulp-util';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';
import del from 'del';
import exec from 'exec';
gulp.task('clean-all', function () {
    return del([webpackConfig.output])
});
gulp.task('watch', () => {
    return gulp.watch('src/**/*.*', ['webpack:build'])
});
gulp.task('webpack:build', (callback) => {
    // run webpack
    webpack(webpackConfig, (err) => {
        if (err)
            throw new gulpUtil.PluginError('webpack:build', err);
        callback();
    });
});
gulp.task('server', (callback) => {
    exec('node server.js', (err) => {
        if (err)
            throw new gulpUtil.PluginError('webpack:build', err);
        callback()
    })
});
gulp.task('default', ['watch', 'webpack:build', 'server']);
```

路由、浏览器自动刷新、网络请求和代理将在后面内容添加。