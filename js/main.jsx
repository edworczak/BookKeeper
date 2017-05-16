import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function(){

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

    showInfo(event) {
      console.log("pokazuję informacje");
    }

    editBook(event) {
      console.log("pokazuję okno edycji");
    }

    deleteBook(event) {
      console.log("kasuję");
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
    render() {
      const books = (this.props.books);
      const tableRows = [];

      for (let i=0; i<books.length; i++) {
        if (books[i].Lent) {
          tableRows.push(<BookRow key={books[i].Id} title={books[i].Title} author={books[i].Author} state={"pożyczona: " + books[i].LentTo} action={<BookActionButtons />} />)
        } else {
          tableRows.push(<BookRow key={books[i].Id} title={books[i].Title} author={books[i].Author} state="na miejscu" action={<BookActionButtons />} />)
        }
      }

      return <div className="table-content">
        {tableRows}
      </div>
    }
  }

  class BooksTable extends React.Component {
    render() {
      return <div className="books-list">
        <BookHeader />
        <hr />
        <BooksList books={this.props.books} />
      </div>;
    }
  }

  class Footer extends React.Component {
    render() {
      return <footer>
        <p>Ewa Dworczak, 2017</p>
      </footer>;
    }
  }

  class AddNewBookForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        valueTitle: "podaj tytuł",
        valueAuthor: "podaj autora",
        valueLent: false,
        valueLentTo: "podaj imię i nazwisko"
      }
    }

    addTitle(event) {
      this.setState({
        valueTitle: event.target.value
      })
    }

    addAuthor(event) {
      this.setState({
        valueAuthor: event.target.value
      })
    }

    ifLent(event) {
      if (this.state.valueLent) {
        this.setState({
          valueLent: false
        })
      } else {
        this.setState({
          valueLent: true
        })
      }
    }

    addLentTo(event) {
      this.setState({
        valueLentTo: event.target.value
      })
    }

    cancelAction(event) {
      ReactDOM.render(
        <App books={exampleBookList} />,
        document.getElementById('app')
      );
    }

    saveAction(event) {
      const newIndex = exampleBookList.length + 1;
      exampleBookList.push (
        {
          "Id": newIndex,
          "Title": this.state.valueTitle,
          "Author": this.state.valueAuthor,
          "Lent": this.state.valueLent,
          "LentTo": this.state.valueLentTo
        }
      );
      ReactDOM.render(
        <App books={exampleBookList} />,
        document.getElementById('app')
      );
    }

    render() {
      return <div className="add-new-book__bg">
        <div className="add-new-book__form">
          <h1>Dodaj nową książkę</h1>
          <hr />
          <div className="add-new-book__row">
            <input type="text" placeholder={this.state.valueAuthor} onChange={event => this.addAuthor(event)} />
            <input type="text" placeholder={this.state.valueTitle} onChange={event => this.addTitle(event)} />
          </div>
          <div className="add-new-book__row">
            <div><input type="checkbox" value={this.state.valueLent} className="checkbox" onChange={event => this.ifLent(event)}/> Książka została pożyczona</div>
            <input type="text" placeholder={this.state.valueLentTo} onChange={event => this.addLentTo(event)} />
          </div>
          <button className="alert" onClick={event => this.cancelAction(event)}>Anuluj</button>
          <button className="action" onClick={event => this.saveAction(event)}>Zapisz</button>
        </div>
      </div>
    }
  }

  class AddNewBookButton extends React.Component {
    addNewBook(event) {
      ReactDOM.render(
        <AddNewBookForm />,
        document.getElementById('app')
      );
    }

    render() {
      return <button className="action" onClick={event => this.addNewBook(event)}>Dodaj nową książkę</button>;
    }
  }

  class Menu extends React.Component {
    render() {
      const logo = "./img/logo.png";
      return <div className="menu">
        <div className="menu__content">
          <img src={logo} />
          <hr className="ondark" />
          <div>
            <AddNewBookButton />
            <div className="search">
              <span className="fa fa-search"></span>
              <input placeholder="Wyszukaj" />
            </div>
          </div>
        </div>
      </div>;
    }
  }

  class App extends React.Component {
    render() {
      return <div>
        <div className="container">
          <Menu />
          <BooksTable books={this.props.books} />
        </div>
        <Footer />
      </div>;
    }
  }

  const exampleBookList = [
    {
      "Id": 1,
      "Title": "Ginekolodzy",
      "Author": "Jürgen Thorwald",
      "Lent": false,
      "LentTo": null
    },
    {
      "Id": 2,
      "Title": "Sekrety urody Koreanek. Elementarz pielęgnacji",
      "Author": "Charlotte Cho",
      "Lent": true,
      "LentTo": "Monika Konieczna"
    },
    {
      "Id": 3,
      "Title": "Zew Cthulhu",
      "Author": "Howard Phillips Lovecraft",
      "Lent": true,
      "LentTo": "Olga Kierzkowska"
    }
  ];

  ReactDOM.render(
    <App books={exampleBookList} />,
    document.getElementById('app')
  );

});
