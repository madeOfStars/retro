import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import Container from '../Container'
import { addNewNote } from '../../../../store/actions/retro/retroActions';

class WhatHappened extends Component {

    constructor(props) {
        super(props);

        this.state = {
            noteId: 100,
            personalNotes: []
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
        const { phase, retroId } = this.props;
        this.deletePersonalNote(note);
        this.props.addNewNote(note, retroId, phase);
    }

    render() {
        const { phase, notes, retroId } = this.props;

        let finalNotes = [];

        if (notes !== undefined && notes !==null) {
            const notesByRetroId = notes[retroId];
            const notesByPhase = notesByRetroId['WHAT_HAPPENDED'];

            finalNotes = Object.entries(notesByPhase).map(entry => {
                return {
                    key: entry[0],
                    value: entry[1]
                };
            });
        }

        return (
            <Container
                phase={phase}
                header={"Add new note"}
                addNewPersonalNote={this.addNewPersonalNote}
                personalNotes={this.state.personalNotes}
                addNewNote={this.addNewWhatHappened}
                notes={finalNotes}
                deletePersonalNote={this.deletePersonalNote}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        notes: state.firebase.data.notes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewNote: (note, retroId, phase) => dispatch(addNewNote(note, retroId, phase))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firebaseConnect([
        { path: 'notes' }
    ]))(WhatHappened);