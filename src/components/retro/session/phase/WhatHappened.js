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
            personalNotes: []
        }

        this.addNewPersonalNote = this.addNewPersonalNote.bind(this);
        this.deletePersonalNote = this.deletePersonalNote.bind(this);
        this.addNewWhatHappened = this.addNewWhatHappened.bind(this);
        this.editPersonalNote = this.editPersonalNote.bind(this);

    }

    addNewPersonalNote(note) {
        var newNote = {
            id: Date.now(),
            text: note
        }
        this.setState(prevState => ({
            personalNotes: [...prevState.personalNotes, newNote]
        }));
    }

    deletePersonalNote(note) {
        const filteredPersonalNotes = this.state.personalNotes.filter(item =>
            item.id !== note.id);
        this.setState({ personalNotes: filteredPersonalNotes });
    }

    editPersonalNote(note) {
        this.setState({
            personalNotes: this.state.personalNotes.map(el => (el.id === note.id ? { ...el, text: note.text } : el))
        });
    }

    addNewWhatHappened(note) {
        const { phase, retroId } = this.props;
        this.deletePersonalNote(note.note);
        this.props.addNewNote({
            text: note.note.text,
            positionStyle: note.positionStyle
        }, retroId, phase);
    }

    render() {
        const { phase, notes, retroId } = this.props;

        let finalNotes = [];

        if (notes !== undefined && notes !== null) {
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
                editPersonalNote={this.editPersonalNote}
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