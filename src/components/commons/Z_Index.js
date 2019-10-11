const zIndexes = {
    'WHAT_HAPPENDED' : 100,
    'POSITIVES_AND_NEGATIVES': 200,
    'CLUSTERING': 400
}

export const incrementZIndex = (phase) => {
    let index = zIndexes.WHAT_HAPPENDED;
    index++;
    zIndexes.WHAT_HAPPENDED = index;
    console.log(zIndexes.WHAT_HAPPENDED);
}