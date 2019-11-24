import { RETRO_PHASE } from './Constants';

var orderedPhases = [];
orderedPhases[RETRO_PHASE.WHAT_HAPPENDED.identifier] = {
    previousPhase: undefined,
    nextPhase: RETRO_PHASE.POSITIVES_AND_NEGATIVES
}
orderedPhases[RETRO_PHASE.POSITIVES_AND_NEGATIVES.identifier] = {
    previousPhase: RETRO_PHASE.WHAT_HAPPENDED,
    nextPhase: RETRO_PHASE.CLUSTERING
}
orderedPhases[RETRO_PHASE.CLUSTERING.identifier] = {
    previousPhase: RETRO_PHASE.POSITIVES_AND_NEGATIVES,
    nextPhase: undefined
}

export const getPreviousPhase = (phase) => {
    return orderedPhases[phase.identifier].previousPhase;
}

export const getNextPhase = (phase) => {
    return orderedPhases[phase].identifier.nextPhase;
}