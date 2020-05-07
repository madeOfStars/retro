import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Collection, CollectionItem } from 'react-materialize';

import withAuth from '../../commons/hoc/withAuth';

class ConclusionsList extends Component {
    render() {
        const { conclusions } = this.props;
        console.log(conclusions);
        const retroId = this.props.match.params.id;
        let conclusionElements = null;

        if (conclusions) {
            const conclusionPerRetro = conclusions.filter((conclusion) => {
                return conclusion.value.retroId === retroId;
            });

            conclusionElements = conclusionPerRetro.map(conclusion => {
                return <CollectionItem key={conclusion.key}>
                    {conclusion.value.conclusionItem}
                </CollectionItem>
            });
        }


        return <div className="row">
            <div className="col s8 offset-s2">
                <Collection header='Conclusions'>
                    {conclusionElements}
                </Collection>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        conclusions: state.firebase.ordered.conclusions
    }
}

export default withAuth(compose(
    connect(mapStateToProps, null),
    firebaseConnect([
        { path: 'conclusions' }
    ])
)(ConclusionsList));