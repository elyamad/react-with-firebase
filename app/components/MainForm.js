import React from 'react';
import Reflux from 'reflux';

import { Table, ProgressBar } from 'react-bootstrap';
import UserItem from './UserItem';

// stores and Actions
import UsersStore from '../stores/UsersStore';
import Actions from '../actions/Actions';

// firebase
import { firebaseUrl } from '../utils/constants';
import Firebase from 'firebase';
import ReactFireMixin from 'reactfire';

const baseRef = new Firebase(firebaseUrl);
const usersRef = baseRef.child('users');

var MainForm = React.createClass({
  mixins: [
    ReactFireMixin,
    Reflux.listenTo(UsersStore, "onUsersStoreUpdate")
  ],

  getInitialState() {
      return {
          users: UsersStore.getDefaultData(),
          newUser: {
            name: null
          }
      };
  },

  onUsersStoreUpdate(data) {
      this.setState(data.users);
  },

  componentDidMount() {
    Actions.watchUsers();
  },

  addUser(e) {
    e.preventDefault();
    Actions.addUser(this.state.newUser);

    this.setState({newUser: {name: ''}});
  },

  onInput(e){
    var name = e.target.value;
    this.setState({newUser : {name: name}});
  },

  render() {
    var users = this.state.users.users;
    if(users.length) {
      var _userItems = [];

      users.forEach(function (user, i) {
        _userItems.push(<UserItem key={i} user={users[i]} />);
      });

      return (
          <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">Users</h3>
              </div>
              <div className="list-group">
                {_userItems}
                <div className="list-group-item">
                  <form id="user-form" name="user-form" className="list-group-item" onSubmit={this.addUser}>
                    <input className="form-control" type="text" id="name" name="name" value={this.state.newUser.name} onChange={this.onInput} placeholder="Enter a name and press enter" />
                    <input type="submit" className="hidden"/>
                  </form>
                </div>
              </div>
            </div>
        );
    }else{
      return (<ProgressBar active now={100} label="Loading ... "/>)
    }
  },

  componentWillUnmount: function () {
    usersRef.off();
  }
});

export default MainForm;
