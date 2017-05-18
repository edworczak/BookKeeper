import React from 'react';
import ReactDOM from 'react-dom';

// Import components
import App from './components/app.jsx';

document.addEventListener('DOMContentLoaded', function(){

  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );

});
