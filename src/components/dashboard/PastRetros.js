import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Button } from 'react-materialize';

import DialogDeleteRetro from '../retro/DialogDeleteRetro';
import { deleteRetro } from '../../store/actions/retro/retroActions';
import CardComponent from './CardComponent';

class PastRetros extends Component {

    constructor(props) {
        super(props);

        this.showRetro = this.showRetro.bind(this);
        this.createAction = this.createAction.bind(this);
    }

    showRetro(e) {
        console.log(e.target.id);
    }

    deleteRetro(retro) {
        this.props.deleteRetro(retro.key);
    }

    getDocumentById(retro) {
        return document.getElementById('delete' + retro.key);
    }

    createAction(retro) {
        return (
            <div key={retro.key} className="row" style={{ marginBottom: 0, textAlign: "center" }}>
                <Col s={6}>
                    <Button key='show'
                        id={retro.key}
                        onClick={this.showRetro}
                        className='btn pink lighten-1 waves-effect waves-light'>
                        Show
                    </Button>
                </Col>
                <Col s={6}>
                    <DialogDeleteRetro retro={retro} deleteRetro={(retro) => this.deleteRetro(retro)} />
                </Col>
            </div>
        );
    }

    render() {
        return <CardComponent
            retros={this.props.pastRetros}
            action={this.createAction}
            type={this.props.type}
        />
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteRetro: (retroId) => dispatch(deleteRetro(retroId))
    }
}

export default connect(null, mapDispatchToProps)(PastRetros);