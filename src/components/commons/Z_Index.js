import { RETRO_PHASE } from '../../commons/Constants';

var zIndexMap = {};
zIndexMap[RETRO_PHASE.WHAT_HAPPENDED.identifier] = 100;
zIndexMap[RETRO_PHASE.POSITIVES_AND_NEGATIVES.identifier] = 100;
zIndexMap[RETRO_PHASE.CLUSTERING.identifier] = 100;

export const incrementZIndex = (phase) => {
    let index = zIndexMap[phase];
    index++;
    zIndexMap[phase] = index;
    return zIndexMap[phase];
}