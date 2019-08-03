import React, { Component } from 'react';
import { Button, Modal, Row, Input } from 'react-materialize';
import { compose } from '../../commons/ClassComposer';

class ModalNewNote extends Component {
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
                        <Button modal="close" className={compose('btn', phase.color, 'waves-effect waves-light')} style={{ marginRight: 5 }}><i className="material-icons right">send</i>Submit</Button>
                        <Button modal="close" className={compose('btn', phase.color, 'waves-effect waves-light')}><i className="material-icons right">close</i>Cancel</Button>
                    </div>
                }
            >
                <Row>
                    <Input name="teamName" s={12} placeholder="Team Name" />
                </Row>
            </Modal>
        );
    }
}

export default ModalNewNote;