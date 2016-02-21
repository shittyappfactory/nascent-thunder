import Firebase from 'firebase';
import constants, { ACTIONS, PLAYER_DEFAULTS } from './constants';
import User from './User';

let self = null;
const players = {};

const firebaseRootRef = new Firebase(constants.FIREBASE_URI);
const firebaseUsersRef = firebaseRootRef.child('users');

let userUpdateHandler = () => {};
let userDeletedHandler = () => {};
const outerUserUpdateHandler = s => userUpdateHandler(s);
const outerUserDeletedHandler = s => userDeletedHandler(s);
firebaseUsersRef.on('child_added', outerUserUpdateHandler);
firebaseUsersRef.on('child_changed', outerUserUpdateHandler);
firebaseUsersRef.on('child_removed', outerUserDeletedHandler);

window.onbeforeunload = (e) => {
  const userRef = firebaseUsersRef.child(self.username);

  userRef.remove();
};

export default store => next => action => {
  switch (action.type) {
    case ACTIONS.INIT_SELF: {

      userUpdateHandler = (snapshot) => {
        const username = snapshot.key();
        const properties = snapshot.val();
        const { game } = store.getState();
        
        if (game.self && game.self.username !== username) {
          store.dispatch({
            type: ACTIONS.UPDATE_OTHER,
            player: { username, properties },
          });
        }
      };

      userDeletedHandler = (snapshot) => {
        const username = snapshot.key();
        store.dispatch({
            type: ACTIONS.DELETE_OTHER,
            username
        });
      };

      self = new User(firebaseUsersRef, action.username);
      self.updateSelf(PLAYER_DEFAULTS);
      break;
    }

    case ACTIONS.UPDATE_SELF: {
            self.updateSelf(action.properties);
      break;
    }

    default: break;

  }
  next(action);
}
