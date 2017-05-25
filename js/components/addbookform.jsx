import React from 'react';
import ReactDOM from 'react-dom';

// Import components
import App from './app.jsx';

// Database url
import BOOKSURL from '../data/books.jsx';

export default class AddNewBookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTitle: "",
      newAuthor: "",
      newLent: false,
      newLentTo: "",
      disabled: true,
      description: "",
      info: ""
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      books: newProps.books
    })
  }

  addTitle(event) {
    this.setState({
      newTitle: event.target.value
    })
  }

  addAuthor(event) {
    this.setState({
      newAuthor: event.target.value
    })
  }

  ifLent(event) {
    if (this.state.newLent) {
      this.setState({
        newLent: false,
        newLentTo: "",
        disabled: true
      })
    } else {
      this.setState({
        newLent: true,
        disabled: false
      })
    }
  }

  addLentTo(event) {
    this.setState({
      newLentTo: event.target.value
    })
  }

  addDescription(event) {
    this.setState({
      description: event.target.value
    })
  }

  cancelAction(event) {
    ReactDOM.render(
      <App />,
      document.getElementById('app')
    );
  }

  saveAction(event) {
    function newBook (title, author, lent, lentTo, description) {
      const newBook = {
        title: title,
        author: author,
        lent: lent,
        lentTo: lentTo,
        description: description
      }
      return newBook;
    }

    function refreshList() {
      ReactDOM.render(
        <App />,
        document.getElementById('app')
      );
    }

    if (
      (this.state.newTitle.length > 0) &&
      (this.state.newAuthor.length > 0)
    ) {
      if (
        (this.state.newLent) &&
        (this.state.newLentTo.length > 0)
      ) {
        const bookDetails = newBook(this.state.newTitle, this.state.newAuthor, this.state.newLent, this.state.newLentTo, this.state.description);
        $.ajax({
          method: "POST",
          url: BOOKSURL,
          dataType: "json",
          contentType:"application/json; charset=utf-8",
          data: JSON.stringify(bookDetails)
        }).done((response) => {
          refreshList();
        }).fail(function(error) {
          console.log("error");
        });
      } else if (!this.state.newLent) {
        const bookDetails = newBook(this.state.newTitle, this.state.newAuthor, this.state.newLent, null, this.state.description);
        $.ajax({
          method: "POST",
          url: BOOKSURL,
          dataType: "json",
          contentType:"application/json; charset=utf-8",
          data: JSON.stringify(bookDetails)
        }).done((response) => {
          refreshList();
        }).fail(function(error) {
          console.log("error");
        });
      } else {
        this.setState({
          info: "Podaj dane osoby pożyczającej"
        })
      }
    } else {
      this.setState({
        info: "Podaj autora i tytuł książki"
      })
    }
  }

  render() {
    return <div className="add-new-book__bg">
      <div className="add-new-book__form">
        <h1>Dodaj nową książkę</h1>
        <hr />
        <div className="add-new-book__row">
          <input type="text" className="input-details" placeholder="podaj autora" value={this.state.newAuthor} onChange={event => this.addAuthor(event)} />
          <input type="text" className="input-details" placeholder="podaj tytuł" value={this.state.newTitle} onChange={event => this.addTitle(event)} />
        </div>
        <div className="add-new-book__row info">
          <textarea maxLength="500" placeholder="podaj opis" value={this.state.description} onChange={event => this.addDescription(event)} />
        </div>
        <div className="add-new-book__row--lent">
          <div className="checkbox-container">
            <input type="checkbox" id="box-1" value={this.state.newLent} onChange={event => this.ifLent(event)}/>
            <label htmlFor="box-1">Książka została pożyczona</label>
          </div>
          <input type="text" className="input-details" placeholder="podaj imię i nazwisko" value={this.state.newLentTo} onChange={event => this.addLentTo(event)} disabled={this.state.disabled} />
        </div>
        <div className="add-new-book__row">
          <div className="add-new-book__info"><h2>{this.state.info}</h2></div>
          <div>
            <button className="alert" onClick={event => this.cancelAction(event)}>Anuluj</button>
            <button className="action" onClick={event => this.saveAction(event)}>Zapisz</button>
          </div>
        </div>
      </div>
    </div>
  }
}
