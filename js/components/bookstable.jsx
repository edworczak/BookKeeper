import React from 'react';
import ReactDOM from 'react-dom';

class BookHeader extends React.Component {
  render() {
    return <div className="table-row">
      <div className="table__title">tytuł</div>
      <div className="table__author">autor</div>
      <div className="table__state">stan</div>
      <div className="table__action">akcja</div>
    </div>;
  }
}

class BookRow extends React.Component {
  render() {
    return <div className="table-row">
      <div className="table__title">{this.props.title}</div>
      <div className="table__author">{this.props.author}</div>
      <div className="table__state">{this.props.state}</div>
      <div className="table__action"><BookActionButtons callback={this.props.callback} index={this.props.index}/></div>
    </div>;
  }
}

class BookActionButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      info: false,
      edit: false
    }
  }

  showInfo(event) {
    console.log("pokazuję informacje");
  }

  editBook(event) {
    console.log("pokazuję okno edycji");
  }

  deleteThisBook(i) {
    this.props.callback(this.props.index);
  }

  render() {
    return <div>
      <button className="book-action" onClick={event => this.showInfo(event)}><i className="fa fa-info" aria-hidden="true"></i></button>
      <button className="book-action" onClick={event => this.editBook(event)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
      <button className="book-action" onClick={index => this.deleteThisBook(index)}><i className="fa fa-times" aria-hidden="true"></i></button>
    </div>;
  }
}

class BooksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: this.props.books
    }
  }

  removeBook(index) {
    const books = this.state.books
    books.splice(index, 1);

    this.setState({
      books: books
    });
  }

  render() {
    const books = (this.state.books);
    const tableRows = [];

    for (let i=0; i<books.length; i++) {
      let titleLower = books[i].Title.toLowerCase();
      let authorLower = books[i].Author.toLowerCase();
      let titleUpper = books[i].Title.toUpperCase();
      let authorUpper = books[i].Author.toUpperCase();

      if (
        ((titleLower.indexOf(this.props.filterText) !== -1) ||
        (titleUpper.indexOf(this.props.filterText) !== -1) ||
        (authorLower.indexOf(this.props.filterText) !== -1) ||
        (authorUpper.indexOf(this.props.filterText) !== -1)) &&
        (books[i].Lent || !this.props.areLent)
      ) {
        if (books[i].Lent) {
          tableRows.push(
            <BookRow
            key={books[i].Id}
            title={books[i].Title}
            author={books[i].Author}
            state={"pożyczona: " + books[i].LentTo}
            index={i}
            callback={i => this.removeBook(i)} />
          )
        } else {
          tableRows.push(
            <BookRow
            key={books[i].Id}
            title={books[i].Title}
            author={books[i].Author}
            state="na miejscu"
            index={i}
            callback={i => this.removeBook(i)} />
          )
        }
      }
    }

    return <div className="table-content">
      {tableRows}
    </div>
  }
}

export default class BooksTable extends React.Component {
  render() {
    return <div className="books-list">
      <BookHeader />
      <hr />
      <BooksList books={this.props.books} filterText={this.props.filterText}  areLent={this.props.areLent} />
    </div>;
  }
}
