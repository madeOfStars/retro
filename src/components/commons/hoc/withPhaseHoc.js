import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { addNewNote, updateNotePosition } from '../../../store/actions/retro/retroActions';

const withPhaseHoc = WrappedComponent => {
    class WithPhaseHoc extends Component {
        constructor(props) {
            super(props);

            this.state = {
                personalNotes: []
            }

            this.addNewPersonalNote = this.addNewPersonalNote.bind(this);
            this.deletePersonalNote = this.deletePersonalNote.bind(this);
            this.editPersonalNote = this.editPersonalNote.bind(this);
            this.addNewPersonalNoteWithColor = this.addNewPersonalNoteWithColor.bind(this);
            this.getNotesPerPhase = this.getNotesPerPhase.bind(this);
        }

        addNewPersonalNoteWithColor(note, color) {
            var newNote = {
                id: Date.now(),
                text: note,
                color
            }
            this.setState(prevState => ({
                personalNotes: [...prevState.personalNotes, newNote]
            }));
        }

        addNewPersonalNote(note) {
            this.addNewPersonalNoteWithColor(note, null);
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

        render() {
            return <WrappedComponent
                addNewPersonalNote={this.addNewPersonalNote}
                addNewPersonalNoteWithColor={this.addNewPersonalNoteWithColor}
                deletePersonalNote={this.deletePersonalNote}
                editPersonalNote={this.editPersonalNote}
                personalNotes={this.state.personalNotes}
                getNotesPerPhase={this.getNotesPerPhase}
                {...this.props}
            />
        }
    }
    return compose(connect(mapStateToProps, mapDispatchToProps),
        firebaseConnect([
            { path: 'notes' }
        ])
    )(WithPhaseHoc);
}

const mapStateToProps = (state) => {
    return {
        notes: state.firebase.data.notes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewNote: (note, retroId, phase) => dispatch(addNewNote(note, retroId, phase)),
        updateNotePosition: (retroId, noteId, positionStyle) => dispatch(updateNotePosition(retroId, noteId, positionStyle))
    }
}

export default withPhaseHoc;