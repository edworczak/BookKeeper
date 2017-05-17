import React from 'react';
import ReactDOM from 'react-dom';

// Import components
import App from './components/app.jsx';
import BooksTable from './components/bookstable.jsx';
import Menu from './components/menu.jsx';
import AddNewBookForm from './components/addbookform.jsx';

// Example array
import exampleBookList from './example/examplebooklist.jsx';

document.addEventListener('DOMContentLoaded', function(){

  ReactDOM.render(
    <App books={exampleBookList} />,
    document.getElementById('app')
  );

});
