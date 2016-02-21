import Firebase from 'firebase';
import constants, { ACTIONS, PLAYER_DEFAULTS } from './constants';
import User from './User';

const storeInitialState = {
	self: null,
	players: {}
}

export default function(state = storeInitialState, action) {
  switch (action.type) {
  	
  	case ACTIONS.APP_INIT: {
  		const firebaseRootRef = new Firebase(constants.FIREBASE_URI);
  		const firebaseUsersRef = firebaseRootRef.child('users');
  		
  		
  		const userUpdateHandler = (snapshot) => {
  			const username = snapshot.key();
  			const properties = snapshot.val();

  			if (state.self !== null && state.self.username !== username) {
  				action.dispatch({
					type: ACTIONS.UPDATE_OTHER,
					player: { username, properties }
				});
  			}
  		};

		// bind handlers for new user events
		firebaseUsersRef.on('child_added', userUpdateHandler);
  		firebaseUsersRef.on('child_changed', userUpdateHandler);
  		
  		return {
  			...state,
  			firebaseRootRef,
  			firebaseUsersRef
  		}
  	}

  	case ACTIONS.INIT_SELF: {
  		const self = new User(firebaseUsersRef, action.username);
  		self.updateSelf(PLAYER_DEFAULTS);

  		return {
  			...state,
  			self
  		}
  	}

  	// recieved from Game
  	case ACTIONS.UPDATE_SELF: {
  		state.self.updateSelf(action.properties);
  		return {
  			...state
  		}
  	}

  	// recieved from Firebase 
  	case ACTIONS.UPDATE_OTHER: {
		return {
			...state,
			players: { 
				...state.players, 
				[action.player.username]: action.player.properties
			}
	  	}
	}
  }

  return state;
}
