import React from 'react';
import ReactDOM from 'react-dom';

// Import components
import BookRow from './bookrow.jsx';

// Example array
import exampleBookList from '../example/examplebooklist.jsx';

export default class BooksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      loading: this.props.loading,
      error: this.props.error,
      loaded: this.props.loaded
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      books: newProps.books,
      loading: newProps.loading,
      error: newProps.error,
      loaded: newProps.loaded
    })
  }

  render() {
    let tableRows = <div className="books-loading"><i className="fas fa-spinner fa-pulse"></i></div>;

    function createRow(key, title, author, lent, lentTo, description, publisher, publishedOn, read, rating, linkTo, callback) {
      let state = "";
      let newLentTo = "";
      if (lent) {
        state = "pożyczona: " + lentTo;
        newLentTo = lentTo;
      } else {
        state = "na miejscu";
        newLentTo = "";
      }

      tableRows.push(
        <BookRow
        key={key}
        title={title}
        author={author}
        state={state}
        lent={lent}
        lentTo={newLentTo}
        description={description}
        publisher={publisher}
        publishedOn={publishedOn}
        read={read}
        rating={rating}
        index={key}
        linkTo={linkTo}
        callback={callback} />
      )
    }

    if (this.state.books.length != 0) {
      tableRows = [];
    }

    for (let i=0; i<this.state.books.length; i++) {
      let titleLower = this.state.books[i].title.toLowerCase();
      let authorLower = this.state.books[i].author.toLowerCase();

      if (
        ((titleLower.indexOf(this.props.filterText.toLowerCase()) !== -1) ||
        (authorLower.indexOf(this.props.filterText.toLowerCase()) !== -1)) &&
        (this.state.books[i].lent || !this.props.areLent)
      ) {
        createRow(i, this.state.books[i].title, this.state.books[i].author, this.state.books[i].lent, this.state.books[i].lentTo, this.state.books[i].description, this.state.books[i].publisher, this.state.books[i].publishedOn, this.state.books[i].read, this.state.books[i].rating, this.state.books[i]._links.book.href, this.props.callback);
      }
    }


    return <div className="table-content">
      {tableRows}
    </div>
  }
}
