import React, { Component } from 'react';
import { Button, Modal, Row, Input } from 'react-materialize';
import { compose } from '../../../../commons/ClassComposer';

import { MAX_CHARS_PER_NOTE } from '../../../../../commons/Constants';

class WHModalNewNote extends Component {

    constructor(props) {
        super(props);

        this.state = {
            noteText: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cleanForm = this.cleanForm.bind(this);
    }

    handleSubmit() {
        this.props.addNewPersonalNote(this.state.noteText);
        this.cleanForm();
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

    cleanForm() {
        this.setState({ noteText: '' });
    }

    render() {
        const { phase, header } = this.props;
        return (
            <Modal
                header={header} fixedFooter
                trigger={
                    <Button floating large className={phase.color} waves='light' icon='add' style={{ position: 'fixed', bottom: '24px', right: '24px' }} />
                }
                actions={
                    <div>
                        <Button onClick={this.handleSubmit} modal="close" className={compose('btn', phase.color, 'waves-effect waves-light')} style={{ marginRight: 5 }}><i className="material-icons right">send</i>Submit</Button>
                        <Button onClick={this.cleanForm} modal="close" className={compose('btn', phase.color, 'waves-effect waves-light')}><i className="material-icons right">close</i>Cancel</Button>
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

export default WHModalNewNote;