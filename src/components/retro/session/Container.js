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
        const { phase, header, addNewPersonalNote, personalNotes, notes } = this.props;

        const pNotes = personalNotes.map((personalNote, i) => {
            const indexableNote = {
                id: i,
                text: personalNote
            };
            return <PersonalNote
                key={i} color={phase.color}
                personalNote={indexableNote}
            />;
        });

        return (
            <div className="row">
                <Target notes={notes} color={phase.color} handleDrop={this.deletePersonalNote} />
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