import React from 'react';
import ReactDOM from 'react-dom';

// Import components
import Menu from './menu.jsx';
import BooksTable from './bookstable.jsx';

// Database url
import BOOKSURL from '../data/books.jsx';

class Footer extends React.Component {
  render() {
    return <footer>
      <p>Ewa Dworczak, 2017</p>
    </footer>;
  }
}

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
  }

  handleSearchBar(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleCheckboxAreLent(areLent) {
    this.setState({
      areLent: areLent
    })
  }

  // Book row action buttons
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
        <Menu books={this.state.books} filterText={this.state.filterText} areLent={this.state.areLent} onSearchBar={this.handleSearchBar} onCheckboxAreLent={this.handleCheckboxAreLent} />
        <BooksTable books={this.state.books} filterText={this.state.filterText}  areLent={this.state.areLent} callback={index => this.removeBook(index)}/>
      </div>
      <Footer />
    </div>;
  }
}
