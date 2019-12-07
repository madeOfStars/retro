import React, { Component } from 'react';
import Container from '../Container';
import withPhaseHoc from '../../../commons/hoc/withPhaseHoc';

class PositivesNegatives extends Component {
    constructor(props) {
        super(props);

        this.getNotesPerPhase = this.getNotesPerPhase.bind(this);
        this.addNewPNNote = this.addNewPNNote.bind(this);
    }

    getNotesPerPhase(phaseIdentifier, notesByRetroId) {
        let tmpFinalNotes = [];
        const notesByPhase = notesByRetroId[phaseIdentifier];

        if (notesByPhase !== undefined && notesByPhase !== null) {
            tmpFinalNotes = Object.entries(notesByPhase).map(entry => {
                return {
                    key: entry[0],
                    value: entry[1]
                };
            });
        }

        return tmpFinalNotes;
    }

    addNewPNNote(note) {
        console.log(note);
        const { phase, retroId } = this.props;
        this.props.deletePersonalNote(note.note);
        this.props.addNewNote({
            text: note.note.text,
            color: note.note.color,
            positionStyle: note.positionStyle
        }, retroId, phase);
    }

    render() {
        const { phase, notes, retroId } = this.props;

        let finalNotes = [];

        if (notes !== undefined && notes !== null) {
            const notesByRetroId = notes[retroId];

            finalNotes['WHAT_HAPPENDED'] = this.getNotesPerPhase('WHAT_HAPPENDED', notesByRetroId);
            finalNotes['POSITIVES_AND_NEGATIVES'] = this.getNotesPerPhase('POSITIVES_AND_NEGATIVES', notesByRetroId);
        }

        return (
            <Container
                phase={phase}
                header={"Add new note"}
                addNewPersonalNoteWithColor={this.props.addNewPersonalNoteWithColor}
                personalNotes={this.props.personalNotes}
                addNewNote={this.addNewPNNote}
                notes={finalNotes}
                deletePersonalNote={this.props.deletePersonalNote}
                editPersonalNote={this.props.editPersonalNote}
            />
        );
    }
}

export default withPhaseHoc(PositivesNegatives);