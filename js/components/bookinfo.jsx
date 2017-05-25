import React from 'react';
import ReactDOM from 'react-dom';

// Import components
import App from './app.jsx';

// Database url
import BOOKSURL from '../data/books.jsx';

export default class BookInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "tytuł: " + this.props.title,
      author: "autor: " + this.props.author,
      lent: this.props.lent,
      lentTo: this.props.lentTo,
      disabled: true
    }
  }

  cancelAction(event) {
    ReactDOM.render(
      <App />,
      document.getElementById('app')
    );
  }

  render() {
    return <div className="add-new-book__bg">
      <div className="add-new-book__form">
        <h1>Informacje o książce</h1>
        <hr />
        <div className="add-new-book__row info">
          <input type="text" className="input-details" value={this.state.author} disabled={true} />
          <input type="text" className="input-details" value={this.state.title} disabled={true} />
        </div>
        <div className="add-new-book__row info">
          <textarea maxLength="50" value={this.props.description} disabled={true} />
        </div>
        <div className="add-new-book__row--lent info">
          <div className="checkbox-container">
            <input type="checkbox" id="box-1" value={this.state.lent} disabled={true} checked={this.state.lent} />
            <label htmlFor="box-1">Książka została pożyczona</label>
          </div>
          <input type="text" className="input-details" value={this.state.lentTo} disabled={true} />
        </div>
        <div className="add-new-book__row">
          <div className="add-new-book__info"><h2>{this.state.info}</h2></div>
          <div>
            <button className="action" onClick={event => this.cancelAction(event)}>OK</button>
          </div>
        </div>
      </div>
    </div>
  }
}
