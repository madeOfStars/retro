import React, { Component } from 'react';
import ModalNewNote from './ModalNewNote';
import PersonalNote from './PersonalNote';
import Target from './Target';

class Container extends Component {

    constructor(props) {
        super(props)

        this.deletePersonalNote = this.deletePersonalNote.bind(this);
    }

    deletePersonalNote = (indexableNote) => {
        this.props.addNewNote(indexableNote);
    }

    render() {
        const { phase, header, addNewPersonalNote, personalNotes, notes, retroId } = this.props;

        const pNotes = personalNotes.map((personalNote, i) => {
            const indexableNote = {
                id: i,
                text: personalNote
            };
            return <PersonalNote
                key={i} color={phase.color}
                personalNote={indexableNote}
                handleDrop={this.deletePersonalNote}
            />;
        });

        return (
            <div className="row">
                <Target notes={notes} color={phase.color} retroId={retroId} phase={phase} />
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