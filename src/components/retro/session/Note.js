import React, { Component } from 'react';
import { compose } from '../../commons/ClassComposer';

import noteStyle from './css/Note.module.css';

class Note extends Component {

    constructor(props) {
        super(props);

        this.generateStyle = this.generateStyle.bind(this)
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
            <div className={compose(noteStyle.note, color)} style={this.generateStyle(note.positionStyle)} >
                <p>{note.text}</p>
            </div>
        );
    }
}

export default Note;