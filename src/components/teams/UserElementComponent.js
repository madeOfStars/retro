import React, { Component } from 'react';
import { CollectionItem } from 'react-materialize';

class UserElementComponent extends Component {
    render() {
        const { user, title, action, button } = this.props;

        return (
            <CollectionItem key={user.key}>
                <span className="title">{title}</span>
                <a href="" onClick={(e) => action(e, user)} className="secondary-content">
                    <i id={user.key} className="material-icons pink-text lighten-1">{button}</i>
                </a>
            </CollectionItem>
        );
    }
}

export default UserElementComponent;