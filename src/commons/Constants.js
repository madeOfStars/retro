export const NO_TEAM = 'NO_TEAM';

export const RETRO_STATUS = {
    OPEN: { status: 'OPEN', label: 'Open' },
    ONGOING: { status: 'ONGOING', label: 'Ongoing' },
    CLOSED: { status: 'CLOSED', label: 'Closed' }
};

export const ACCESSIBILITY_TO_RETRO_SESSION = {
    PARTICIPATING: { displayRetroLabel: true },
    VIEW_ONLY: { displayRetroLabel: true },
    OFFLINE: { displayRetroLabel: false }
}

export const RETRO_PHASE = {
    WHAT_HAPPENDED: {
        identifier: 'WHAT_HAPPENDED',
        label: "What happened",
        color: "yellow darken-2",
    },
    POSITIVES_AND_NEGATIVES: {
        identifier: 'POSITIVES_AND_NEGATIVES',
        label: "Positives & Negatives",
        color: "green darken-3"
    },
    CLUSTERING: {
        identifier: 'CLUSTERING',
        label: "Clustering",
        color: "red lighten-2"
    }
}

export const MAX_CHARS_PER_NOTE = 50