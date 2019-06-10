import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './LoginPage';

const root = document.createElement('div');
// Hide old wrapper
const old = document.querySelector('.version');
old.style.display = 'none';

root.classList.add('root');
root.id = 'root';
document.body.appendChild(root);

ReactDOM.render(<LoginPage />, document.getElementById('root'));
