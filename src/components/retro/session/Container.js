import React, { Component } from 'react';
import ModalNewNote from './ModalNewNote';
import PersonalNote from './PersonalNote';

class Container extends Component {
    render() {
        const { phase, header, addNewPersonalNote, personalNotes } = this.props;

        const pNotes = personalNotes.map(personalNote => {
            return <PersonalNote color={phase.color} text={personalNote} />;
        });

        return (
            <div className="row">
                <div className="col s2 offset-s10">
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