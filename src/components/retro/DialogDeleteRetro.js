import React, { Component } from 'react';
import { Button, Modal } from 'react-materialize';

class DialogDeleteRetro extends Component {

    render() {
        const { retro } = this.props;
        const modalHeader = (retro) ? `Delete retro ${retro.value.name}?` : '';
        return (
            <Modal header={modalHeader} fixedFooter
                trigger={
                    <Button key='delete'
                        className='btn pink lighten-1 waves-effect waves-light'>
                        Delete
                    </Button>
                }
                actions={
                    <div>
                        <Button
                            modal="close"
                            onClick={() => this.props.deleteRetro(retro)}
                            className='btn pink lighten-1 waves-effect waves-light'
                            style={{ marginRight: 5 }}>
                            <i className="material-icons right">check</i>
                            Yes
                        </Button>
                        <Button
                            modal="close"
                            className='btn pink lighten-1 waves-effect waves-light'>
                            <i className="material-icons right">close</i>
                            No
                        </Button>
                    </div>
                }
            >
            </Modal>
        );
    }
}

export default DialogDeleteRetro;