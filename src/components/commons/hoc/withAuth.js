import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SecureAuth from '../SecureAuth';

const withAuth = WrappedComponent => {
    class WithAuth extends Component {
        verifyAuth = () => {
            return !SecureAuth.isAuthorized(this.props.auth)
        }

        render() {
            if (this.verifyAuth())
                return <Redirect to="/signin" />;

            return <WrappedComponent
                auth={this.props.auth}
                verifyAuth={this.verifyAuth}
                {...this.props}
            />
        }
    }
    return connect(mapStateToProps, null)(WithAuth);
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default withAuth;