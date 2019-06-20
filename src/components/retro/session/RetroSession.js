import React, { Component } from 'react';
import { Breadcrumb, Button } from 'react-materialize';

class RetroSession extends Component {

    constructor(props) {
        super(props);

        const INITIAL_PHASES = {
            0: {
                component: <a key="0" onClick={(e) => this.changeToPhase(e, 1)} href="">What happened</a>,
                color: "yellow darken-2"
            },
            1: {
                component: <a key="1" onClick={(e) => this.changeToPhase(e, 2)} href="">Positives</a>,
                color: "green darken-3"
            },
            2: {
                component: <a key="2" onClick={(e) => this.changeToPhase(e, 3)} href="">Negatives</a>,
                color: "red"
            },
            3: {
                component: <a key="3" onClick={(e) => this.changeToPhase(e, 4)} href="">Clustering</a>,
                color: "red lighten-2"
            }
        };

        this.state = {
            phases: INITIAL_PHASES,
            currentPhase: 4
        };

        this.retrieveValidPhases = this.retrieveValidPhases.bind(this);
        this.retrieveColor = this.retrieveColor.bind(this);
        this.changeToPhase = this.changeToPhase.bind(this);
        this.getButton = this.getButton.bind(this);
    }

    retrieveValidPhases() {
        const { phases, currentPhase } = this.state;

        let allPhases = Object.keys(phases)
            .filter(key => {
                return parseInt(key) < currentPhase;
            })
            .map(key => {
                return (
                    phases[key].component
                );
            });

        return allPhases;
    }

    retrieveColor() {
        const { phases, currentPhase } = this.state;
        return phases[currentPhase - 1].color;
    }

    changeToPhase(e, phase) {
        e.preventDefault();
        this.setState({ currentPhase: phase });
    }

    getButton() {
        return <Button>Hello</Button>
    }

    render() {
        return (
            <Breadcrumb className={this.retrieveColor()} name="phase">
                {this.retrieveValidPhases()}
            </Breadcrumb>
        );
    }
}

export default RetroSession;