import React, { Component } from 'react';
import { Card, Col } from 'react-materialize';
import DisplayCardComponent from './DisplayCardComponent';

class CardComponent extends Component {
    render() {
        let activeRetros = null;
        if (this.props.retros)
            activeRetros = this.props.retros.map((retro) => {
                return (
                    <Col key={retro.key} m={3} s={6}>
                        <Card key={retro.key} title={retro.value.name}
                            actions={[
                                this.props.action(retro)
                            ]}
                        >
                            {retro.value.startingDate + " - " + retro.value.endingDate}
                        </Card>
                    </Col>
                );
            });
        return <DisplayCardComponent
            retros={activeRetros}
            type={this.props.type}
        />
    }
}

export default CardComponent;