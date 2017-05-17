import React from 'react';
import ReactDOM from 'react-dom';

// Import components
import App from './app.jsx';

// Example array
import exampleBookList from '../example/examplebooklist.jsx';

export default class AddNewBookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueTitle: "",
      valueAuthor: "",
      valueLent: false,
      valueLentTo: "",
      info: ""
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
    this.setState({
      valueTitle: "",
      valueAuthor: "",
      valueLent: false,
      valueLentTo: "",
      info: ""
    });
    ReactDOM.render(
      <App books={exampleBookList} />,
      document.getElementById('app')
    );
  }

  saveAction(event) {
    if (
      (this.state.valueTitle.length > 0) &&
      (this.state.valueAuthor.length > 0)
    ) {
      if (
        (this.state.valueLent) &&
        (this.state.valueLentTo.length > 0)
      ) {
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
        this.setState({
          valueTitle: "",
          valueAuthor: "",
          valueLent: false,
          valueLentTo: "",
          info: ""
        });
        ReactDOM.render(
          <App books={exampleBookList} />,
          document.getElementById('app')
        );
      } else if (!this.state.valueLent) {
        const newIndex = exampleBookList.length + 1;
        exampleBookList.push (
          {
            "Id": newIndex,
            "Title": this.state.valueTitle,
            "Author": this.state.valueAuthor,
            "Lent": this.state.valueLent,
            "LentTo": null
          }
        );
        this.setState({
          valueTitle: "",
          valueAuthor: "",
          valueLent: false,
          valueLentTo: "",
          info: ""
        });
        ReactDOM.render(
          <App books={exampleBookList} />,
          document.getElementById('app')
        );
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
          <input type="text" className="input-details" placeholder="podaj autora" value={this.state.valueAuthor} onChange={event => this.addAuthor(event)} />
          <input type="text" className="input-details" placeholder="podaj tytuł" value={this.state.valueTitle} onChange={event => this.addTitle(event)} />
        </div>
        <div className="add-new-book__row--lent">
          <div className="checkbox-container">
            <input type="checkbox" id="box-1" value={this.state.valueLent} onChange={event => this.ifLent(event)}/>
            <label htmlFor="box-1">Książka została pożyczona</label>
          </div>
          <input type="text" className="input-details" placeholder="podaj imię i nazwisko" value={this.state.valueLentTo} onChange={event => this.addLentTo(event)} />
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
