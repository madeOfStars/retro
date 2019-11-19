import React, { Component } from 'react';
import Container from '../Container'

class PositivesNegatives extends Component {
    render() {
        const { phase, notes, retroId } = this.props;

        return (
            <Container
                phase={phase}
                header={"Add new note"}
                personalNotes={[]}
                notes={[]}
            />
        );
    }
}

export default PositivesNegatives;