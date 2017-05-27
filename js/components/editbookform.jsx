import React from 'react';
import ReactDOM from 'react-dom';

// Import components
import App from './app.jsx';

// Database url
import BOOKSURL from '../data/books.jsx';

export default class EditBookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      author: this.props.author,
      publisher: this.props.publisher,
      publishedOn: this.props.publishedOn,
      description: this.props.description,
      read: this.props.read,
      disabledRating: !this.props.read,
      rating: this.props.rating,
      lent: this.props.lent,
      disabledLentTo: !this.props.lent,
      lentTo: this.props.lentTo,
      linkTo: this.props.linkTo,
      info: "",
    }
  }

  addTitle(event) {
    this.setState({
      title: event.target.value
    })
  }

  addAuthor(event) {
    this.setState({
      author: event.target.value
    })
  }

  ifLent(event) {
    if (event.target.checked) {
      this.setState({
        lent: true,
        disabledLentTo: false
      })
    } else {
      this.setState({
        lent: false,
        lentTo: "",
        disabledLentTo: true
      })
    }
  }

  addLentTo(event) {
    this.setState({
      lentTo: event.target.value
    })
  }

  addDescription(event) {
    this.setState({
      description: event.target.value
    })
  }

  addPublisher(event) {
    this.setState({
      publisher: event.target.value
    })
  }

  addPublishedOn(event) {
    this.setState({
      publishedOn: event.target.value
    })
  }

  ifRead(event) {
    if (event.target.checked) {
      this.setState({
        read: true,
        disabledRating: false
      })
    } else {
      this.setState({
        read: false,
        rating: "",
        disabledRating: true
      })
    }
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
      (this.state.title.length > 0) &&
      (this.state.author.length > 0)
    ) {
      if (
        (this.state.lent) &&
        (this.state.lentTo.length > 0)
      ) {
        const bookDetails = newBook(this.state.title, this.state.author, this.state.lent, this.state.lentTo, this.state.description);
        $.ajax({
          method: "PUT",
          url: this.props.linkTo,
          dataType: "json",
          contentType:"application/json; charset=utf-8",
          data: JSON.stringify(bookDetails)
        }).done((response) => {
          refreshList();
        }).fail(function(error) {
          console.log("error");
        });
      } else if (!this.state.newLent) {
        const bookDetails = newBook(this.state.title, this.state.author, this.state.lent, null, this.state.description);
        $.ajax({
          method: "PUT",
          url: this.props.linkTo,
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
        <h1>Edytuj książkę</h1>
        <hr />
        <div className="add-new-book__row">
          <input type="text" className="input-details" placeholder="podaj autora" value={this.state.author} onChange={event => this.addAuthor(event)} />
          <input type="text" className="input-details" placeholder="podaj tytuł" value={this.state.title} onChange={event => this.addTitle(event)} />
        </div>
        <div className="add-new-book__row info">
          <input type="text" className="input-details" placeholder="podaj nazwę wydawnictwa" value={this.state.publisher} onChange={event => this.addPublisher(event)} />
          <input type="text" className="input-details" placeholder="podaj datę wydania" value={this.state.publishedOn} onChange={event => this.addPublishedOn(event)} />
        </div>
        <div className="add-new-book__row info">
          <textarea placeholder="podaj opis" value={this.state.description} onChange={event => this.addDescription(event)} />
        </div>
        <div className="add-new-book__row--read info">
          <div className="checkbox-container">
            <input type="checkbox" id="if-read" value={this.state.read} checked={this.state.read} onChange={event => this.ifRead(event)} defaultChecked={this.state.read} />
            <label htmlFor="if-read">Książka przeczytana</label>
          </div>
          <input type="text" className="input-details" value={this.state.rating} disabled={!this.state.read} />
        </div>
        <div className="add-new-book__row--lent">
          <div className="checkbox-container">
            <input type="checkbox" id="box-1" value={this.state.lent} onChange={event => this.ifLent(event)} defaultChecked={this.state.lent} />
            <label htmlFor="box-1">Książka została pożyczona</label>
          </div>
          <input type="text" className="input-details" placeholder="podaj imię i nazwisko" value={this.state.lentTo} onChange={event => this.addLentTo(event)} disabled={this.state.disabledLentTo} />
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
