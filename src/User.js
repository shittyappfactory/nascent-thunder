import constants from './constants';

export default class User {

    constructor(firebaseUsersRef, username) {
        this.username = username;
        this.firebaseUserRef = firebaseUsersRef.child(username);
    }

    // reducer will call this after reciveing INIT_SELF action
    updateSelf(properties) {
        this.firebaseUserRef.update(properties);
    }
}
