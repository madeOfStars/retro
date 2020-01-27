import React, { Component } from 'react';
import Container from '../Container'
import withPhaseHoc from '../../../commons/hoc/withPhaseHoc';
import Note from '../Note';

class WhatHappened extends Component {

    constructor(props) {
        super(props);

        this.addNewWhatHappened = this.addNewWhatHappened.bind(this);
    }

    addNewWhatHappened(note) {
        const { phase, retroId } = this.props;
        this.props.deletePersonalNote(note.note);
        this.props.addNewNote({
            text: note.note.text,
            positionStyle: note.positionStyle
        }, retroId, phase);
    }

    render() {
        const { phase, notes, retroId } = this.props;

        let finalNotes = [];

        if (notes !== undefined && notes !== null) {
            let tmpFinalNotes = [];
            const notesByRetroId = notes[retroId];
            const notesByPhase = notesByRetroId['WHAT_HAPPENDED'];

            tmpFinalNotes = Object.entries(notesByPhase).map(entry => {
                return {
                    key: entry[0],
                    value: entry[1]
                };
            });

            finalNotes['WHAT_HAPPENDED'] = tmpFinalNotes;
        }

        return (
            <Container
                phase={phase}
                noteType={Note}
                header={"Add new note"}
                addNewPersonalNote={this.props.addNewPersonalNote}
                personalNotes={this.props.personalNotes}
                addNewNote={this.addNewWhatHappened}
                notes={finalNotes}
                deletePersonalNote={this.props.deletePersonalNote}
                editPersonalNote={this.props.editPersonalNote}
            />
        );
    }
}

export default withPhaseHoc(WhatHappened);