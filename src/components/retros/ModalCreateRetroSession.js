import React, { Component } from 'react';
import { Button, Modal, Row, Input } from 'react-materialize';

import moment from 'moment';

import { RETRO_STATUS } from '../../commons/Constants';

class ModalCreateRetroSession extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sessionName: '',
            startingDate: '',
            endingDate: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cleanForm = this.cleanForm.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit() {
        const startingDate = this.formatDate(this.state.startingDate);
        const endingDate = this.formatDate(this.state.endingDate);
        this.props.createNewRetroSession({
            name: this.state.sessionName,
            startingDate,
            endingDate,
            team: this.props.loggedUser.team,
            status: RETRO_STATUS.OPEN
        });
        this.cleanForm();
    }

    cleanForm() {
        this.setState({
            sessionName: '',
            startingDate: '',
            endingDate: ''
        });
    }

    formatDate(inputDate) {
        return moment(inputDate, "DD MMMM, YYYY").format("DD.MM.YYYY");
    }

    render() {
        return (
            <Modal header='Create new Retro Session' fixedFooter
                trigger={
                    <Button floating large className='pink lighten-1' waves='light' icon='add' style={{ position: 'fixed', bottom: '24px', right: '24px' }} />
                }
                actions={
                    <div>
                        <Button onClick={this.handleSubmit} modal="close" className='btn pink lighten-1 waves-effect waves-light' style={{ marginRight: 5 }}><i className="material-icons right">send</i>Submit</Button>
                        <Button onClick={this.cleanForm} modal="close" className='btn pink lighten-1 waves-effect waves-light'><i className="material-icons right">close</i>Cancel</Button>
                    </div>
                }
            >
                <Row>
                    <Input onChange={this.handleChange} name="sessionName" s={12} placeholder="Session name" value={this.state.sessionName} />
                </Row>
                <Row>
                    <Input onChange={this.handleChange} name="startingDate" s={6} type="date" placeholder="Starting date" value={this.state.startingDate} />
                    <Input onChange={this.handleChange} name="endingDate" s={6} type="date" placeholder="Ending date" value={this.state.endingDate} />
                </Row>
            </Modal>
        );
    }
}

export default ModalCreateRetroSession;