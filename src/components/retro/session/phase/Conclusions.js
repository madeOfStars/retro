import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import Container from '../Container';
import Note from '../Note';

import { addNewConclusionItem, deleteConclusionItem, editConclusionItem } from '../../../../store/actions/conclusion/conclusionActions';

class Conclusions extends Component {

    constructor(props) {
        super(props);

        this.getNotesPerPhase = this.getNotesPerPhase.bind(this);
        this.addNewConclusion = this.addNewConclusion.bind(this);
        this.getConclusionsAsArray = this.getConclusionsAsArray.bind(this);
        this.deleteConclusionItem = this.deleteConclusionItem.bind(this);
        this.editConclusionItem = this.editConclusionItem.bind(this);
    }

    getNotesPerPhase(phaseIdentifier, notesByRetroId) {
        let tmpFinalNotes = [];
        const notesByPhase = notesByRetroId === undefined ? {} : notesByRetroId[phaseIdentifier];

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

    addNewConclusion(conclusion) {
        const { retroId } = this.props;
        this.props.addNewConclusionItem(retroId, conclusion);
    }

    deleteConclusionItem(conclusionItem) {
        this.props.deleteConclusionItem(conclusionItem);
    }

    editConclusionItem(conclusionItem) {
        this.props.editConclusionItem(conclusionItem);
    }

    getConclusionsAsArray(conclusions, retroId) {
        if (conclusions === undefined || conclusions === null) {
            return [];
        }
        
        const allConclusions = Object.entries(conclusions).map(entry => {
            return {
                id: entry[0],
                text: entry[1].conclusionItem,
                retroId: entry[1].retroId
            }
        });
        console.log(allConclusions);

        return allConclusions.filter(conclusion => {
            return conclusion.retroId === retroId;
        });
    }

    render() {

        const { phase, notes, retroId, conclusions } = this.props;
        const conclusionList = this.getConclusionsAsArray(conclusions, retroId);

        let finalNotes = [];

        if (notes !== undefined && notes !== null) {
            const notesByRetroId = notes[retroId];

            const posAndNeg = this.getNotesPerPhase('POSITIVES_AND_NEGATIVES', notesByRetroId);

            const onlyNegativesNotes = posAndNeg.filter(note => note.value.color === 'red');

            finalNotes['POSITIVES_AND_NEGATIVES'] = onlyNegativesNotes;
            finalNotes['CLUSTERING'] = this.getNotesPerPhase('CLUSTERING', notesByRetroId);
        }

        return (
            <div>
                <Container
                    retroId={retroId}
                    phase={phase}
                    noteType={Note}
                    header={"Add new conclusion"}
                    personalNotes={conclusionList}
                    addNewPersonalNote={this.addNewConclusion}
                    deletePersonalNote={this.deleteConclusionItem}
                    editPersonalNote={this.editConclusionItem}
                    notes={finalNotes}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        notes: state.firebase.data.notes,
        conclusions: state.firebase.data.conclusions
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewConclusionItem: (retroId, conclusion) => dispatch(addNewConclusionItem(retroId, conclusion)),
        deleteConclusionItem: (conclusionItem) => dispatch(deleteConclusionItem(conclusionItem)),
        editConclusionItem: (conclusionItem) => dispatch(editConclusionItem(conclusionItem))
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps),
    firebaseConnect([
        { path: 'notes' },
        { path: 'conclusions' }
    ])
)(Conclusions);