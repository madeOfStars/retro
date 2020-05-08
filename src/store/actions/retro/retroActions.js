import actionTypes from '../../types';
import { RETRO_PHASE, RETRO_STATUS } from '../../../commons/Constants';


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

export const updateNotePosition = (retroId, noteId, positionStyle) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.update(`notes/${retroId}/${RETRO_PHASE.POSITIVES_AND_NEGATIVES.identifier}/${noteId}`, { positionStyle })
            .then(() => {
                dispatch({ type: actionTypes.UPDATE_NOTE_POSITION.SUCCESS });
            })
            .catch((err) => {
                dispatch({ type: actionTypes.UPDATE_NOTE_POSITION.ERROR, err });
            });
    }
}

export const updateRetroSession = (retroId, retroStatus) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.update(`retros/${retroId}`, { status: retroStatus.status })
            .then(() => {
                dispatch({ type: actionTypes.CLOSE_RETRO_SESSION.SUCCESS });
            })
            .catch((err) => {
                dispatch({ type: actionTypes.CLOSE_RETRO_SESSION.ERROR, err });
            });
    }
}