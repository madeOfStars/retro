import React, { Component } from 'react';
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

export default Dashboard;