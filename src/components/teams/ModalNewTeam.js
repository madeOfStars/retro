import React, { Component } from 'react';
import { Button, Modal, Row, Input } from 'react-materialize';

class ModalNewTeam extends Component {

    constructor(props) {
        super(props);

        this.state = {
            teamName: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        this.props.addTeam(this.state.teamName);
        this.setState({ teamName: '' });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <Modal
                header='Add new Team' fixedFooter
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
                    <Input name="teamName" s={12} label="Team Name" onChange={this.handleChange} />
                </Row>
            </Modal>
        );
    }
}

export default ModalNewTeam;