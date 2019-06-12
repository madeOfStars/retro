import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

import { CollectionItem } from 'react-materialize';

import { addUserToTeam, removeUserFromTeam } from '../../store/actions/team/teamActions';
import { NO_TEAM } from '../../commons/Constants';
import withAuth from '../commons/hoc/withAuth';
import TeamsPanel from './TeamsPanel';
import UserElementComponent from './UserElementComponent';

class EditTeam extends Component {

    constructor(props) {
        super(props);

        this.addUserToTeam = this.addUserToTeam.bind(this);
        this.removeUserFromTeam = this.removeUserFromTeam.bind(this);
    }

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
                return <UserElementComponent
                    user={user}
                    title={user.user}
                    action={this.removeUserFromTeam}
                    button={"clear"}
                />
            });
        }

        if (this.props.users) {
            inActiveUsers = this.props.users
                .filter(user => user.value.team !== this.props.match.params.id)
                .map(user => {
                    return <UserElementComponent
                        user={user}
                        title={user.value.userName}
                        action={this.addUserToTeam}
                        button={"add"}
                    />
                });
        }

        const header = (team && team.name) ? team.name : "";

        return (
            <div className="row">
                <div className="col s8 offset-s2">
                    <TeamsPanel header={header} users={activeUsers} />
                    <TeamsPanel header={"Not in " + header} users={inActiveUsers} />
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