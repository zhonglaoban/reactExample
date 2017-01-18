/**
 * Created by zhongfan on 2017/1/17.
 */
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