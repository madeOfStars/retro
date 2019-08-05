import React, { Component } from 'react';
import ModalNewNote from './ModalNewNote';
import PersonalNote from './PersonalNote';

class Container extends Component {
    render() {
        const { phase, header, addNewPersonalNote } = this.props;
        return (
            <div className="row">
                <div className="col s2 offset-s10">
                    <PersonalNote color={phase.color} />
                    <PersonalNote color={phase.color} />
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