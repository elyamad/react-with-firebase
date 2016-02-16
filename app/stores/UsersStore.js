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

    // add users to new array
    let newUsers = [];

    userDataObj.forEach(userData => {
      let user = userData.val();
      user.id = userData.key();
      newUsers.unshift(user);

      // increment id for next addition
      this.autoIncrementId(user.id);
    });

    // slice off extra user
    data.users = newUsers.slice(0, endAt);

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

// static id auto incremented
UsersStore.id_auto_inc = 1;

export default UsersStore;
