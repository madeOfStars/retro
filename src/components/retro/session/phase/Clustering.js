import React, { Component } from 'react';
import Container from '../Container';
import withPhaseHoc from '../../../commons/hoc/withPhaseHoc';

class Clustering extends Component {

    constructor(props) {
        super(props);

        this.addNewClusteringNote = this.addNewClusteringNote.bind(this);
    }

    addNewClusteringNote(note) {
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
            const notesByRetroId = notes[retroId];

            const posAndNeg = this.props.getNotesPerPhase('POSITIVES_AND_NEGATIVES', notesByRetroId);

            const onlyNegativesNotes = posAndNeg.filter(note => note.value.color === 'red');

            finalNotes['POSITIVES_AND_NEGATIVES'] = onlyNegativesNotes;
            finalNotes['CLUSTERING'] = this.props.getNotesPerPhase('CLUSTERING', notesByRetroId);
        }

        return (
            <Container
                phase={phase}
                header={"Add new note"}
                addNewPersonalNote={this.props.addNewPersonalNote}
                personalNotes={this.props.personalNotes}
                addNewNote={this.addNewClusteringNote}
                notes={finalNotes}
                deletePersonalNote={this.props.deletePersonalNote}
                editPersonalNote={this.props.editPersonalNote}
            />
        );
    }
}

export default withPhaseHoc(Clustering);