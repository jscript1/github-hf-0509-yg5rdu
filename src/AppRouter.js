import React, { Component } from 'react';
import { Route, Link, Router, Switch } from 'react-router-dom'
import Hello from './Hello'
import SignUp from './SignUp'
import SignIn from './SignIn'
import history from "./history";
import QuickHeader from './QuickHeader'
import QuickFooter from './QuickFooter'
import Dashboard from './Dashboard'
import TopAppBar from './TopAppBar'
import Pricing from './Pricing'
import NotFound from './NotFound'
import EditForm from './EditForm'

function AppRouter() {
  return (
    <Router history={history}>
      <div>
     {/*  <Route path="/" component={QuickHeader} /> */}
     <Route path="/" component={TopAppBar} />
       <Switch>
        <Route path="/hello" exact exact component={Hello} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/pricing" exact component={Pricing} />
        <Route path="/editform/:fid" exact component={EditForm} />
        <Route path="/" exact component={SignIn} />
        <Route component={NotFound} />
      </Switch>
     {/* <Route path="/" component={QuickFooter} /> */}
      </div>
    </Router>
  );
}

export default AppRouter;