import React, { Component } from 'react';
import ModalNoteChooser from './phase/modal/ModalNoteChooser';
import PersonalNote from './PersonalNote';
import Target from './Target';

class Container extends Component {

    deletePersonalNote = (indexableNote) => {
        this.props.addNewNote(indexableNote);
    }

    render() {
        const {
            phase,
            header,
            addNewPersonalNote,
            personalNotes,
            notes,
            deletePersonalNote,
            editPersonalNote
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
                <Target notes={notes} phase={phase} handleDrop={this.deletePersonalNote} />
                <div className="col s2">
                    {pNotes}
                    <ModalNoteChooser
                        phase={phase}
                        header={header}
                        addNewPersonalNote={addNewPersonalNote}
                    />
                </div>
            </div>
        );
    }
}

export default Container;