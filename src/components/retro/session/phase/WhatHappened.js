import React, { Component } from 'react';
import Container from '../Container'

class WhatHappened extends Component {

    constructor(props) {
        super(props);

        this.state = {
            personalNotes: []
        }

        this.addNewPersonalNote = this.addNewPersonalNote.bind(this);
    }

    addNewPersonalNote(note) {
        this.setState(prevState => ({
            personalNotes: [...prevState.personalNotes, note]
        }));
    }

    render() {
        const { phase } = this.props;
        return (
            <Container
                phase={phase}
                header={"Add new note"}
                addNewPersonalNote={this.addNewPersonalNote}
            />
        );
    }
}

export default WhatHappened;