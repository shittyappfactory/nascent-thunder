import constants from './constants'
import Firebase from 'firebase';

export default function(uri) {
	const firebase = new Firebase(uri);
	debugger;
	return firebase;
}
