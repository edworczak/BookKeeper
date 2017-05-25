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
      books: []
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      books: newProps.books
    })
  }

  render() {
    const tableRows = [];

    function createRow(key, title, author, lent, lentTo, description, linkTo, callback) {
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
        index={key}
        linkTo={linkTo}
        callback={callback} />
      )
    }

    for (let i=0; i<this.state.books.length; i++) {
      let titleLower = this.state.books[i].title.toLowerCase();
      let authorLower = this.state.books[i].author.toLowerCase();

      if (
        ((titleLower.indexOf(this.props.filterText.toLowerCase()) !== -1) ||
        (authorLower.indexOf(this.props.filterText.toLowerCase()) !== -1)) &&
        (this.state.books[i].lent || !this.props.areLent)
      ) {
        createRow(i, this.state.books[i].title, this.state.books[i].author, this.state.books[i].lent, this.state.books[i].lentTo, this.state.books[i].description, this.state.books[i]._links.book.href, this.props.callback);
      }
    }

    return <div className="table-content">
      {tableRows}
    </div>
  }
}
