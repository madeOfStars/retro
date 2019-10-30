import React, { Component } from 'react';
import ModalNewNote from './ModalNewNote';
import PersonalNote from './PersonalNote';
import Target from './Target';

class Container extends Component {

    deletePersonalNote = (indexableNote) => {
        this.props.addNewNote(indexableNote);
    }

    render() {
        const { phase, header, addNewPersonalNote, personalNotes, notes, deletePersonalNote } = this.props;

        const pNotes = personalNotes.map((personalNote, i) => {
            const indexableNote = {
                id: i,
                text: personalNote
            };
            return <PersonalNote
                key={i} color={phase.color}
                personalNote={indexableNote}
                deletePersonalNote={deletePersonalNote}
            />;
        });

        return (
            <div className="row">
                <Target notes={notes} phase={phase} handleDrop={this.deletePersonalNote} />
                <div className="col s2">
                    {pNotes}
                    <ModalNewNote
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