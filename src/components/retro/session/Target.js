import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import Note from './Note';
import { compose } from '../../commons/ClassComposer';

import { addNewNote } from '../../../store/actions/retro/retroActions';

import targetStyle from './css/Target.module.css';

const positionStyle = {
    x: 0,
    y: 0
}

const target = {
    drop(props, monitor, component) {
        const { retroId, phase } = props;

        positionStyle.x = monitor.getClientOffset().x;
        positionStyle.y = monitor.getClientOffset().y;

        // const note = {
        //     text: props.note.text,
        //     position: positionStyle
        // }

        console.log(props);

        return props;
    }
}

class Target extends Component {
    render() {
        const { notes, color } = this.props;
        const { connectDropTarget, hovered } = this.props;
        const backgroundColor = hovered ? 'lightyellow' : 'white';

        const allNotes = notes.map(note => {
            return <Note
                key={note.id}
                note={note}
                color={color}
                positionStyle={positionStyle} />
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

const mapDispatchToProps = (dispatch) => {
    return {
        addNewNote: (note, retroId, phase) => dispatch(addNewNote(note, retroId, phase))
    }
}

export default DropTarget('item', target, collect)(connect(null, mapDispatchToProps)(Target));