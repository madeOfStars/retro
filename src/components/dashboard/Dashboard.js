import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import ModalCreateSprint from '../retro/ModalCreateRetroSession';

import { createNewRetroSession } from '../../store/actions/retro/retroActions';

class Dashboard extends Component {
    render() {
        const { auth, users } = this.props;

        if (!auth.uid) {
            return <Redirect to="/signin" />;
        }

        const loggedUser = users !== undefined ? users[auth.uid] : null;

        return (
            <div>
                <ModalCreateSprint createNewRetroSession={this.props.createNewRetroSession} loggedUser={loggedUser} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        users: state.firebase.data.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createNewRetroSession: (retroSession) => dispatch(createNewRetroSession(retroSession))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firebaseConnect([
        { path: 'users' }
    ])
)(Dashboard);