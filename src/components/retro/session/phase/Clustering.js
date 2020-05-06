import React, { Component } from 'react';
import Container from '../Container';
import { Button } from 'react-materialize';
import withPhaseHoc from '../../../commons/hoc/withPhaseHoc';
import NoteWithScore from '../NoteWithScore';

import { TOTAL_VOTES } from '../../../../commons/Constants';

class Clustering extends Component {

    constructor(props) {
        super(props);

        this.addNewClusteringNote = this.addNewClusteringNote.bind(this);
        this.updateNotePosition = this.updateNotePosition.bind(this);
        this.addEmptyPersonalNote = this.addEmptyPersonalNote.bind(this);
        this.incrementVote = this.incrementVote.bind(this);
        this.decrementVote = this.decrementVote.bind(this);

        this.state = {
            votes: 0
        }
    }

    addNewClusteringNote(note) {
        const { phase, retroId } = this.props;
        this.props.deletePersonalNote(note.note);
        this.props.addNewNote({
            text: note.note.text,
            positionStyle: note.positionStyle
        }, retroId, phase);
    }

    updateNotePosition(note) {
        const { retroId } = this.props;
        this.props.updateNotePosition(retroId, note.noteId, note.positionStyle);
    }

    addEmptyPersonalNote() {
        this.props.addNewPersonalNote('');
    }

    incrementVote() {
        if (this.state.votes < TOTAL_VOTES) {
            this.setState({ votes: this.state.votes + 1 });
            return true;
        }
        return false;
    }

    decrementVote() {
        if (this.state.votes > 0) {
            this.setState({ votes: this.state.votes - 1 });
            return true;
        }
        return false;
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
            <div>
                <Container
                    noModal
                    retroId={retroId}
                    phase={phase}
                    noteType={NoteWithScore}
                    personalNotes={this.props.personalNotes}
                    addNewNote={this.addNewClusteringNote}
                    notes={finalNotes}
                    deletePersonalNote={this.props.deletePersonalNote}
                    editPersonalNote={this.props.editPersonalNote}
                    updateNotePosition={this.updateNotePosition}
                    incrementVote={this.incrementVote}
                    decrementVote={this.decrementVote}
                />

                <Button
                    floating
                    large
                    onClick={this.addEmptyPersonalNote}
                    className={phase.color} waves='light' icon='add'
                    style={{ position: 'fixed', bottom: '24px', right: '24px' }}
                />
            </div>
        );
    }
}

export default withPhaseHoc(Clustering);