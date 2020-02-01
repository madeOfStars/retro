import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import Note from './Note';
import { compose } from '../../commons/ClassComposer';
import { getPreviousPhase } from '../../../commons/OrderedPhases'
import { NOTE_TYPE } from '../../../commons/Constants';

import targetStyle from './css/Target.module.css';

const positionStyle = {
    x: 0,
    y: 0
}

const target = {
    drop(props, monitor, component) {

        positionStyle.x = monitor.getClientOffset().x;
        positionStyle.y = monitor.getClientOffset().y;

        switch (monitor.getItem().itemType) {
            case NOTE_TYPE.PERSONAL_NOTE:
                return props.handleDrop({
                    note: monitor.getItem().item,
                    positionStyle
                });

            case NOTE_TYPE.NOTE:
                return props.updateNotePosition({
                    noteId: monitor.getItem().item,
                    positionStyle
                });

            default:
                throw new Error(`Unsupported value ${monitor.getItem().itemType}`);
        }
    }
}

class Target extends Component {

    constructor(props) {
        super(props);

        this.getNotes = this.getNotes.bind(this);
    }

    getNotes() {
        const { notes, phase } = this.props;

        switch (phase.identifier) {
            case 'WHAT_HAPPENDED':
                return {
                    previousNotes: { notes: [], opacity: 1 },
                    currentNotes: { notes: notes['WHAT_HAPPENDED'], opacity: 1 }
                }

            case 'POSITIVES_AND_NEGATIVES':
                return {
                    previousNotes: { notes: notes['WHAT_HAPPENDED'], opacity: 0.7 },
                    currentNotes: { notes: notes['POSITIVES_AND_NEGATIVES'], opacity: 1 }
                }

            case 'CLUSTERING':
                return {
                    previousNotes: { notes: notes['POSITIVES_AND_NEGATIVES'], opacity: 0.7 },
                    currentNotes: { notes: notes['CLUSTERING'], opacity: 1 }
                }

            default:
                break;
        }
    }

    render() {
        const { retroId, phase } = this.props;
        const NoteType = this.props.noteType;
        const { connectDropTarget, hovered } = this.props;
        const backgroundColor = hovered ? 'lightyellow' : 'white';

        let allNotes = [];
        const notesWithOpacity = this.getNotes();

        if (notesWithOpacity.currentNotes.notes !== undefined && notesWithOpacity.currentNotes.notes !== null) {
            const previousNotes = notesWithOpacity.previousNotes.notes.map(note => {
                return <Note
                    key={note.key}
                    fKey={note.key}
                    note={note.value}
                    phase={getPreviousPhase(phase)}
                    currentPhase={phase}
                    opacity={notesWithOpacity.previousNotes.opacity}
                />
            });

            const currentNotes = notesWithOpacity.currentNotes.notes.map(note => {
                return <NoteType
                    key={note.key}
                    fKey={note.key}
                    note={note.value}
                    retroId={retroId}
                    phase={phase}
                    opacity={notesWithOpacity.currentNotes.opacity}
                />
            });

            allNotes = previousNotes.concat(currentNotes);
        }


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