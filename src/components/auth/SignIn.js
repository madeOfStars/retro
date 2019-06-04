import React, { Component } from 'react';
import { Input, Button } from 'react-materialize';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { singIn } from '../../store/actions/auth/authActions';

export class SignIn extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.singIn(this.state);
    }

    render() {
        const { authError, auth } = this.props;
        
        if (auth.uid) {
            return <Redirect to="/dashboard" />;
        }

        return (
            <div className="row">
                <div className="col s4 offset-s4">
                    <form onSubmit={this.handleSubmit}>
                        <h5 className="grey-text text-darken-3">Sign In</h5>
                        <Input name='email' s={12} type='email' label="E-Mail" validate onChange={this.handleChange} />
                        <Input name='password' type='password' s={12} label="Password" onChange={this.handleChange} />
                        <Button className="btn pink lighten-1 z-depth-0">Sign In</Button>
                        <div className="red-text center">
                            {authError ? <p>{authError}</p> : null}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        singIn: (credentials) => dispatch(singIn(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)