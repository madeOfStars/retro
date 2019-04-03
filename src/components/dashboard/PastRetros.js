import React, { Component } from 'react';
import { Card, Col, Row, Button } from 'react-materialize';

class PastRetros extends Component {
    render() {
        let pastRetros = null;
        if (this.props.pastRetros) {
            pastRetros = this.props.pastRetros.map((retro) => {
                return (
                    <Col key={retro.key} m={3} s={6}>
                        <Card key={retro.key} title={retro.value.name}
                            actions={[
                                <div key='actions'>
                                    <Button key='show' className='btn pink lighten-1 waves-effect waves-light' style={{ marginRight: 5 }}>
                                        Show
                                    </Button>
                                    <Button key='delete' className='btn pink lighten-1 waves-effect waves-light'>
                                        Delete
                                    </Button>
                                </div>
                            ]}
                        >
                            {retro.value.startingDate + " - " + retro.value.endingDate}
                        </Card>
                    </Col>
                );
            });
        }
        return (
            <Row>
                {
                    (pastRetros && pastRetros.length > 0) ?
                    <h5>Past retros</h5>
                    :
                    <h5>No past retro</h5>
                }
                {pastRetros}
            </Row>
        );
    }
}

export default PastRetros