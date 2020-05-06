import actionTypes from '../../types';

export const addNewConclusionItem = (retroId, conclusionItem) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.push('conclusions', { conclusionItem, retroId })
            .then(() => {
                dispatch({ type: actionTypes.ADD_NEW_CONCLUSION_ITEM.SUCCESS });
            }).catch((err) => {
                dispatch({ type: actionTypes.ADD_NEW_CONCLUSION_ITEM.ERROR, err });
            });
    }
}

export const deleteConclusionItem = (conclusionItem) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.remove(`conclusions/${conclusionItem.id}`)
            .then(() => {
                dispatch({ type: actionTypes.DELETE_CONCLUSIION_ITEM.SUCCESS });
            }).catch((err) => {
                dispatch({ type: actionTypes.DELETE_CONCLUSIION_ITEM.ERROR, err });
            });
    }
}

export const editConclusionItem = (conclusionItem) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.update(`conclusions/${conclusionItem.id}`, { conclusionItem: conclusionItem.text })
            .then(() => {
                dispatch({ type: actionTypes.EDIT_CONCLUSION_ITEM.SUCCESS });
            }).catch((err) => {
                dispatch({ type: actionTypes.EDIT_CONCLUSION_ITEM.ERROR, err });
            })
    }
}