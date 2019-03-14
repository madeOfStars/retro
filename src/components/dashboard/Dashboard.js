import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import ModalCreateSprint from '../retros/ModalCreateRetroSession';

class Dashboard extends Component {
    render() {
        const { auth, users } = this.props;

        if (!auth.uid) {
            return <Redirect to="/signin" />;
        }

        const loggedUser = users!==undefined ? users[auth.uid] : null;
        console.log(loggedUser);

        return (
            <div>
                <ModalCreateSprint />
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

export default compose(
    connect(mapStateToProps, null),
    firebaseConnect([
        {path: 'users'}
    ])
)(Dashboard);