/* 
const A = Math.PI
export A - отправить

import A - получить
*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(React.createElement('h1', { title: 'dogs' }, 'Hello React!'));
// то на JSX
root.render(
    <div>
        <h1>Hello React!</h1>
        <p>DogFood shop</p>
    </div>
);
