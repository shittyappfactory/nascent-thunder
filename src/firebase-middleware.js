import Firebase from 'firebase';
import constants, { ACTIONS, PLAYER_DEFAULTS } from './constants';
import User from './User';

let self = null;
const players = {};

const firebaseRootRef = new Firebase(constants.FIREBASE_URI);
const firebaseUsersRef = firebaseRootRef.child('users');

let userUpdateHandler = () => {};
const outerUserUpdateHandler = s => userUpdateHandler(s);
firebaseUsersRef.on('child_added', outerUserUpdateHandler);
firebaseUsersRef.on('child_changed', outerUserUpdateHandler);

export default store => next => action => {
  console.log('action!!', action.type)
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
