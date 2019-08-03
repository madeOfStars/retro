import React, { Component } from 'react';
import ModalNewNote from './ModalNewNote';

class Container extends Component {
    render() {
        const { phase, header } = this.props;
        return (
            <div className="row">
                <div className="col s2 offset-s10">
                    <ModalNewNote phase={phase} header={header} />
                </div>
            </div>
        );
    }
}

export default Container;