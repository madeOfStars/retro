import React, { Component } from 'react';
import { compose } from '../../commons/ClassComposer';
import { DragSource } from 'react-dnd';
import personalNoteStyle from './css/PersonalNote.module.css';

import { MAX_CHARS_PER_NOTE, NOTE_TYPE } from '../../../commons/Constants';

const itemSource = {
    beginDrag(props) {
        return {
            item: props.personalNote,
            itemType: NOTE_TYPE.PERSONAL_NOTE
        };
    },
    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            return;
        }
        return props.personalNote;
    }
}

class PersonalNote extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            newNoteText: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    editModeOn() {
        this.setState({ editing: true });
    }

    deletePersonalNote(personalNote) {
        this.props.deletePersonalNote(personalNote);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onEditSave() {
        const { personalNote } = this.props;

        this.props.editPersonalNote({
            id: personalNote.id,
            text: this.state.newNoteText
        });
        this.setState({ editing: false });
    }

    onClear() {
        this.setState({ editing: false });
    }

    chooseLayout() {
        if (this.state.editing) {
            return this.renderForm();
        } else {
            return this.renderDisplay();
        }
    }

    chooseColor() {
        const { color, personalNote } = this.props;

        return personalNote.color === undefined || personalNote.color === null ? color :
            personalNote.color;
    }

    renderText() {
        const { personalNote } = this.props;

        return this.state.newNoteText === undefined
            || this.state.newNoteText === null
            || this.state.newNoteText === '' ?
            personalNote.text : this.state.newNoteText;
    }

    renderForm() {
        const { color } = this.props;
        const { isDragging } = this.props;
        const opacity = isDragging ? 0 : 1;

        return (
            <div className={compose(personalNoteStyle.personalNote, color)} style={{ opacity }}>
                <textarea
                    name="newNoteText"
                    defaultValue={this.renderText()}
                    onChange={this.handleChange}
                    maxLength={MAX_CHARS_PER_NOTE}
                />
                <div className="right-align">
                    <i className="material-icons" onClick={() => this.onEditSave()} style={{ marginRight: 10 }}>
                        check
                    </i>
                    <i className="material-icons" onClick={() => this.onClear()}>
                        clear
                    </i>
                </div>
            </div>
        );
    }

    renderDisplay() {
        const { personalNote } = this.props;
        const { isDragging } = this.props;
        const opacity = isDragging ? 0 : 1;

        return (
            <div className={compose(personalNoteStyle.personalNote, this.chooseColor())} style={{ opacity }}>
                <p>
                    {this.renderText()}
                </p>
                <div className="right-align">
                    <i className="material-icons" onClick={() => this.editModeOn()} style={{ marginRight: 10 }}>
                        edit
                    </i>
                    <i className="material-icons" onClick={() => this.deletePersonalNote(personalNote)}>
                        delete
                    </i>
                </div>
            </div>
        );
    }

    render() {
        const { connectDragSource } = this.props;

        return connectDragSource(
            this.chooseLayout()
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

export default DragSource('item', itemSource, collect)(PersonalNote);