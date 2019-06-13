import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import ModalCreateSprint from '../retro/ModalCreateRetroSession';
import ActiveRetros from './ActiveRetros';
import PastRetros from './PastRetros';
import { RETRO_STATUS } from '../../commons/Constants';
import { createNewRetroSession } from '../../store/actions/retro/retroActions';
import withAuth from '../commons/hoc/withAuth';

class Dashboard extends Component {

    canCreateNewSession(openRetros, ongoingRetros) {
        if ((openRetros && openRetros.length > 0) || (ongoingRetros && ongoingRetros.length > 0)) {
            return false;
        }
        return true;
    }

    render() {
        const { auth, users, retros } = this.props;

        const loggedUser = users !== undefined ? users[auth.uid] : null;

        const openRetros = this.fetchRetrosByStatusAndUserTeam(retros, RETRO_STATUS.OPEN.status, loggedUser);
        const ongoingRetros = this.fetchRetrosByStatusAndUserTeam(retros, RETRO_STATUS.ONGOING.status, loggedUser);
        const allowCreationOfNewSession = this.canCreateNewSession(openRetros, ongoingRetros);

        return (
            <div>
                <ActiveRetros activeRetros={openRetros} type={RETRO_STATUS.OPEN.label} />
                <ActiveRetros activeRetros={ongoingRetros} type={RETRO_STATUS.ONGOING.label} />
                <PastRetros pastRetros={this.fetchRetrosByStatusAndUserTeam(retros, RETRO_STATUS.CLOSED.status, loggedUser)} type={RETRO_STATUS.CLOSED.label} />
                <ModalCreateSprint createNewRetroSession={this.props.createNewRetroSession} loggedUser={loggedUser} allowCreationOfNewSession={allowCreationOfNewSession} />
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
        users: state.firebase.data.users,
        retros: state.firebase.ordered.retros
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createNewRetroSession: (retroSession) => dispatch(createNewRetroSession(retroSession))
    }
}

export default withAuth(compose(
    connect(mapStateToProps, mapDispatchToProps),
    firebaseConnect([
        { path: 'users' },
        { path: 'retros' }
    ])
)(Dashboard));