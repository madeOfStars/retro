import React, { Component } from 'react';

class PhaseNavigation extends Component {
    render() {
        return (
            <div className="col s12 row"  style={{marginBottom: '0px'}}>
                <nav>
                    <div className={"nav-wrapper " + this.props.retrieveColor}>
                        <div className="col s12 row">
                            <div className="col s9 align-left">
                                {this.props.retrieveValidPhases}
                            </div>
                            <div className="align-right">
                                {this.props.getNextPhaseButton}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

        );
    }
}

export default PhaseNavigation;