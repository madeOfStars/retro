import React, { Component } from 'react';
import { Card, Col, Row, Button } from 'react-materialize';

class ActiveRetros extends Component {

    render() {
        let activeRetros = null;
        if (this.props.activeRetros)
            activeRetros = this.props.activeRetros.map((retro) => {
                return (
                    <Col key={retro.key} m={3} s={6}>
                        <Card key={retro.key} title={retro.value.name}
                            actions={[
                                <div key='actions' className="right-align">
                                    <Button key='join' className='btn pink lighten-1 waves-effect waves-light'>
                                        Join Session
                                    </Button>
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