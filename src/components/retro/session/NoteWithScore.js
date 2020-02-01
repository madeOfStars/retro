import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose as classComposer } from '../../commons/ClassComposer';
import withNoteHoc from '../../commons/hoc/withNoteHoc';
import noteStyle from './css/NoteWithScore.module.css';
import { incrementNoteCount, decrementNoteCount } from '../../../store/actions/retro/note/noteActions';

class NoteWithScore extends Component {

    incrementCount(e) {
        e.stopPropagation();

        const { retroId, phase, fKey } = this.props;
        this.props.changeZIndex(e, phase);

        if (e.ctrlKey) {
            this.props.incrementNoteCount(retroId, fKey);
        }
    }

    decrementCount(e) {
        e.preventDefault();
        e.stopPropagation();
        const { retroId, fKey } = this.props;

        if (e.ctrlKey) {
            this.props.decrementNoteCount(retroId, fKey);
        }
    }

    render() {
        const { note, opacity } = this.props;
        const count = note.count || 0;

        return (
            <div id="note"
                className={classComposer(noteStyle.note, this.props.getColor())}
                style={this.props.generateStyle(note.positionStyle, opacity)}
                onClick={(e) => this.incrementCount(e)}
                onContextMenu={(e) => this.decrementCount(e)}
            >
                <h1>{count}</h1>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        incrementNoteCount: (retroId, noteId) => dispatch(incrementNoteCount(retroId, noteId)),
        decrementNoteCount: (retroId, noteId) => dispatch(decrementNoteCount(retroId, noteId))
    }
}

export default connect(null, mapDispatchToProps)(withNoteHoc(NoteWithScore));