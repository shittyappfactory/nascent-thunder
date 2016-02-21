import constants, { ACTIONS, PLAYER_DEFAULTS } from './constants';
import User from './User';

const storeInitialState = {
    self: null,
    players: {},
    messages: []
}

// ok, this reducer gets called AFTER the FirebaseMiddleware
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
                    username: action.username,
                    color: ((u) => {
                        // make color from first 42 bits of sha1(username)
                        return '#' + require('sha1')(u).substring(0, 7);
                    })(action.username)
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
            let messages;
            if (action.message) {
                messages = [...state.messages].slice(-4).concat(action.message);
            } else {
                if (action.player && !state.players[action.player.username]) {
                    messages = [...state.messages].slice(-4).concat(action.player.username + " is in the game");
                } else {
                    messages = state.messages;
                }
            }
            return {
                ...state,
                players: {
                    ...state.players,
                    [action.player.username]: action.player.properties
                },
                messages
            }
        }

        case ACTIONS.DELETE_OTHER: {
            const filteredPlayers = Object.keys(state.players).reduce((acc, key) => {
                if (key !== action.username) {
                    acc[key] = state.players[key];
                }
                return acc;
            }, {});

            return {
                ...state,
                players: filteredPlayers
            }
        }
    }

    return state;
}
