import React, { Component } from 'react';
import Container from '../Container'

class WhatHappened extends Component {
    render() {
        const { phase } = this.props;
        return (
            <Container phase={phase} header={"Add new note"} />
        );
    }
}

export default WhatHappened;