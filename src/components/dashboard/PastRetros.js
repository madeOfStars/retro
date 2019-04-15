import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Col, Row, Button } from 'react-materialize';

import DialogDeleteRetro from '../retro/DialogDeleteRetro';
import { deleteRetro } from '../../store/actions/retro/retroActions';

class PastRetros extends Component {

    constructor(props) {
        super(props);

        this.showRetro = this.showRetro.bind(this);
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

    render() {
        let pastRetros = null;
        if (this.props.pastRetros) {
            pastRetros = this.props.pastRetros.map((retro) => {
                return (
                    <Col key={retro.key} m={3} s={6}>
                        <Card key={retro.key} title={retro.value.name}
                            actions={[
                                <div key={retro.key} className="row" style={{ marginBottom: 0 }}>
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
                            ]}
                        >
                            {retro.value.startingDate + " - " + retro.value.endingDate}
                        </Card>
                    </Col>
                );
            });
        }
        return (
            <Row>
                {
                    (pastRetros && pastRetros.length > 0) ?
                        <h5>Past retros</h5>
                        :
                        <h5>No past retro</h5>
                }
                {pastRetros}
            </Row>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteRetro: (retroId) => dispatch(deleteRetro(retroId))
    }
}

export default connect(null, mapDispatchToProps)(PastRetros);