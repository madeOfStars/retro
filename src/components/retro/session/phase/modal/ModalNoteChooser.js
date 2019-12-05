import React, { Component } from 'react';
import WHModalNewNote from './WHModalNewNote';
import PNModalNewNote from './PNModalNewNote';

import { RETRO_PHASE } from '../../../../../commons/Constants';

class ModalNoteChooser extends Component {

    render() {
        const { phase, header, addNewPersonalNote,addNewPersonalNoteWithColor } = this.props;

        if (phase.identifier === RETRO_PHASE.WHAT_HAPPENDED.identifier) {
            return <WHModalNewNote
                phase={phase}
                header={header}
                addNewPersonalNote={addNewPersonalNote}
            />
        } else {
            return <PNModalNewNote
                phase={phase}
                header={header}
                addNewPersonalNoteWithColor={addNewPersonalNoteWithColor} />
        }
    }
}

export default ModalNoteChooser;