import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

import { Collection, CollectionItem } from 'react-materialize';

import { addUserToTeam, removeUserFromTeam } from '../../store/actions/team/teamActions';
import { NO_TEAM } from '../../commons/Constants';
import withAuth from '../commons/hoc/withAuth';

class EditTeam extends Component {

    addUserToTeam(e, user) {
        e.preventDefault();
        const teamToLoseUser = this.props.teams[user.value.team];
        this.props.addUserToTeam(user, this.props.match.params.id, teamToLoseUser);
    }

    removeUserFromTeam(e, user) {
        e.preventDefault();
        const currentTeamKey = this.props.match.params.id;
        const teamToLoseUser = this.props.teams[currentTeamKey];
        const noTeam = this.props.teams[NO_TEAM];
        this.props.removeUserFromTeam(user, currentTeamKey, teamToLoseUser, noTeam);
    }

    render() {
        const { team } = this.props;
        let activeUsers = null;
        let inActiveUsers = null;

        if (team && team.users) {
            activeUsers = team.users.map(user => {
                return <CollectionItem key={user.key}>
                    <span className="title">{user.user}</span>
                    <a href="" onClick={(e) => this.removeUserFromTeam(e, user)} className="secondary-content">
                        <i id={user.key} className="material-icons pink-text lighten-1">clear</i>
                    </a>
                </CollectionItem>
            });
        }

        if (this.props.users) {
            inActiveUsers = this.props.users
                .filter(user => user.value.team !== this.props.match.params.id)
                .map(user => {
                    return <CollectionItem key={user.key}>
                        <span className="title">{user.value.userName}</span>
                        <a href="" onClick={(e) => this.addUserToTeam(e, user)} className="secondary-content">
                            <i id={user.key} className="material-icons pink-text lighten-1">add</i>
                        </a>
                    </CollectionItem>
                });
        }

        const header = (team && team.name) ? team.name : "";

        return (
            <div className="row">
                <div className="col s8 offset-s2">
                    <div className="col s6">
                        <Collection header={header}>
                            {activeUsers}
                        </Collection>
                    </div>
                    <div className="col s6">
                        <Collection header={"Not in " + header}>
                            {inActiveUsers}
                        </Collection>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {

    const id = ownProps.match.params.id;
    const teams = state.firebase.data.teams;
    const team = teams ? teams[id] : null;

    return {
        team,
        users: state.firebase.ordered.users,
        teams
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUserToTeam: (user, teamKey, teamToLoseUser) => dispatch(addUserToTeam(user, teamKey, teamToLoseUser)),
        removeUserFromTeam: (user, teamKey, teamToLoseUser, noTeam) => dispatch(removeUserFromTeam(user, teamKey, teamToLoseUser, noTeam))
    }
}

export default withAuth(compose(
    connect(mapStateToProps, mapDispatchToProps),
    firebaseConnect([
        { path: 'teams' },
        { path: 'users' }
    ])
)(EditTeam));