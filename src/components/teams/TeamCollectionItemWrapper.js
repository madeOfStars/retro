import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CollectionItem } from 'react-materialize';

class TeamCollectionItemWrapper extends Component {

    render() {
        return (
            <CollectionItem key={this.props.team.key}>
                <span className="title">{this.props.team.value.name}</span>
                <a href="" onClick={this.props.onDelete} className="secondary-content">
                    <i id={this.props.team.key} className="material-icons pink-text lighten-1">clear</i>
                </a>
                <Link to={'/teams/' + this.props.team.key} state={this.props.team} className="secondary-content">
                    <i id={this.props.team.key} className="material-icons pink-text lighten-1">edit</i>
                </Link>
            </CollectionItem>
        );
    }
}

export default TeamCollectionItemWrapper;