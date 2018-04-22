import React from 'react';
import ReactDOM from 'react-dom';

// Import components
import AddNewBookForm from './addbookform.jsx';
import Search from './search.jsx';

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
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      books: newProps.books
    })
  }

  render() {
    const logo = "./img/logo.png";
    return <div className="menu">
      <div className="menu__content">
        <img src={logo} />
        <hr className="ondark" />
        <div>
          <AddNewBookButton
            books={this.state.books}
            onNewTitle = {this.props.onNewTitle}
            onNewAuthor = {this.props.onNewAuthor}
            onNewLent = {this.props.onNewLent}
            onNewLentTo = {this.props.onNewLentTo} />
          <hr className="ondark" />
          <Search filterText={this.props.filterText} areLent={this.props.areLent} onSearchBar={this.props.onSearchBar} onCheckboxAreLent={this.props.onCheckboxAreLent} />
        </div>
      </div>
    </div>;
  }
}
