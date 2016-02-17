var React = require('react');
var Name = React.createClass({
  render: function() {
    return (
      <span>{this.props.name}</span>
    );
  }
});
var Chat = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <Name name="John Coltrane" />
      </div>
    );
  }
});
module.exports = Chat;