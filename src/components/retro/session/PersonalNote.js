import React, { Component } from 'react';
import { Icon } from 'react-materialize';
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

        this.deletePersonalNote = this.deletePersonalNote.bind(this);
    }

    deletePersonalNote() {
        console.log('PO');
    }

    render() {
        const { color, personalNote } = this.props;
        const { isDragging, connectDragSource } = this.props;
        const opacity = isDragging ? 0 : 1;

        return connectDragSource(
            <div className={compose(personalNoteStyle.personalNote, color)} style={{ opacity }}>
                <p>
                    {personalNote.text}
                </p>
                <div className="right-align">
                    <icon className="material-icons" style={{marginRight: 10}}>
                        edit
                    </icon>
                    <Icon onClick={this.deletePersonalNote}>
                        delete
                    </Icon>
                </div>
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

export default DragSource('item', itemSource, collect)(PersonalNote);