import actionTypes from '../../types';

const initialState = {
    conclusionError: null
};

const conclusionReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_NEW_CONCLUSION_ITEM.SUCCESS:
            return {
                ...state,
                conclusionError: null
            }
        case actionTypes.ADD_NEW_CONCLUSION_ITEM.ERROR:
            return {
                ...state,
                conclusionError: action.err.message
            }
        case actionTypes.DELETE_CONCLUSIION_ITEM.SUCCESS:
            return {
                ...state,
                conclusionError: null
            }
        case actionTypes.DELETE_CONCLUSIION_ITEM.ERROR:
            return {
                ...state,
                conclusionError: action.err.message
            }
        case actionTypes.EDIT_CONCLUSION_ITEM.SUCCESS:
            return {
                ...state,
                conclusionError: null
            }
        case actionTypes.EDIT_CONCLUSION_ITEM.ERROR:
            return {
                ...state,
                conclusionError: action.err.message
            }
        default:
            return state;
    }
}

export default conclusionReducer;