import React from 'react';
import ReactDOM from 'react-dom';

// Import components
import Menu from './menu.jsx';
import BooksTable from './bookstable.jsx';

// Database url
import BOOKSURL from '../data/books.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      areLent: false,
      books: []
    };

    this.handleSearchBar = this.handleSearchBar.bind(this);
    this.handleCheckboxAreLent = this.handleCheckboxAreLent.bind(this);
    this.handleNewTitle = this.handleNewTitle.bind(this);
    this.handleNewAuthor = this.handleNewAuthor.bind(this);
    this.handleNewLent = this.handleNewLent.bind(this);
    this.handleNewLentTo = this.handleNewLentTo.bind(this);
  }

  handleSearchBar(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleCheckboxAreLent(areLent) {
    this.setState({
      areLent: areLent
    });
  }

  handleNewTitle(newTitle) {
    this.setState({
      newTitle: newTitle
    });
  }

  handleNewAuthor(newAuthor) {
    this.setState({
      newAuthor: newAuthor
    });
  }

  handleNewLent(newLent) {
    this.setState({
      newLent: newLent
    });
  }

  handleNewLentTo(newLentTo) {
    this.setState({
      newLentTo: newLentTo
    });
  }

  // Delete button
  removeBook(index) {
    const books = this.state.books;
    const bookLink = books[index]._links.book.href;

    $.ajax({
      method: "DELETE",
      url: bookLink,
      dataType: "json"
    }).done((response) => {
      books.splice(index, 1);
      this.setState({
        books: books
      });
    }).fail(function(error) {
      console.log("error");
    });
  }

  // Load data
  componentDidMount() {
    function load(books) {
      const array = [];
      for (let key in books) {
        array.push(books[key]);
      }

      const booksArray = [];
      for (let i=0; i<array[0].books.length; i++) {
        booksArray.push(array[0].books[i]);
      }
      return booksArray;
    }

    $.ajax({
      method: "GET",
      url: BOOKSURL,
      dataType: "json"
    }).done((response) => {
      this.setState({
        books: load(response)
      })
    }).fail(function(error) {
      console.log("error");
    });
  }

  render() {
    return <div>
      <div className="container">
        <Menu
          books={this.state.books}
          filterText={this.state.filterText}
          areLent={this.state.areLent}
          onSearchBar={this.handleSearchBar}
          onCheckboxAreLent={this.handleCheckboxAreLent}
          onNewTitle = {this.handleNewTitle}
          onNewAuthor = {this.handleNewAuthor}
          onNewLent = {this.handleNewLent}
          onNewLentTo = {this.handleNewLentTo} />
        <BooksTable
          books={this.state.books}
          filterText={this.state.filterText}
          areLent={this.state.areLent}
          callback={index => this.removeBook(index)}/>
      </div>
    </div>;
  }
}
