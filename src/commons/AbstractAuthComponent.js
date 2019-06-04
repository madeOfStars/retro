import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class AbstractAuthComponent extends Component {
    secureAuth(auth) {
        if (!auth.uid) {
            return <Redirect to="/signin" />;
        }
    }
}

export default AbstractAuthComponent;