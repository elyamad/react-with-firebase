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

  watchUsers: function() {
    usersRef
    .orderByKey()
    .on('value', this.updateUsers);
  },

  updateUsers(userDataObj){
    // add users to new array
    let newUsers = [];

    userDataObj.forEach(userData => {
      let user = userData.val();
      user.id = userData.key();
      newUsers.unshift(user);

      // increment id for next addition
      this.autoIncrementId(user.id);
    });

    data.users = newUsers

    this.trigger(data);
  },

  stopWatchingUsers() {
    usersRef.off();
  },

  onRemoveUser(id){
    data.users.map(function(user, index){
      if(user.id === id){
        delete data.users[index];
      }
    });
    this.trigger(data);
  },

  onAddUser(user){
    user.id = this.getAutoIncrementedId();
    data.users.unshift(user);
    this.trigger(data);

    // auto increment user id
    this.autoIncrementId(user.id);
  },

  autoIncrementId(id){
    this.id_auto_inc += (id >= this.id_auto_inc) ? 1 : 0;
    return this.id_auto_inc;
  },

  getAutoIncrementedId(){
    return this.id_auto_inc;
  },

  getDefaultData() {
    return data;
  }
});

// static auto incremented id
UsersStore.id_auto_inc = 1;

export default UsersStore;
