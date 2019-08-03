import React, { Component } from 'react';
import Note from '../Note';

class WhatHappened extends Component {
    render() {
        const { color } = this.props;
        return (
            <div>
                <Note color={color} />
            </div>
        );
    }
}

export default WhatHappened;