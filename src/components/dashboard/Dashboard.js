import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import ModalCreateSprint from '../retro/ModalCreateRetroSession';
import ActiveRetros from './ActiveRetros';
import PastRetros from './PastRetros';
import { RETRO_STATUS } from '../../commons/Constants';

import { createNewRetroSession } from '../../store/actions/retro/retroActions';

class Dashboard extends Component {

    render() {
        const { auth, users, retros } = this.props;

        if (!auth.uid) {
            return <Redirect to="/signin" />;
        }

        console.log(this.props);

        const loggedUser = users !== undefined ? users[auth.uid] : null;

        return (
            <div>
                <ActiveRetros activeRetros={this.fetchRetrosByStatusAndUserTeam(retros, RETRO_STATUS.ONGOING, loggedUser)} />
                <PastRetros pastRetros={this.fetchRetrosByStatusAndUserTeam(retros, RETRO_STATUS.CLOSED, loggedUser)} />
                <ModalCreateSprint createNewRetroSession={this.props.createNewRetroSession} loggedUser={loggedUser} />
            </div>
        );
    }

    fetchRetrosByStatusAndUserTeam(retros, status, loggedUser) {
        if (retros && loggedUser) {
            return retros.filter((retro) => {
                return retro.value.status === status && retro.value.team === loggedUser.team;
            });
        }
        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        users: state.firebase.data.users,
        retros: state.firebase.ordered.retros
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
        { path: 'users' },
        { path: 'retros' }
    ])
)(Dashboard);