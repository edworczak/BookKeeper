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

    // Search bar
    this.handleSearchBar = this.handleSearchBar.bind(this);
    this.handleCheckboxAreLent = this.handleCheckboxAreLent.bind(this);
    this.getBooks = this.getBooks.bind(this);
    this.loadBooks = this.loadBooks.bind(this);
  }

  // Search bar
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
  loadBooks(books) {
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

  getBooks() {
    fetch(BOOKSURL)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        this.setState({
          books: this.loadBooks(data)
        });
    });
  };

  componentDidMount() {
    this.getBooks();
  }

  componentWillUnmount() {
    // clear set state from did mount
  }

  render() {
    return <div>
      <div className="container">
        <Menu
          books={this.state.books}
          filterText={this.state.filterText}
          areLent={this.state.areLent}
          onSearchBar={this.handleSearchBar}
          onCheckboxAreLent={this.handleCheckboxAreLent} />
        <BooksTable
          books={this.state.books}
          filterText={this.state.filterText}
          areLent={this.state.areLent}
          callback={index => this.removeBook(index)}/>
      </div>
    </div>;
  }
}
