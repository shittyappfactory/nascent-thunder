import constants from './constants';
import FirebaseConnection from './FirebaseConnection'

export default class User extends FirebaseConnection {
    
    constructor(username) {
        super();
        const usersRef = this.firebaseRootRef.child('users');
        this._makeUser(usersRef, username);
    }

    _makeUser(usersRef, username) {
        this.username = username;
        this.firebaseUserRef = usersRef.child(username);
    }

    // reducer will call this after reciveing UPDATE_SELF action
    updateSelf(properties) {
        this.firebaseUserRef.update(properties);
    }
}

