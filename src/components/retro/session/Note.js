import React, { Component } from 'react';
import { compose } from '../../commons/ClassComposer';

import noteStyle from './css/Note.module.css';
import { incrementZIndex } from '../../commons/Z_Index';

class Note extends Component {

    constructor(props) {
        super(props);

        this.generateStyle = this.generateStyle.bind(this)
    }

    testZIndex() {
        incrementZIndex('WHAT_HAPPENDED');
    }

    generateStyle(positionStyle) {
        return {
            left: positionStyle.x,
            top: positionStyle.y,
            transform: 'rotate(' + this.randomBetween(-15, 15) + 'deg)',
        }
    }

    randomBetween(min, max) {
        return (min + Math.ceil(Math.random() * max));
    }

    render() {
        const { color, note } = this.props;

        return (
            <div
                className={compose(noteStyle.note, color)}
                style={this.generateStyle(note.positionStyle)}
                onClick={() => this.testZIndex()}
            >
                <p>{note.text}</p>
            </div>
        );
    }
}

export default Note;