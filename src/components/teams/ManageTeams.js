import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Collection } from 'react-materialize';

import { addTeam, deleteTeam } from '../../store/actions/team/teamActions';
import { NO_TEAM } from '../../commons/Constants';

import ModalNewTeam from './ModalNewTeam';
import TeamCollectionItemWrapper from './TeamCollectionItemWrapper';
import withAuth from '../commons/hoc/withAuth';

class ManageTeams extends Component {

    constructor(props) {
        super(props);

        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    handleDeleteClick(e) {
        e.preventDefault();
        this.props.deleteTeam(e.target.id);
    }

    render() {
        const { teams } = this.props;
        let allTeams = null;

        if (teams) {
            const cleanedTeams = teams.filter((team) => {
                return team.key !== NO_TEAM;
            });
            allTeams = cleanedTeams.map(team => {
                return <TeamCollectionItemWrapper key={team.key} onDelete={this.handleDeleteClick} onEdit={this.handleEditClick} team={team} />
            });
        }

        return (
            <div>
                <ModalNewTeam addTeam={this.props.addTeam} />

                <div className="row">
                    <div className="col s8 offset-s2">
                        <Collection header='All Teams'>
                            {allTeams}
                        </Collection>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        teams: state.firebase.ordered.teams,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTeam: (newTeam) => dispatch(addTeam(newTeam)),
        deleteTeam: (key) => dispatch(deleteTeam(key))
    }
}

export default withAuth(compose(
    connect(mapStateToProps, mapDispatchToProps),
    firebaseConnect([{ path: 'teams' }])
)(ManageTeams));