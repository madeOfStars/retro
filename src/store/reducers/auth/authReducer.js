import actionTypes from '../../types';

const initialState = {
    authError: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN.ERROR:
            return {
                ...state,
                authError: 'Login failed'
            }
        case actionTypes.LOGIN.SUCCESS:
            return {
                ...state,
                authError: null
            }
        case actionTypes.SIGNOUT_SUCCESS:
            return state;
        case actionTypes.SIGNUP.SUCCESS:
            return {
                ...state,
                authError: null
            }
        case actionTypes.SIGNUP.ERROR:
            return {
                ...state,
                authError: action.err.message
            }
        default:
            return state;
    }
}

export default authReducer;