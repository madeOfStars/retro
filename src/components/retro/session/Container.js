import React, { Component } from 'react';
import ModalNoteChooser from './phase/modal/ModalNoteChooser';
import PersonalNote from './PersonalNote';
import Target from './Target';

class Container extends Component {

    render() {
        const {
            phase,
            header,
            addNewPersonalNote,
            addNewNote,
            addNewPersonalNoteWithColor,
            personalNotes,
            notes,
            deletePersonalNote,
            editPersonalNote,
            updateNotePosition
        } = this.props;

        const pNotes = personalNotes.map((personalNote) => {
            return <PersonalNote
                key={personalNote.id} color={phase.color}
                personalNote={personalNote}
                deletePersonalNote={deletePersonalNote}
                editPersonalNote={editPersonalNote}
            />;
        });

        return (
            <div className="row">
                <Target notes={notes} phase={phase} handleDrop={addNewNote} updateNotePosition={updateNotePosition} />
                <div className="col s2">
                    {pNotes}
                    <ModalNoteChooser
                        phase={phase}
                        header={header}
                        addNewPersonalNote={addNewPersonalNote}
                        addNewPersonalNoteWithColor={addNewPersonalNoteWithColor}
                    />
                </div>
            </div>
        );
    }
}

export default Container;