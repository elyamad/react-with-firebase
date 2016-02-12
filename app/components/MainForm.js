import React from 'react';
import Reflux from 'reflux';

import { Table } from 'react-bootstrap';

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
          users: UsersStore.getDefaultData()
      };
  },

  onUsersStoreUpdate(data) {
      this.setState(data.users);
  },

  componentDidMount() {
    Actions.watchUsers();
  },
  renderUsers(users) {
    var trs = users.map(function(user){
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.age}</td>
          <td>{user.phone}</td>
          <td>{user.address}</td>
        </tr>
      );
    });
    return trs;
  },
  render() {
    var users = this.state.users.users;
    if(users.length) {
      return (
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {this.renderUsers(users)}
          </tbody>
        </Table>
      );
    }else{
      return (<div>Please wait ... !</div>)
    }
  },

  componentWillUnmount: function () {
    usersRef.off();
  }
});

export default MainForm;
