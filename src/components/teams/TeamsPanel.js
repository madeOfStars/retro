import React, { Component } from 'react';
import { Collection } from 'react-materialize';

class TeamsPanel extends Component {
    render() {
        return (
            <div className="col s6">
                <Collection header={this.props.header}>
                    {this.props.users}
                </Collection>
            </div>
        );
    }
}

export default TeamsPanel