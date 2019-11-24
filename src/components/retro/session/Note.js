import React, { Component } from 'react';
import { compose } from '../../commons/ClassComposer';

import noteStyle from './css/Note.module.css';
import { incrementZIndex } from '../../commons/Z_Index';

class Note extends Component {

    constructor(props) {
        super(props);

        this.generateStyle = this.generateStyle.bind(this)
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

    render() {
        const { phase, note, opacity } = this.props;

        return (
            <div id="note"
                className={compose(noteStyle.note, phase.color)}
                style={this.generateStyle(note.positionStyle, opacity)}
                onClick={(e) => this.changeZIndex(e, phase)}
            >
                <p id="text">{note.text}</p>
            </div>
        );
    }
}

export default Note;