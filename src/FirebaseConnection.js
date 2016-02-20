import constants from './constants';
import Firebase from 'firebase';

export default class FirebaseConnection {
	constructor() {
		// create the Firebase root reference
		this.firebaseRootRef = new Firebase(constants.FIREBASE_URI);
	}
}