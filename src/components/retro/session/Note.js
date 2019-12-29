import React, { Component } from 'react';
import { compose } from '../../commons/ClassComposer';
import { DragSource } from 'react-dnd';

import noteStyle from './css/Note.module.css';
import { incrementZIndex } from '../../commons/Z_Index';
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

    constructor(props) {
        super(props);

        this.generateStyle = this.generateStyle.bind(this);
        this.getColor = this.getColor.bind(this);
    }

    changeZIndex(e, phase) {
        var target = this.selectNoteTarget(e);
        target.style.zIndex = incrementZIndex(phase.identifier);
    }

    selectNoteTarget(e) {
        var target = e.target;
        var parent = target.parentElement;

        if (target.id === "note") {
            return target;
        }

        if (parent.id === "note") {
            return parent;
        }

        return null;
    }

    generateStyle(positionStyle, opacity) {
        return {
            opacity: opacity,
            left: positionStyle.x,
            top: positionStyle.y,
            transform: 'rotate(' + this.randomBetween(-15, 15) + 'deg)'
        }
    }

    randomBetween(min, max) {
        return (min + Math.ceil(Math.random() * max));
    }

    getColor() {
        const { note, phase } = this.props;
        return note.color === undefined || note.color === null ? phase.color :
            note.color;
    }

    render() {
        const { phase, note, opacity, connectDragSource } = this.props;
        this.getColor();

        return connectDragSource(
            <div id="note"
                className={compose(noteStyle.note, this.getColor())}
                style={this.generateStyle(note.positionStyle, opacity)}
                onClick={(e) => this.changeZIndex(e, phase)}
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

export default DragSource('item', noteSource, collect)(Note);