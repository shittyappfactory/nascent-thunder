
import constants, { ACTIONS } from './constants';
import User from './User';

const initialState = {
	self: null,
	players: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
  	
  	case ACTIONS.INIT_SELF: {
  		return {
  			...state,
  			self: new User(action.username)
  		};
  	}

  	// recieved from Game
  	case ACTIONS.UPDATE_SELF: {
  		state.self.updateSelf(action.properties);
  		// action.properties will look something like this...
  		/* 
			location: { x, y, z : Numbers },
			yaw: Number,
			pitch: Number,
			walking: Boolean
  		*/
  	
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
