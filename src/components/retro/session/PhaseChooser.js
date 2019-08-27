import React, { Component } from 'react';
import Clustering from './phase/Clustering';
import PositivesNegatives from './phase/PositivesNegatives';
import WhatHappened from './phase/WhatHappened';
import Error from './phase/Error';

import { RETRO_PHASE } from '../../../commons/Constants';

class PhaseChooser extends Component {

    render() {
        const { phase } = this.props.phase;
        const retroId = this.props.retroId;

        if (phase.identifier === RETRO_PHASE.WHAT_HAPPENDED.identifier) {
            return <WhatHappened phase={phase} retroId={retroId} />
        } else if (phase.identifier === RETRO_PHASE.POSITIVES_AND_NEGATIVES.identifier) {
            return <PositivesNegatives phase={phase} retroId={retroId} />
        } else if (phase.identifier === RETRO_PHASE.CLUSTERING.identifier) {
            return <Clustering phase={phase} retroId={retroId} />
        } else {
            return <Error />
        }
    }
}

export default PhaseChooser;