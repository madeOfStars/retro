import React, { Component } from 'react';
import { Button, Modal, Row, Input } from 'react-materialize';

class ModalCreateSprint extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sprintName: '',
            startingDate: '',
            endingDate: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit() {
        console.log(this.state);
        this.setState({
            sprintName: undefined,
            startingDate: '',
            endingDate: ''
        });
    }

    render() {
        return (
            <Modal header='Create new Sprint' fixedFooter
                trigger={
                    <Button floating large className='pink lighten-1' waves='light' icon='add' style={{ position: 'fixed', bottom: '24px', right: '24px' }} />
                }
                actions={
                    <div>
                        <Button onClick={this.handleSubmit} modal="close" className='btn pink lighten-1 waves-effect waves-light' style={{ marginRight: 5 }}><i className="material-icons right">send</i>Submit</Button>
                        <Button modal="close" className='btn pink lighten-1 waves-effect waves-light'><i className="material-icons right">close</i>Cancel</Button>
                    </div>
                }
            >
                <Row>
                    <Input onChange={this.handleChange} name="sprintName" s={12} label="Sprint name" />
                </Row>
                <Row>
                    <Input onChange={this.handleChange} name="startingDate" s={6} type="date" label="Starting date" />
                    <Input onChange={this.handleChange} name="endingDate" s={6} type="date" label="Ending date" />
                </Row>
            </Modal>
        );
    }
}

export default ModalCreateSprint;