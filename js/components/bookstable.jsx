import React from 'react';
import ReactDOM from 'react-dom';

// Import components
import BookHeader from './bookheader.jsx';
import BooksList from './bookslist.jsx';

class Footer extends React.Component {
  render() {
    return <footer>
      <p>Layout, front-end: Ewa Dworczak 2017 || Back-end: Tomasz Grzesiak 2016</p>
    </footer>;
  }
}

export default class BooksTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: this.props.books
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      books: newProps.books
    })
  }

  render() {
    return <div className="table-footer-container">
      <div className="books-list">
        <BookHeader />
        <hr />
        <BooksList books={this.state.books} filterText={this.props.filterText}  areLent={this.props.areLent} callback={this.props.callback} />
      </div>
      <Footer />
    </div>;
  }
}
