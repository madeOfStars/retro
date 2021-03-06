import React, { Component } from 'react';
import ModalNoteChooser from './phase/modal/ModalNoteChooser';
import PersonalNote from './PersonalNote';
import Target from './Target';

class Container extends Component {

    showModal = () => {
        const {
            noModal,
            phase,
            header,
            addNewPersonalNote,
            addNewPersonalNoteWithColor
        } = this.props;


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
            retroId,
            phase,
            noteType,
            addNewNote,
            personalNotes,
            notes,
            deletePersonalNote,
            editPersonalNote,
            updateNotePosition,
            incrementVote,
            decrementVote
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
                    retroId={retroId}
                    phase={phase}
                    handleDrop={addNewNote}
                    updateNotePosition={updateNotePosition}
                    incrementVote={incrementVote}
                    decrementVote={decrementVote}
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