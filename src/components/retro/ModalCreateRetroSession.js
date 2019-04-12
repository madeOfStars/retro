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
        this.switchView = this.switchView.bind(this);
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
            status: RETRO_STATUS.OPEN.status
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

    switchView() {
        if (this.props.allowCreationOfNewSession)
            return this.sesionCreationView();
        else
            return this.stopSessionCreationView();
    }

    sesionCreationView() {
        return (
            <div>
                <Row>
                    <Input onChange={this.handleChange} name="sessionName" s={12} placeholder="Session name" value={this.state.sessionName} />
                </Row>
                <Row>
                    <Input onChange={this.handleChange} name="startingDate" s={6} type="date" placeholder="Starting date" value={this.state.startingDate} />
                    <Input onChange={this.handleChange} name="endingDate" s={6} type="date" placeholder="Ending date" value={this.state.endingDate} />
                </Row>
            </div>
        );
    }

    stopSessionCreationView() {
        return (
            <div>
                <Row>
                    <h5>Impossible to create a new session without closing the existing one first</h5>
                </Row>
            </div>
        );
    }

    render() {
        return (
            <Modal header='Create new Retro Session' fixedFooter
                trigger={
                    <Button floating large className='pink lighten-1' waves='light' icon='add' style={{ position: 'fixed', bottom: '24px', right: '24px' }} />
                }
                actions={
                    <div>
                        <Button onClick={this.handleSubmit}
                            modal="close"
                            className='btn pink lighten-1 waves-effect waves-light'
                            style={{ marginRight: 5 }}
                            disabled={!this.props.allowCreationOfNewSession}>
                            <i className="material-icons right">send</i>
                            Submit
                        </Button>
                        <Button onClick={this.cleanForm}
                            modal="close"
                            className='btn pink lighten-1 waves-effect waves-light'>
                            <i className="material-icons right">close</i>
                            Cancel
                        </Button>
                    </div>
                }
            >
                {this.switchView()}
            </Modal>
        );
    }
}

export default ModalCreateRetroSession;