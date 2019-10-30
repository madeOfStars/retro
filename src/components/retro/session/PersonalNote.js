import React, { Component } from 'react';
import { compose } from '../../commons/ClassComposer'
import personalNoteStyle from './css/PersonalNote.module.css';

import { DragSource } from 'react-dnd';

const itemSource = {
    beginDrag(props) {
        return props.personalNote;
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
            newNoteText: props.personalNote.text
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

    onSave() {
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

    renderForm() {
        const { color, personalNote } = this.props;
        const { isDragging } = this.props;
        const opacity = isDragging ? 0 : 1;

        return (
            <div className={compose(personalNoteStyle.personalNote, color)} style={{ opacity }}>
                <textarea
                    name="newNoteText"
                    defaultValue={personalNote.text}
                    onChange={this.handleChange}
                />
                <div className="right-align">
                    <i className="material-icons" onClick={() => this.onSave()} style={{ marginRight: 10 }}>
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
        const { color, personalNote } = this.props;
        const { isDragging } = this.props;
        const opacity = isDragging ? 0 : 1;

        return (
            <div className={compose(personalNoteStyle.personalNote, color)} style={{ opacity }}>
                <p>
                    {this.state.newNoteText}
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