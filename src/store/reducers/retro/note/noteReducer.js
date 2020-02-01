import actionTypes from '../../../types';

const initialState = {
    noteError: null
};

const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INCREMENT_NOTE_COUNT.SUCCESS:
            return {
                ...state,
                noteError: null
            }
    
        case actionTypes.INCREMENT_NOTE_COUNT.ERROR:
            return {
                ...state,
                noteError: action.err.message
            }
        default:
            return state;
    }
}

export default noteReducer;