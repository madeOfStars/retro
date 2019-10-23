import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import Note from './Note';
import { compose } from '../../commons/ClassComposer';

import targetStyle from './css/Target.module.css';

const positionStyle = {
    x: 0,
    y: 0
}

const target = {
    drop(props, monitor, component) {

        positionStyle.x = monitor.getClientOffset().x;
        positionStyle.y = monitor.getClientOffset().y;

        const note = {
            text: monitor.getItem().text,
            positionStyle
        }

        return props.handleDrop(note);
    }
}

class Target extends Component {
    render() {
        const { notes, phase } = this.props;
        const { connectDropTarget, hovered } = this.props;
        const backgroundColor = hovered ? 'lightyellow' : 'white';

        let allNotes = notes !== undefined ? notes : [];

        allNotes = notes.map(note => {
            return <Note
                key={note.key}
                note={note.value}
                phase={phase}
            />
        });

        return connectDropTarget(
            <div className={compose("col s10", targetStyle.target)} style={{ background: backgroundColor }}>
                {allNotes}
            </div>
        );
    }
}

const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver(),
        item: monitor.getItem()
    }
}

export default DropTarget('item', target, collect)(Target);