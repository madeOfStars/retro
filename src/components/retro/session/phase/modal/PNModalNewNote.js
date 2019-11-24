import React, { Component } from 'react';
import { Button, Modal, Row, Input } from 'react-materialize';
import { compose } from '../../../../commons/ClassComposer';

import { MAX_CHARS_PER_NOTE } from '../../../../../commons/Constants';

class PNModalNewNote extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: true,
            color: ''
        }

        this.addPositiveNote = this.addPositiveNote.bind(this);
        this.addNegativeNote = this.addNegativeNote.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.escapePressed = this.escapePressed.bind(this);
    }

    addPositiveNote() {
        this.setState({
            color: this.props.phase.color,
            isModalOpen: true
        });
    }

    addNegativeNote() {
        this.setState({
            color: 'red',
            isModalOpen: true
        });
    }

    escapePressed(e) {
        if (e.keyCode === 27) {
            this.closeModal();
        }
    }

    closeModal() {
        this.setState({ isModalOpen: false });
    }

    componentDidMount() {
        document.addEventListener("keydown", this.escapePressed, false);
        this.setState({ isModalOpen: false });
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escapePressed, false);
    }

    render() {
        const { phase, header } = this.props;

        return (
            <Modal
                open={this.state.isModalOpen}
                header={header} fixedFooter
                modalOptions={{
                    dismissible: false
                }}
                trigger={
                    <Button
                        floating
                        fab='vertical'
                        className={phase.color} waves='light'
                        large
                        icon='add'
                    >
                        <Button
                            floating
                            icon='sentiment_very_dissatisfied'
                            className='red'
                            onClick={this.addNegativeNote}
                        />
                        <Button
                            floating
                            icon='sentiment_very_satisfied'
                            className={phase.color}
                            onClick={this.addPositiveNote}
                        />
                    </Button>
                }
                actions={
                    <div>
                        <Button onClick={this.closeModal} modal="close" className={compose('btn', this.state.color, 'waves-effect waves-light')} style={{ marginRight: 5 }}><i className="material-icons right">send</i>Submit</Button>
                        <Button onClick={this.closeModal} modal="close" className={compose('btn', this.state.color, 'waves-effect waves-light')}><i className="material-icons right">close</i>Cancel</Button>
                    </div>
                }
            >
                <Row>
                    <Input
                        name="noteText"
                        s={12} placeholder="Note"
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                        maxLength={MAX_CHARS_PER_NOTE}
                    />
                </Row>
            </Modal>
        );
    }
}

export default PNModalNewNote;