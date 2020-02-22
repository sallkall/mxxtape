import React from 'react';
import ReactDOM from 'react-dom';

// Importing react-router-dom to use the React Router
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';


// Importing the Queue and our simple Home Page
import Community from './react-components/Community/Admin';
import Dashboard from './react-components/Dashboard';
import Profile from './react-components/Profile'

class App extends React.Component {

    // a 'global' state that you can pass through to any child componenets of App.
    //   In the Routes below they are passed to both the Home and Queue states.
    state = {
        community: "community",
        profile: "profile"
    }

    render() {
        return (
            <div>
            <BrowserRouter>
            <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
        { /* Each Route below shows a different component depending on the exact path in the URL  */ }
                <Route exact path='/' render={() =>
                    (<Dashboard state={this.state}/>)}/>
                <Route exact path='/community' render={() =>
                    (<Community state={this.state}/>)}/>
                <Route exact path='/profile' render={() =>
                    (<Profile state={this.state}/>)}/>
            </Switch>
            </BrowserRouter>
            </div>
        );
    }
}

export default App;
