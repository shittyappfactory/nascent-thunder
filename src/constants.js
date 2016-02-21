export default {
	FIREBASE_URI: 'https://ss16-nascent-thunder.firebaseio.com',
	FIREBASE_REFRESH_INTERVAL: 30, // ms
}

export const ACTIONS = {
	APP_INIT: 'APP_INIT',
	INIT_SELF: 'INIT_SELF',
	UPDATE_SELF: 'UPDATE_SELF',
	UPDATE_OTHER: 'UPDATE_OTHER',
    DELETE_OTHER: 'DELETE_OTHER'
}

export const PLAYER_DEFAULTS = () => ({
	isWalking: false,
	location: {
		x: 0,
		y: 0,
		z: 0
	},
	pitch: 0,
	yaw: 0,
	velocity: 0
});
