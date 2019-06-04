import React, { Component } from 'react';
import { Input, Button } from 'react-materialize';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import { signUp } from '../../store/actions/auth/authActions';
import { NO_TEAM } from '../../commons/Constants';

class SignUp extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            userName: '',
            team: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.signUp(this.state);
    }

    render() {
        const { authError, teams, auth } = this.props;
        let teamOptions = null;

        if (teams) {
            if (teams[0].key !== 'selectTeam') {
                teams.unshift({
                    key: 'selectTeam',
                    value: { name: 'Select Team' }
                });
            }
            const cleanedTeams = teams.filter((team) => {
                return team.key !== NO_TEAM;
            });
            teamOptions = cleanedTeams.map((team) => {
                return <option key={team.key} value={team.key}>{team.value.name}</option>
            });
        }

        if (auth.uid) {
            return <Redirect to="/dashboard" />;
        }

        return (
            <div className="row">
                <div className="col s4 offset-s4">
                    <form onSubmit={this.handleSubmit}>
                        <h5 className="grey-text text-darken-3">Sign Up</h5>
                        <Input name='userName' s={12} label="Username" validate onChange={this.handleChange} />
                        <Input name='email' s={12} type='email' label="E-Mail" validate onChange={this.handleChange} />
                        <Input name='password' type='password' s={12} label="Password" onChange={this.handleChange} />
                        <Input name='team' type='select' s={12} label="Team" onChange={this.handleChange}>
                            {teamOptions}
                        </Input>
                        <Button className="btn pink lighten-1 z-depth-0">Sign Up</Button>
                        <div className="red-text center">
                            {authError ? <p>{authError}</p> : null}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        teams: state.firebase.ordered.teams,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), firebaseConnect([{ path: 'teams' }]))(SignUp);