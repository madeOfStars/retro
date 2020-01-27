import React, { Component } from 'react';
import { compose } from '../../commons/ClassComposer';

import withNoteHoc from '../../commons/hoc/withNoteHoc';

import noteStyle from './css/Note.module.css';

class NoteWithScore extends Component {

    render() {
        const { phase, note, opacity } = this.props;
        return (
            <div id="note"
                className={compose(noteStyle.note, this.props.getColor())}
                style={this.props.generateStyle(note.positionStyle, opacity)}
                onClick={(e) => this.props.changeZIndex(e, phase)}
            >
            </div>
        );
    }
}

export default withNoteHoc(NoteWithScore);