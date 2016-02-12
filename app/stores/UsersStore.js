import Reflux from 'reflux';

import Firebase from 'firebase';
import Actions from '../actions/Actions';
import { firebaseUrl } from '../utils/constants';

let baseRef = new Firebase(firebaseUrl);
let usersRef = baseRef.child('users');

let data = {
    users: []
};

var UsersStore = Reflux.createStore({

  listenables: Actions,

  init() {
  },

  watchUsers: function() {
    usersRef
        .orderByKey()
        .limitToLast(10)
        .on('value', this.updateUsers);
  },

  updateUsers(userDataObj){
    let endAt = 10;

    // add posts to new array
    let newUsers = [];

    userDataObj.forEach(userData => {
        let user = userData.val();
        user.id = userData.key();
        newUsers.unshift(user);
    });

    // slice off extra post
    data.users = newUsers.slice(0, endAt);

    this.trigger(data);
  },

  topWatchingUsers() {
      usersRef.off();
  },

  getDefaultData() {
      return data;
  }
});

export default UsersStore;
