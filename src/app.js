/**
 * Created by zhongfan on 2017/1/17.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory, Router} from 'react-router'
import routes from './routes'

ReactDOM.render((
    <Router history={browserHistory} routes={routes} />
), document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}