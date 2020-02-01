const actionTypes = {
    LOGIN: {
        SUCCESS: 'LOGIN_SUCCESS',
        ERROR: 'LOGIN_ERROR'
    },
    SIGNOUT_SUCCESS: 'SIGNOUT_SUCCESS',
    SIGNUP: {
        SUCCESS: 'SIGNUP_SUCCESS',
        ERROR: 'SIGNUP_ERROR'
    },
    GET_ALL_TEAMS: {
        SUCCESS: 'GET_ALL_TEAMS_SUCCESS',
        ERROR: 'GET_ALL_TEAMS_ERROR'
    },
    PUSH_TEAM: {
        SUCCESS: 'PUSH_TEAM_SUCCESS',
        ERROR: 'PUSH_TEAM_ERROR'
    },
    REMOVE_TEAM: {
        SUCCESS: 'REMOVE_TEAM_SUCCESS',
        ERROR: 'REMOVE_TEAM_ERROR'
    },
    ADD_USER_TO_TEAM: {
        SUCCESS: 'ADD_USER_TO_TEAM_SUCCESS',
        ERROR: 'ADD_USER_TO_TEAM_ERROR'
    },
    REMOVE_USER_FROM_TEAM: {
        SUCCESS: 'REMOVE_USER_FROM_TEAM_SUCCESS',
        ERROR: 'REMOVE_USER_FROM_TEAM_ERROR'
    },
    CREATE_NEW_RETRO_SESSION: {
        SUCCESS: 'CREATE_NEW_RETRO_SESSION_SUCCESS',
        ERROR: 'CREATE_NEW_RETRO_SESSION_ERROR'
    },
    DELETE_RETRO: {
        SUCCESS: 'DELETE_RETRO_SUCCESS',
        ERROR: 'DELETE_RETRO_ERROR'
    },
    ADD_NEW_NOTE: {
        SUCCESS: 'ADD_NEW_NOTE_SUCCESS',
        ERROR: 'ADD_NEW_NOTE_ERROR'
    },
    UPDATE_NOTE_POSITION: {
        SUCCESS: 'UPDATE_NOTE_POSITION_SUCCESS',
        ERROR: 'UPDATE_NOTE_POSITION_ERROR'
    },
    INCREMENT_NOTE_COUNT: {
        SUCCESS: 'INCREMENT_NOTE_COUNT_SUCCESS',
        ERROR: 'INCREMENT_NOTE_COUNT_ERROR'
    },
    DECREMENT_NOTE_COUNT: {
        SUCCESS: 'DECREMENT_NOTE_COUNT_NOTE_COUNT_SUCCESS',
        ERROR: 'DECREMENT_NOTE_COUNT_NOTE_COUNT_ERROR'
    }
}

export default actionTypes;