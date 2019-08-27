import actionTypes from '../../types';

const initialState = {
    retroError: null
};

const retroReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_NEW_RETRO_SESSION.SUCCESS:
            return {
                ...state,
                retroError: null
            }
        case actionTypes.CREATE_NEW_RETRO_SESSION.ERROR:
            return {
                ...state,
                retroError: action.err.message
            }
        case actionTypes.DELETE_RETRO.SUCCESS:
            return {
                ...state,
                retroError: null
            }
        case actionTypes.DELETE_RETRO.ERROR:
            return {
                ...state,
                retroError: action.err.message
            }
        case actionTypes.ADD_NEW_NOTE.SUCCESS:
            return {
                ...state,
                retroError: null
            }
        case actionTypes.ADD_NEW_NOTE.ERROR:
            return {
                ...state,
                retroError: action.err.message
            }
        default:
            return state;
    }
}

export default retroReducer;