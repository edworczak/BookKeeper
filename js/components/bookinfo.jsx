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
      title: this.props.title,
      author: this.props.author,
      publisher: this.props.publisher,
      publishedOn: this.props.publishedOn,
      read: this.props.read,
      rating: this.props.rating,
      description: "",
      lent: this.props.lent,
      lentTo: this.props.lentTo
    }
  }

  componentDidMount() {
    let description = this.props.description;
    // Auto height in textareas
    $(document)
      .one('focus.autoExpand', 'textarea.autoExpand', function(){
        var savedValue = this.value;
        this.value = description;
        this.baseScrollHeight = this.scrollHeight;
        this.value = savedValue;
      })
      .on('input.autoExpand', 'textarea.autoExpand', function(){
        var minRows = this.getAttribute('data-min-rows')|0, rows;
        this.rows = minRows;
        rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 20);
        this.rows = minRows + rows + 1;
    });
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
          <input type="text" className="input-details" value={this.state.publisher} disabled={true} />
          <input type="text" className="input-details" value={this.state.publishedOn} disabled={true} />
        </div>
        <div className="add-new-book__row info">
          <textarea className="autoExpand" rows="3" data-min-rows="3" maxLength="50" value={this.props.description} disabled={true} />
        </div>
        <div className="add-new-book__row--read info">
          <div className="checkbox-container">
            <input type="checkbox" id="if-read" value={this.state.read} disabled={true} checked={this.state.read} />
            <label htmlFor="if-read">Książka przeczytana</label>
          </div>
          <input type="text" className="input-details" value={this.state.rating} disabled={true} />
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
