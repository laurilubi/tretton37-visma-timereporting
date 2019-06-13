import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

function initPage(App) {
  // Hide old wrapper
  const old = document.querySelector('frameset') || document.querySelector('.version');
  old.remove();

  // Create a root element for React App
  const root = document.createElement('div');
  root.classList.add('root');
  root.id = 'root';

  if (!document.body) {
    // Add a new body to document
    const body = document.createElement('body');
    body.appendChild(root);
    document.documentElement.appendChild(body);
  } else {
    // Reset body element
    document.body.removeAttribute('onload');
    document.body.removeAttribute('onresize');
    document.body.removeAttribute('bgcolor');
    document.body.appendChild(root);
  }

  ReactDOM.render(<App />, document.getElementById('root'));
}

export default initPage;
