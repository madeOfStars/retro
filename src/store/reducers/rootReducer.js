import { combineReducers } from 'redux';

import { firebaseReducer } from 'react-redux-firebase';

import authReducer from './auth/authReducer';
import teamReducer from './team/teamReducer';
import retroReducer from './retro/retroReducer';
import noteReducer from './retro/note/noteReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    firebase: firebaseReducer,
    team: teamReducer,
    retro: retroReducer,
    note: noteReducer
});

export default rootReducer;