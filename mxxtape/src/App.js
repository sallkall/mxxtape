import React from 'react';
import ReactDOM from 'react-dom';

// Importing react-router-dom to use the React Router
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';


// Importing the Queue and our simple Home Page
import Community from './react-components/Community';
import Dashboard from './react-components/Dashboard';
import Profile from './react-components/Profile'
import LoginPage from './react-components/LoginPage'

class App extends React.Component {

    // a 'global' state that you can pass through to any child components of App.
    //   In the Routes below they are passed to both the Home and Queue states.
    state = {
        community: "community",
        profile: "profile",
        dashboard: "dashboard",
        loggedIn: -1,
        handleLoggedIn: (val) => {
            console.log("handleLogin", val);
            if (val === 1 || val === 2 || val === 3){
                this.setState({loggedIn: val}, () => {console.log(this.state)});
            }
        },
        handleLogOut: () => {
            console.log("Logout", -1);
            this.setState({loggedIn: -1}, () => {console.log(this.state)});
        }
    };

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
                        <Route exact path='/login' render={()=>
                            (<LoginPage state={this.state} handleLoggedIn={this.handleLoggedIn} />)}/>
                        {/*<Route exact path='/login' ><LoginPage state={this.state}/></Route>*/}
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
