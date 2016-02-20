var React = require('react');
var ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Chat = React.createClass({
  _fetchInitialData: function() {
    return [
      {id: Date.now(), name: "John Coltrane", message: "Giant Steps", posted_at: (new Date()).toUTCString()}
    ];
  },
  getInitialState: function() {
    return {data: this._fetchInitialData()};
  },
  handleCommentSubmit: function(comment) {
    comment.id = Date.now();
    comment.posted_at = (new Date()).toUTCString();
    var comments = this.state.data;
    comments.unshift(comment);
    this.setState({data: comments});
  },
  render: function() {
    return (
      <div>
        <InputForm onCommentSubmit={this.handleCommentSubmit} />
        <ChatContent data={this.state.data} />
      </div>
    );
  }
})

var ChatContent = React.createClass({
  render: function() {
    var comments = this.props.data.map(function(comment) {
      return (
        <div className="comment" key={comment.id}>
          <span className="name">{comment.name}</span>
          <span className="message">{comment.message}</span>
          <time>{comment.posted_at}</time>
        </div>
      );
    });
    return (
      <div className="comments">
        <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {comments}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

var InputForm = React.createClass({
  getInitialState: function() {
    return {name: '', message: ''};
  },
  handleChangeName: function(e) {
    this.setState({name: e.target.value});
  },
  handleChangeMessage: function(e) {
    this.setState({message: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var name = this.state.name.trim();
    var message = this.state.message.trim();
    if (!name || !message) { return; }
    this.props.onCommentSubmit({name: name, message: message});
    this.setState({message: ''});
  },
  render: function() {
    return (
      <form className="input-form" onSubmit={this.handleSubmit}>
        <input type="text" className="input-name" placeholder="Name"
               value={this.state.name}
               onChange={this.handleChangeName} />
        <input type="text" className="input-message" placeholder="Message"
               value={this.state.message}
               onChange={this.handleChangeMessage} />
        <input className="button-post" type="submit" value="Post" />
      </form>
    );
  }
});

ReactDOM.render(
  <Chat />,
  document.getElementById('content')
);
