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
      <div className="table__action"><BookActionButtons /></div>
    </div>;
  }
}

class BookActionButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      info: false,
      edit: false,
      delete: false
    }
  }

  showInfo(event) {
    console.log("pokazuję informacje");
  }

  editBook(event) {
    console.log("pokazuję okno edycji");
  }

  deleteThisBook(event) {
    this.setState({
      delete: true
    })
  }

  render() {
    return <div>
      <button className="book-action" onClick={event => this.showInfo(event)}><i className="fa fa-info" aria-hidden="true"></i></button>
      <button className="book-action" onClick={event => this.editBook(event)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
      <button className="book-action" onClick={event => this.deleteBook(event)}><i className="fa fa-times" aria-hidden="true"></i></button>
    </div>;
  }
}

class BooksList extends React.Component {
  onClick(event) {
    console.log(this.props.key);
  }

  render() {
    const books = (this.props.books);
    const tableRows = [];

    for (let i=0; i<books.length; i++) {
      if (books[i].Lent) {
        tableRows.push(<BookRow key={books[i].Id} title={books[i].Title} author={books[i].Author} state={"pożyczona: " + books[i].LentTo} action={<BookActionButtons callback={button => this.onClick(button)} />} />)
      } else {
        tableRows.push(<BookRow key={books[i].Id} title={books[i].Title} author={books[i].Author} state="na miejscu" action={<BookActionButtons />} />)
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
      <BooksList books={this.props.books} />
    </div>;
  }
}
