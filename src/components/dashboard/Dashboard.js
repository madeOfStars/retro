import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalCreateSprint from '../sprints/ModalCreateSprint';

class Dashboard extends Component {
    render() {
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