import Firebase from 'firebase';
import constants, { ACTIONS, PLAYER_DEFAULTS } from './constants';
import User from './User';

const storeInitialState = {
	self: null,
	players: {}
}

export default function(state = storeInitialState, action) {
	switch (action.type) {
		case ACTIONS.APP_INIT: return {
			...state,
			dispatch: action.dispatch,
		};

		case ACTIONS.INIT_SELF: {
			return {
				...state,
				self: {
					...PLAYER_DEFAULTS(),
					username: action.username,
				}
			};
		}

		// recieved from Game
		case ACTIONS.UPDATE_SELF: {
			return {
				...state,
				self: {
					...state.self,
					...action.properties,
				}
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
