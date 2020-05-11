import actionTypes from '../../types';
import { NO_TEAM } from '../../../commons/Constants';

export const addTeam = (newTeam) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.push('teams', { name: newTeam })
            .then(() => {
                dispatch({ type: actionTypes.PUSH_TEAM.SUCCESS });
            }).catch((err) => {
                dispatch({ type: actionTypes.PUSH_TEAM.ERROR, err });
            });
    }
}

export const deleteTeam = (key) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        let usersToBeDeleted = null;

        firebase.ref(`teams/${key}`)
            .once('value')
            .then(team => {
                usersToBeDeleted = team.val().users || [];
                usersToBeDeleted.forEach(user => {
                    firebase.update(`users/${user.key}`, { team: NO_TEAM });
                });

                firebase.ref(`teams/${NO_TEAM}`)
                    .once('value')
                    .then(team => {
                        let users = team.val().users || [];
                        usersToBeDeleted.forEach(user => {
                            users.push(user);
                        });
                        firebase.ref(`teams/${NO_TEAM}/users`).set(usersToBeDeleted);
                    });

                firebase.remove('teams/' + key)
                    .then(() => {
                        dispatch({ type: actionTypes.REMOVE_TEAM.SUCCESS });
                    })
            }).catch((err) => {
                dispatch({ type: actionTypes.REMOVE_TEAM.ERROR, err });
            });
    }
}

export const addUserToTeam = (user, teamKey, teamToLoseUser) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.ref(`teams/${teamKey}`)
            .once('value')
            .then(team => {
                let users = team.val().users || [];

                users.push({
                    key: user.key,
                    user: user.value.userName
                });

                firebase.ref(`teams/${teamKey}/users`).set(users);
            })
            .then(() => {
                const validUsers = teamToLoseUser.users.filter(userElement => {
                    return userElement.key !== user.key
                });

                firebase.ref(`teams/${user.value.team}/users`).set(validUsers);
            })
            .then(() => {
                firebase.update(`users/${user.key}`, { team: teamKey })
            })
            .then(() => {
                dispatch({ type: actionTypes.ADD_USER_TO_TEAM.SUCCESS });
            })
            .catch((err) => {
                dispatch({ type: actionTypes.ADD_USER_TO_TEAM.ERROR, err });
            });
    }
}

export const removeUserFromTeam = (user, teamKey, teamToLoseUser, noTeam) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        const validUsers = teamToLoseUser.users.filter(userElement => {
            return userElement.key !== user.key
        });

        firebase.ref(`teams/${teamKey}/users`).set(validUsers)
            .then(() => {
                if (!noTeam) {
                    firebase.ref(`teams/${NO_TEAM}`).set({ name: NO_TEAM, users: [] });
                }

                let users = (noTeam && noTeam.users) ? noTeam.users : [];
                users.push(user);
                firebase.ref(`teams/${NO_TEAM}/users`).set(users);
            })
            .then(() => {
                firebase.update(`users/${user.key}`, { team: NO_TEAM })
            })
            .then(() => {
                dispatch({ type: actionTypes.REMOVE_USER_FROM_TEAM.SUCCESS });
            })
            .catch((err) => {
                dispatch({ type: actionTypes.REMOVE_USER_FROM_TEAM.ERROR, err });
            });
    }
}