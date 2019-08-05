import React, { Component } from 'react';
import { compose } from '../../commons/ClassComposer'
import personalNoteStyle from './css/PersonalNote.module.css';

class PersonalNote extends Component {
    render() {
        const { color } = this.props;
        return (
            <div className={compose(personalNoteStyle.personalNote, color)}>
                <p>
                    Hello
                </p>
            </div>
        );
    }
}

export default PersonalNote;