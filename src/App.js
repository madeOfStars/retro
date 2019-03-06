import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ManageTeams from './components/teams/ManageTeams';
import EditTeam from './components/teams/EditTeam';
import Dashboard from './components/dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path="/teams/:id" component={EditTeam} />
            <Route path='/teams' component={ManageTeams} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;