import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import Note from './Note';
import { compose } from '../../commons/ClassComposer';

import targetStyle from './css/Target.module.css';

const target = {
    hover(props, monitor, component) {
        console.log(monitor.getClientOffset().x);
        return;
    },
    drop(props, monitor, component) {
        console.log(monitor.getClientOffset().x);
        return props;
    }
}

class Target extends Component {
    render() {
        const { notes, color } = this.props;
        const { connectDropTarget, hovered } = this.props;
        const backgroundColor = hovered ? 'lightyellow' : 'white';

        const allNotes = notes.map(note => {
            return <Note note={note} color={color} />
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