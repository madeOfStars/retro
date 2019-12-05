import React, { Component } from 'react';
import { Button, Modal, Row, Input } from 'react-materialize';
import { compose } from '../../../../commons/ClassComposer';

import { MAX_CHARS_PER_NOTE } from '../../../../../commons/Constants';

class PNModalNewNote extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: true,
            color: '',
            noteText: ''
        }

        this.addPositiveNote = this.addPositiveNote.bind(this);
        this.addNegativeNote = this.addNegativeNote.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.escapePressed = this.escapePressed.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.cleanForm = this.cleanForm.bind(this);
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

    handleSubmit() {
        this.props.addNewPersonalNoteWithColor(this.state.noteText, this.state.color);
        this.cleanForm();
        this.closeModal();
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleSubmit();
        }
    }

    escapePressed(e) {
        if (e.keyCode === 27) {
            this.closeModal();
        }
    }

    closeModal() {
        this.setState({ isModalOpen: false });
    }

    cleanForm() {
        this.setState({ noteText: '' });
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
                        <Button onClick={this.handleSubmit} modal="close" className={compose('btn', this.state.color, 'waves-effect waves-light')} style={{ marginRight: 5 }}><i className="material-icons right">send</i>Submit</Button>
                        <Button onClick={this.closeModal} modal="close" className={compose('btn', this.state.color, 'waves-effect waves-light')}><i className="material-icons right">close</i>Cancel</Button>
                    </div>
                }
            >
                <Row>
                    <Input
                        name="noteText"
                        s={12} placeholder="Note"
                        onChange={this.handleChange}
                        value={this.state.noteText}
                        onKeyPress={this.handleKeyPress}
                        maxLength={MAX_CHARS_PER_NOTE}
                    />
                </Row>
            </Modal>
        );
    }
}

export default PNModalNewNote;