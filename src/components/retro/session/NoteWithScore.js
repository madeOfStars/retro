import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose as classComposer } from '../../commons/ClassComposer';
import withNoteHoc from '../../commons/hoc/withNoteHoc';
import noteStyle from './css/NoteWithScore.module.css';
import { incrementNoteCount, decrementNoteCount } from '../../../store/actions/retro/note/noteActions';

class NoteWithScore extends Component {

    incrementCount(e) {
        e.stopPropagation();

        const { retroId, phase, fKey, incrementVote } = this.props;
        this.props.changeZIndex(e, phase);

        if (e.ctrlKey) {
            if (incrementVote()) {
                this.props.incrementNoteCount(retroId, fKey);
            } else {
                window.Materialize.toast('No more remaining votes. Ctrl + Right Click to downvote a cluster', 2500);
            }
        }
    }

    decrementCount(e) {
        e.preventDefault();
        e.stopPropagation();
        const { retroId, fKey, decrementVote } = this.props;

        if (e.ctrlKey) {
            if (decrementVote()) {
                this.props.decrementNoteCount(retroId, fKey);   
            } else {
                window.Materialize.toast('No more remaining votes. Ctrl + Click to vote a cluster', 2500);
            }
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