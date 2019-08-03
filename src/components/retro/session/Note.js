import React, { Component } from 'react';
import noteStyle from './Note.module.css';

class Note extends Component {

    constructor(props) {
        super(props);

        this.generateStyle = this.generateStyle.bind(this)
    }

    generateStyle() {
        return {
            transform: 'rotate(' + this.randomBetween(-15, 15) + 'deg)',
        }
    }

    randomBetween(min, max) {
        return (min + Math.ceil(Math.random() * max));
    }

    render() {
        const { color } = this.props;
        return (
            <div className={[noteStyle.note, color].join(' ')} style={this.generateStyle()}>
                <p>Hi</p>
            </div>
        );
    }
}

export default Note;