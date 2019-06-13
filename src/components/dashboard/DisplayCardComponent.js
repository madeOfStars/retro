import React, { Component } from 'react';
import { Row } from 'react-materialize';

class DisplayCardComponent extends Component {
    render() {
        const { retros, type } = this.props;
        return (
            <Row>
                {
                    (retros && retros.length > 0) ?
                        <h5>{type} retros</h5>
                        :
                        <h5>No {type} retros</h5>
                }
                {retros}
            </Row>
        );
    }
}

export default DisplayCardComponent;