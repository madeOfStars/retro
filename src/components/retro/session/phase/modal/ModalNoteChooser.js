import React, { Component } from 'react';
import WHModalNewNote from './WHModalNewNote';
import PNModalNewNote from './PNModalNewNote';

import { RETRO_PHASE } from '../../../../../commons/Constants';

class ModalNoteChooser extends Component {

    render() {
        const { phase, header, addNewPersonalNote, addNewPersonalNoteWithColor } = this.props;

        if (phase.identifier === RETRO_PHASE.POSITIVES_AND_NEGATIVES.identifier) {
            return <PNModalNewNote
                phase={phase}
                header={header}
                addNewPersonalNoteWithColor={addNewPersonalNoteWithColor} />
        } else {
            return <WHModalNewNote
                phase={phase}
                header={header}
                addNewPersonalNote={addNewPersonalNote}
            />
        }
    }
}

export default ModalNoteChooser;