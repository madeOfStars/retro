import React, { Component } from 'react';
import { Button, Modal } from 'react-materialize';

class ModalCreateSprint extends Component {
    render() {
        return (
            <Modal header='Create new Sprint' fixedFooter
                trigger={
                    <Button floating large className='pink lighten-1' waves='light' icon='add' style={{ position: 'fixed', bottom: '24px', right: '24px' }} />
                }
                actions={
                    <div>
                        <Button modal="close" className='btn pink lighten-1 waves-effect waves-light' style={{ marginRight: 5 }}><i className="material-icons right">send</i>Submit</Button>
                        <Button modal="close" className='btn pink lighten-1 waves-effect waves-light'><i className="material-icons right">close</i>Cancel</Button>
                    </div>
                }
            >
            </Modal>
        );
    }
}

export default ModalCreateSprint;