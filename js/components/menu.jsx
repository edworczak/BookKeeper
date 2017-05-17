import React from 'react';
import ReactDOM from 'react-dom';

// Import components
import AddNewBookForm from './addbookform.jsx';

class AddNewBookButton extends React.Component {
  addNewBook(event) {
    ReactDOM.render(
      <AddNewBookForm />,
      document.getElementById('app')
    );
  }

  render() {
    return <button className="action" onClick={event => this.addNewBook(event)}>Dodaj nową książkę</button>;
  }
}

export default class Menu extends React.Component {
  render() {
    const logo = "./img/logo.png";
    return <div className="menu">
      <div className="menu__content">
        <img src={logo} />
        <hr className="ondark" />
        <div>
          <AddNewBookButton />
          <div className="search">
            <span className="fa fa-search"></span>
            <input placeholder="Wyszukaj" />
          </div>
        </div>
      </div>
    </div>;
  }
}
