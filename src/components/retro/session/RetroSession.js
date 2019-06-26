import React, { Component } from 'react';
import { Button } from 'react-materialize';
import { RETRO_PHASE } from '../../../commons/Constants';
import PhaseNavigation from './PhaseNavigation';
import PhaseChooser from './PhaseChooser';
import withAuth from '../../commons/hoc/withAuth';

class RetroSession extends Component {

    constructor(props) {
        super(props);

        const INITIAL_PHASES = [
            {
                phase: RETRO_PHASE.WHAT_HAPPENDED,
                component: <a key="0" className="breadcrumb" onClick={(e) => this.changeToPhase(e, 1)} href="">What happened</a>
            },
            {
                phase: RETRO_PHASE.POSITIVES_AND_NEGATIVES,
                component: <a key="1" className="breadcrumb" onClick={(e) => this.changeToPhase(e, 2)} href="">Positives & Negatives</a>
            },
            {
                phase: RETRO_PHASE.CLUSTERING,
                component: <a key="2" className="breadcrumb" onClick={(e) => this.changeToPhase(e, 3)} href="">Clustering</a>
            }
        ];

        this.state = {
            phases: INITIAL_PHASES,
            currentPhase: 1
        };

        this.retrieveValidPhases = this.retrieveValidPhases.bind(this);
        this.retrieveColor = this.retrieveColor.bind(this);
        this.changeToPhase = this.changeToPhase.bind(this);
        this.getNextPhaseButton = this.getNextPhaseButton.bind(this);
        this.goToNextPhase = this.goToNextPhase.bind(this);
    }

    retrieveValidPhases() {
        const { phases, currentPhase } = this.state;

        const allPhases = phases.slice(0, currentPhase);

        const validPhases = allPhases.map(phase => {
            return (
                phase.component
            );
        });

        return validPhases;
    }

    retrieveColor() {
        const { phases, currentPhase } = this.state;
        return phases[currentPhase - 1].phase.color;
    }

    changeToPhase(e, phase) {
        e.preventDefault();
        this.setState({ currentPhase: phase });
    }

    getNextPhaseButton() {
        const { phases, currentPhase } = this.state;

        const color = currentPhase !== phases.length ? phases[currentPhase].phase.color : "grey darken-3";
        const label = currentPhase !== phases.length ? phases[currentPhase].phase.label : "Finish";

        return <Button onClick={this.goToNextPhase} className={color}>{label}</Button>
    }

    goToNextPhase() {
        const { phases, currentPhase } = this.state;

        if (currentPhase !== phases.length)
            this.setState({ currentPhase: this.state.currentPhase + 1 });
    }

    render() {
        const { phases, currentPhase } = this.state;

        return (
            <div>
                <PhaseNavigation
                    retrieveColor={this.retrieveColor()}
                    retrieveValidPhases={this.retrieveValidPhases()}
                    getNextPhaseButton={this.getNextPhaseButton()}
                />
                <PhaseChooser phase={phases[currentPhase -1]} />
            </div>
        );
    }
}

export default withAuth(RetroSession);