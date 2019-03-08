import React, { Component } from 'react';
import { Button, Modal, Row, Input } from 'react-materialize';

class ModalCreateRetroSession extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sprintName: '',
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
        console.log(this.state);
        this.formatDate(this.state.startingDate);
        // this.cleanForm();
    }

    cleanForm() {
        this.setState({
            sprintName: '',
            startingDate: '',
            endingDate: ''
        });
    }

    formatDate(inputDate) {
        console.log(inputDate.toLocaleDateString("de-DE"));
        return null;
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
                    <Input onChange={this.handleChange} name="sprintName" s={12} placeholder="Sprint name" value={this.state.sprintName} />
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