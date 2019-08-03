import React, { Component } from 'react';
import Clustering from './phase/Clustering';
import PositivesNegatives from './phase/PositivesNegatives';
import WhatHappened from './phase/WhatHappened';
import Error from './phase/Error';

import { RETRO_PHASE } from '../../../commons/Constants';

class PhaseChooser extends Component {

    render() {
        const { phase } = this.props.phase;

        if (phase.identifier === RETRO_PHASE.WHAT_HAPPENDED.identifier) {
            return <WhatHappened color={phase.color} />
        } else if (phase.identifier === RETRO_PHASE.POSITIVES_AND_NEGATIVES.identifier) {
            return <PositivesNegatives color={phase.color} />
        } else if (phase.identifier === RETRO_PHASE.CLUSTERING.identifier) {
            return <Clustering color={phase.color} />
        } else {
            return <Error />
        }
    }
}

export default PhaseChooser;