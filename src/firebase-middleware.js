import Firebase from 'firebase';
import constants, { ACTIONS, PLAYER_DEFAULTS } from './constants';
import User from './User';

let self = null;
const players = {};

const firebaseRootRef = new Firebase(constants.FIREBASE_URI);
const firebaseUsersRef = firebaseRootRef.child('users');

let userUpdateHandler = () => {};
let userDeletedHandler = () => {};
const outerUserUpdateHandler = (s, isNewUser) => userUpdateHandler(s, isNewUser);
const outerUserDeletedHandler = s => userDeletedHandler(s);
firebaseUsersRef.on('child_added', (s) => outerUserUpdateHandler(s, true));
firebaseUsersRef.on('child_changed', (s) => outerUserUpdateHandler(s, false));
firebaseUsersRef.on('child_removed', outerUserDeletedHandler);

window.onbeforeunload = (e) => {
  const userRef = firebaseUsersRef.child(self.username);

  userRef.remove();
};

export default store => next => action => {
  switch (action.type) {
    case ACTIONS.INIT_SELF: {

      userUpdateHandler = (snapshot, isNewUser) => {
        const username = snapshot.key();
        const properties = snapshot.val();
        const { game } = store.getState();

        if (game.self && game.self.username !== username) {
          let payload = {
            type: ACTIONS.UPDATE_OTHER,
            player: { username, properties },
          }
          if (isNewUser) {
            payload.message = properties.color + "$" + username + " has entered the game";
          }
          store.dispatch(payload);
        }
      };

      userDeletedHandler = (snapshot) => {
        const username = snapshot.key();
        store.dispatch({
            type: ACTIONS.DELETE_OTHER,
            message: snapshot.val().color + "$" + username + " has left the game",
            username
        });
      };
      const color = ((u) => {
        // make color from first 42 bits of sha1(username)
        return '#' + require('sha1')(u).substring(0, 6);
      })(action.username)

      self = new User(firebaseUsersRef, action.username);
      self.updateSelf({
        ...PLAYER_DEFAULTS(),
        color
      });
      action.color = color;
      break;
    }

    case ACTIONS.UPDATE_SELF: {
        const prevState = store.getState().game.self;
        const newState = action.properties;

        self.updateSelf({
          ...prevState,
          ...newState
        });
        break;
    }

    default: break;

  }
  next(action);
}
