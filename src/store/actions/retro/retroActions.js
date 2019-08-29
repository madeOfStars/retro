import actionTypes from '../../types';

export const createNewRetroSession = (retroSession) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.push('retros', retroSession)
            .then(() => {
                dispatch({ type: actionTypes.CREATE_NEW_RETRO_SESSION.SUCCESS });
            }).catch((err) => {
                dispatch({ type: actionTypes.CREATE_NEW_RETRO_SESSION.ERROR, err });
            });
    }
}

export const deleteRetro = (retroId) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.remove(`retros/${retroId}`)
            .then(() => {
                dispatch({ type: actionTypes.DELETE_RETRO.SUCCESS });
            }).catch((err) => {
                dispatch({ type: actionTypes.DELETE_RETRO.ERROR, err });
            })
    }
}

export const addNewNote = (note, retroId, phase) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.push(`notes/${retroId}/${phase.identifier}`, note)
            .then(() => {
                dispatch({ type: actionTypes.ADD_NEW_NOTE.SUCCESS, note });
            }).catch((err) => {
                dispatch({ type: actionTypes.ADD_NEW_NOTE.ERROR, err });
            })
    }
}