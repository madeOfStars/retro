import actionTypes from '../../actions/types';

export const singIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(() => {
                dispatch({ type: actionTypes.LOGIN.SUCCESS, })
            }).catch((err) => {
                dispatch({ type: actionTypes.LOGIN.ERROR, err })
            });
    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: actionTypes.SIGNOUT_SUCCESS });
        });
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password).then((response) => {
            firebase.ref('users').child(response.user.uid).set({
                userName: newUser.userName,
                email: newUser.email,
                team: newUser.team
            }).then(() => {
                firebase.ref(`teams/${newUser.team}`)
                .once('value')
                .then((team) => {
                    let users = team.val().users || [];
                    users.push({
                        key: response.user.uid,
                        user: newUser.userName
                    });
                    
                    firebase.ref(`teams/${newUser.team}/users`).set(users);
                });                
            }).catch((err) => {
                console.log('ERROR');
                dispatch({ type: actionTypes.SIGNUP.ERROR, err });
            });
        }).then(() => {
            dispatch({ type: actionTypes.SIGNUP.SUCCESS });
        }).catch((err) => {
            dispatch({ type: actionTypes.SIGNUP.ERROR, err });
        });
    }
}