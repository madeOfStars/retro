import React, { Component } from 'react';
import { Card, Col, Row, Button } from 'react-materialize';

import { RETRO_STATUS } from '../../commons/Constants'

class ActiveRetros extends Component {

    constructor(props) {
        super(props);
        this.sessionType = this.sessionType.bind(this);
    }

    sessionType() {
        const type = this.props.type;

        switch (type) {
            case RETRO_STATUS.OPEN.label:
                return this.createButtonBySession("Start Session");

            case RETRO_STATUS.ONGOING.label:
                return this.createButtonBySession("Join Session");

            default:
                return null;
        }
    }

    createButtonBySession(message) {
        return (
            <Button key='join' className='btn pink lighten-1 waves-effect waves-light'>
                {message}
            </Button>
        );
    }

    render() {
        let activeRetros = null;
        if (this.props.activeRetros)
            activeRetros = this.props.activeRetros.map((retro) => {
                return (
                    <Col key={retro.key} m={3} s={6}>
                        <Card key={retro.key} title={retro.value.name}
                            actions={[
                                <div key='actions' className="right-align">
                                    {this.sessionType()}
                                </div>
                            ]}
                        >
                            {retro.value.startingDate + " - " + retro.value.endingDate}
                        </Card>
                    </Col>
                );
            });

        return (
            <Row>
                {
                    (activeRetros && activeRetros.length > 0) ?
                        <h5>{this.props.type} retros</h5>
                        :
                        <h5>No {this.props.type} retros</h5>
                }
                {activeRetros}
            </Row>
        );
    }
}

export default ActiveRetros;