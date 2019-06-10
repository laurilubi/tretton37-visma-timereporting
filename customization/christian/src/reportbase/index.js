import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const root = document.createElement('div');
const body = document.createElement('body');
// Hide old wrapper
const old = document.querySelector('frameset');
old.style.display = 'none';

root.classList.add('root');
root.id = 'root';
body.appendChild(root);
document.documentElement.appendChild(body);
document.querySelector('frameset').remove();

ReactDOM.render(<App />, document.getElementById('root'));
