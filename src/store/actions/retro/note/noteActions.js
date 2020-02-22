import actionTypes from '../../../types';
import { RETRO_PHASE } from '../../../../commons/Constants';

export const incrementNoteCount = (retroId, noteId) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.ref('notes')
            .child(retroId)
            .child(RETRO_PHASE.CLUSTERING.identifier)
            .child(noteId)
            .child('count')
            .transaction((count) => {
                return (count || 0) + 1
            })
            .then(() => {
                dispatch({ type: actionTypes.INCREMENT_NOTE_COUNT.SUCCESS });
            }).catch((err) => {
                dispatch({ type: actionTypes.INCREMENT_NOTE_COUNT.ERROR, err });
            })
    }
}

export const decrementNoteCount = (retroId, noteId) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.ref('notes')
            .child(retroId)
            .child(RETRO_PHASE.CLUSTERING.identifier)
            .child(noteId)
            .child('count')
            .transaction((count) => {
                if (count && count > 0) {
                    return count - 1;
                }
                return 0;
            })
            .then(() => {
                dispatch({ type: actionTypes.DECREMENT_NOTE_COUNT.SUCCESS });
            }).catch((err) => {
                dispatch({ type: actionTypes.DECREMENT_NOTE_COUNT.ERROR, err });
            })
    }
}