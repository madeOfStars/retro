import React, { Component } from 'react';
import { Button } from 'react-materialize';
import { withRouter } from 'react-router-dom';

import { RETRO_STATUS } from '../../commons/Constants'
import CardComponent from './CardComponent';

class ActiveRetros extends Component {

    constructor(props) {
        super(props);

        this.sessionType = this.sessionType.bind(this);
        this.createAction = this.createAction.bind(this);
    }

    sessionType(retro) {
        const type = this.props.type;

        switch (type) {
            case RETRO_STATUS.OPEN.label:
                return this.createButtonBySession("Start Session", retro);

            case RETRO_STATUS.ONGOING.label:
                return this.createButtonBySession("Join Session", retro);

            default:
                return null;
        }
    }

    createButtonBySession(message, retro) {
        return (
            <Button key='join' onClick={() => this.goToRetroSession(retro)} className='btn pink lighten-1 waves-effect waves-light'>
                {message}
            </Button>
        );
    }

    goToRetroSession(retro) {
        this.props.history.push(`/retro/${retro.key}`);
    }

    createAction(retro) {
        return (
            <div key='actions' className="right-align">
                {this.sessionType(retro)}
            </div>
        );
    }

    render() {
        return <CardComponent
            retros={this.props.activeRetros}
            action={this.createAction}
            type={this.props.type}
        />
    }
}

export default withRouter(ActiveRetros);