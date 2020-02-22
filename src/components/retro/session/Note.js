import React, { Component } from 'react';
import { compose } from '../../commons/ClassComposer';
import { DragSource } from 'react-dnd';

import withNoteHoc from '../../commons/hoc/withNoteHoc'

import noteStyle from './css/Note.module.css';
import { RETRO_PHASE, NOTE_TYPE } from '../../../commons/Constants';

const noteSource = {
    canDrag(props) {
        const color = props.note.color;
        return props.currentPhase === RETRO_PHASE.CLUSTERING && color !== null && color === 'red';
    },
    beginDrag(props) {
        return {
            item: props.fKey,
            itemType: NOTE_TYPE.NOTE
        }
    },
    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            return;
        }
        return props.fKey;
    }
}

class Note extends Component {

    render() {
        const { phase, note, opacity, connectDragSource } = this.props;

        return connectDragSource(
            <div id="note"
                className={compose(noteStyle.note, this.props.getColor())}
                style={this.props.generateStyle(note.positionStyle, opacity)}
                onClick={(e) => this.props.changeZIndex(e, phase)}
            >
                <p id="text">{note.text}</p>
            </div>
        );
    }
}

const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }
}

export default DragSource('item', noteSource, collect)(withNoteHoc(Note));