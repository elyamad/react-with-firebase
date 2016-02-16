import React from 'react';
import Actions from '../actions/Actions';

var UserItem = React.createClass({
  remove(id) {
    Actions.removeUser(this.props.user.id);
  },

  render() {
    var user = this.props.user;
    return (
      <div className="list-group-item" key={user.id}>
        <div className="pull-right">
          <button className="btn btn-xs btn-danger" onClick={this.remove}>
            Delete
          </button>
        </div>
        {user.name}
      </div>
    );
  }
});

module.exports = UserItem;
