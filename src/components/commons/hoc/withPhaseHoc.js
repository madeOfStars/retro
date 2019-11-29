import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { addNewNote } from '../../../store/actions/retro/retroActions'

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

        render() {
            return <WrappedComponent
                addNewPersonalNote={this.addNewPersonalNote}
                deletePersonalNote={this.deletePersonalNote}
                editPersonalNote={this.editPersonalNote}
                personalNotes={this.state.personalNotes}
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
        addNewNote: (note, retroId, phase) => dispatch(addNewNote(note, retroId, phase))
    }
}

export default withPhaseHoc;