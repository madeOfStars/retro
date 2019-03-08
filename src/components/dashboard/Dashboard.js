import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ModalCreateSprint from '../retros/ModalCreateRetroSession';

class Dashboard extends Component {
    render() {
        const { auth } = this.props;

        if (!auth.uid) {
            return <Redirect to="/signin" />;
        }

        return (
            <div>
                <ModalCreateSprint />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, null)(Dashboard);