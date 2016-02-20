
import constants, { ACTIONS, PLAYER_DEFAULTS } from './constants';
import User from './User';

const storeInitialState = {
	self: null,
	players: {}
}

export default function(state = storeInitialState, action) {
  switch (action.type) {
  	
  	case ACTIONS.APP_INIT: break;
  	
  	case ACTIONS.INIT_SELF: {
  		const self = new User(action.username)
  		self.updateSelf(PLAYER_DEFAULTS);

  		return {
  			...state,
  			self
  		};
  	}

  	// recieved from Game
  	case ACTIONS.UPDATE_SELF: {
  		state.self.updateSelf(action.properties);
  		return {
  			...state,
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
