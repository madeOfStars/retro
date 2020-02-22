import React, { Component } from 'react';
import { incrementZIndex } from '../Z_Index';

const withNoteHoc = WrappedComponent => {
    class WithNoteHoc extends Component {

        constructor(props) {
            super(props);

            this.changeZIndex = this.changeZIndex.bind(this);
            this.generateStyle = this.generateStyle.bind(this);
            this.getColor = this.getColor.bind(this);
        }

        changeZIndex(e, phase) {
            var target = this.selectNoteTarget(e);
            target.style.zIndex = incrementZIndex(phase.identifier);
        }

        selectNoteTarget(e) {
            var target = e.target;
            var parent = target.parentElement;

            if (target.id === "note") {
                return target;
            }

            if (parent.id === "note") {
                return parent;
            }

            return null;
        }

        generateStyle(positionStyle, opacity) {
            return {
                opacity: opacity,
                left: positionStyle.x,
                top: positionStyle.y,
                transform: 'rotate(' + this.randomBetween(-15, 15) + 'deg)'
            }
        }

        randomBetween(min, max) {
            return (min + Math.ceil(Math.random() * max));
        }

        getColor() {
            const { note, phase } = this.props;
            return note.color === undefined || note.color === null ? phase.color :
                note.color;
        }

        render() {
            return <WrappedComponent
                changeZIndex={this.changeZIndex}
                generateStyle={this.generateStyle}
                getColor={this.getColor}
                {...this.props}
            />
        }
    }

    return WithNoteHoc;
}

export default withNoteHoc;