import actionTypes from '../../actions/types';

const initialState = {
    authError: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_ERROR:
            return {
                ...state,
                authError: 'Login failed'
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                authError: null
            }
        case actionTypes.SIGNOUT_SUCCESS:
            return state;
        case actionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                authError: null
            }
        case actionTypes.SIGNUP_ERROR:
            return {
                ...state,
                authError: action.err.message
            }
        default:
            return state;
    }
}

export default authReducer;