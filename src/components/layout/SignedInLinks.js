import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/auth/authActions'

const SignedInLinks = (props) => {
    return (
        <ul className="right">
            <li><NavLink to="/teams">Manage Teams</NavLink></li>
            <li><a onClick={props.signOut}>Log Out</a></li>
            <li><NavLink to="/" className="btn btn-floating pink lighten-1">
                {props.profile.userName && props.profile.userName[0]}
            </NavLink></li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);