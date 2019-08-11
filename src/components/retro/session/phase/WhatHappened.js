import React, { Component } from 'react';
import Container from '../Container'

class WhatHappened extends Component {

    constructor(props) {
        super(props);

        this.state = {
            personalNotes: [],
            whatHappenedNotes: []
        }

        this.addNewPersonalNote = this.addNewPersonalNote.bind(this);
        this.deletePersonalNote = this.deletePersonalNote.bind(this);
        this.addNewWhatHappened = this.addNewWhatHappened.bind(this);

    }

    addNewPersonalNote(note) {
        this.setState(prevState => ({
            personalNotes: [...prevState.personalNotes, note]
        }));
    }

    deletePersonalNote(note) {
        const filteredPersonalNotes = this.state.personalNotes.filter(item => item !== note.text);
        this.setState({ personalNotes: filteredPersonalNotes });
    }

    addNewWhatHappened(note) {
        this.setState(prevState => ({
            whatHappenedNotes: [...prevState.whatHappenedNotes, note]
        }));
        this.deletePersonalNote(note);
    }

    render() {
        const { phase } = this.props;
        return (
            <Container
                phase={phase}
                header={"Add new note"}
                addNewPersonalNote={this.addNewPersonalNote}
                personalNotes={this.state.personalNotes}
                addNewNote={this.addNewWhatHappened}
                notes={this.state.whatHappenedNotes}
            />
        );
    }
}

export default WhatHappened;