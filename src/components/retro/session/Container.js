import React, { Component } from 'react';
import ModalNoteChooser from './phase/modal/ModalNoteChooser';
import PersonalNote from './PersonalNote';
import Target from './Target';

class Container extends Component {

    showModal = () => {
        const { noModal, phase, header, addNewPersonalNote, addNewPersonalNoteWithColor } = this.props;

        if (!noModal) {
            return (
                <ModalNoteChooser
                    phase={phase}
                    header={header}
                    addNewPersonalNote={addNewPersonalNote}
                    addNewPersonalNoteWithColor={addNewPersonalNoteWithColor}
                />
            );
        }
    }

    render() {
        const {
            noModal,
            phase,
            noteType,
            addNewNote,
            personalNotes,
            notes,
            deletePersonalNote,
            editPersonalNote,
            updateNotePosition
        } = this.props;

        const pNotes = personalNotes.map((personalNote) => {
            return <PersonalNote
                key={personalNote.id} color={phase.color}
                showEdit={!noModal}
                personalNote={personalNote}
                deletePersonalNote={deletePersonalNote}
                editPersonalNote={editPersonalNote}
            />;
        });

        return (
            <div className="row">
                <Target
                    notes={notes}
                    noteType={noteType}
                    phase={phase}
                    handleDrop={addNewNote}
                    updateNotePosition={updateNotePosition}
                />
                <div className="col s2">
                    {pNotes}
                    {this.showModal()}
                </div>
            </div>
        );
    }
}

export default Container;