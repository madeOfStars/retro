import actionTypes from '../../actions/types';

const initialState = {
    teamError: null
};

const teamReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PUSH_TEAM.SUCCESS:
            return {
                ...state,
                teamError: null
            }
        case actionTypes.PUSH_TEAM.ERROR:
            return {
                ...state,
                authError: action.err.message
            }
        case actionTypes.REMOVE_TEAM.SUCCESS:
            return {
                ...state,
                teamError: null
            }
        case actionTypes.REMOVE_TEAM.ERROR:
            return {
                ...state,
                teamError: action.err.message
            }
        case actionTypes.ADD_USER_TO_TEAM.SUCCESS:
            return {
                ...state,
                teamError: null
            }
        case actionTypes.ADD_USER_TO_TEAM.ERROR:
            return {
                ...state,
                teamError: action.err.message
            }
        case actionTypes.REMOVE_USER_FROM_TEAM.SUCCESS:
            return {
                ...state,
                teamError: null
            }
        case actionTypes.REMOVE_USER_FROM_TEAM.ERROR:
            return {
                ...state,
                teamError: action.err.message
            }
        default:
            return state;
    }
}

export default teamReducer;