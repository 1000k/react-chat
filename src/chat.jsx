var Chat = React.createClass({
  getInitialState: function() {
    return {data: [
      {id: Date.now(), name: "John Coltrane", message: "Giant Steps", posted_at: (new Date()).toUTCString()}
    ]};
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
        <p key={comment.id}>
          {comment.name}: {comment.message} - <time>{comment.posted_at}</time>
        </p>
      );
    });
    return (
      <div className="comments">
        {comments}
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
      <form className="inputForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name"
               value={this.state.name}
               onChange={this.handleChangeName} />
        <input type="text" placeholder="Message"
               value={this.state.message}
               onChange={this.handleChangeMessage} />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

ReactDOM.render(
  <Chat />,
  document.getElementById('content')
);