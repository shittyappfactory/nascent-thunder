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
        this.firebaseUserRef.set({
            status: constants.PLAYER_STATES.ALIVE,
            location: {
                x: 0,
                y: 0,
                z: 0,
            }
        })
    }

    // reducer will call this after reciveing UPDATE_LOCATION action
    set location(location) {
        this.location = location;
        this.firebaseUserRef.update({
            location
        });
    }

    set status(status) {
        this.status = status;
        this.firebaseUserRef.update({
            status
        })
    }
}

