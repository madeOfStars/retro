import { combineReducers } from 'redux';

import authReducer from './auth/authReducer';
import teamReducer from './team/teamReducer';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth: authReducer,
    firebase: firebaseReducer,
    team: teamReducer
});

export default rootReducer;