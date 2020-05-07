import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ManageTeams from './components/teams/ManageTeams';
import EditTeam from './components/teams/EditTeam';
import Dashboard from './components/dashboard/Dashboard';
import RetroSession from './components/retro/session/RetroSession';
import ConclusionsList from './components/retro/conclusions/ConclusionsList';

import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

class App extends Component {
  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route path='/signin' component={SignIn} />
              <Route path='/signup' component={SignUp} />
              <Route path='/dashboard' component={Dashboard} />
              <Route path="/teams/:id" component={EditTeam} />
              <Route path='/teams' component={ManageTeams} />
              <Route path="/retro/:id" component={RetroSession} />
              <Route path="/conclusions/:id" component={ConclusionsList} />
            </Switch>
          </div>
        </BrowserRouter>
      </DndProvider>
    );
  }
}

export default App;