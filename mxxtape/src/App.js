import React from 'react';

// Importing react-router-dom to use the React Router
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';


// Importing the Queue and our simple Home Page
import Community from './react-components/Community/User';
import CommunityAdmin from './react-components/Community/Admin';
import UserDashboard from './react-components/UserDashboard';
import LoginPage from './react-components/LoginPage';
import History from './react-components/History';
import SubbedCommunities from './react-components/SubbedCommunities';
import AdminDashboard from './react-components/AdminDashboard';
import UserProfile from './react-components/UserProfile';
import RegisterPage from './react-components/RegisterPage';
import SettingsPage from "./react-components/SettingsPage";
import ForgotPassword from "./react-components/ForgotPasswordPage";
import CreateCommunityPage from "./react-components/CreateCommunityPage";
import NotificationsPage from "./react-components/NotificationsPage";
import NoMatch from "./react-components/NoMatch";

import { readCookie } from "./actions/user";

class App extends React.Component {
    constructor(props) {
        super(props);
        readCookie(this);
    }

    // a 'global' state that you can pass through to any child components of App.
    //   In the Routes below they are passed to both the Home and Queue states.
    state = {
        //the username of the current user that is logged in
        currentUser: null,
        //loggedIn gives the logged in currentUser type: is null if not logged in otherwise:
        //  1 for regular user
        //  2 for admin
        loggedIn: null,
        community: "community",
        profile: "profile",
        dashboard: "dashboard",
        forgot_password: 'forgot_password',
        register: 'register',
        create_community: 'create-community',
        notifications: 'notifications',
        handleLogOut: () => {
            console.log("Logout");
            // this.setState(
            //     {loggedIn: null},
            //     () => {
            //         console.log(this.state)
            //     }
            // );
        },
        updateGlobal: () => {
            console.log("state.updateGlobal");
            this.setState(
                {update: this.state.update ? this.state.update + 1 : 0}
            )
        }
    };

    render() {
        if (this.state.loggedIn){ // loggedIn is not null
            return (
                <BrowserRouter>
                    <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
                        { /* Each Route below shows a different component depending on the exact path in the URL  */ }
                        <Route
                            exact
                            path={['/', '/dashboard', '/login']}
                            render={ (history) => {
                                if (this.state.loggedIn === 1) {
                                    return <UserDashboard history={history} app={this}/>
                                } else if (this.state.loggedIn === 2) {
                                    return <AdminDashboard history={history} state={this.state} app={this}/>
                                } else {
                                    // should call logout here
                                    this.state.handleLogOut();
                                    return <LoginPage history={history} app={this}/>
                                }
                            }}
                        />
                        <Route exact path={'/' + this.state.register} render={()=>
                            (<Redirect path='/'/>)}/>
                        <Route exact path={'/' + this.state.forgot_password} render={()=>
                            (<Redirect path='/'/>)}/>
                        <Route exact path='/settings' render={()=>
                            (<SettingsPage state={this.state}/>)}/>
                        <Route
                            exact
                            path='/community/jazzitup'
                            render={() => {
                                if (this.state.loggedIn === 1) {
                                    return <Community state={this.state} app={this}/>
                                } else if (this.state.loggedIn === 2) {
                                    return <CommunityAdmin state={this.state} app={this}/>
                                } else {
                                    return <Redirect path='/'/>
                                }
                            }
                        }/>
                        <Route exact path={'/' + this.state.create_community} render={() =>
                            (<CreateCommunityPage state={this.state} app={this}/>)}/>
                        <Route path='/history' render={()=>
                            (<History state={this.state} app={this}/>)}/>
                        <Route path='/subscriptions' render={()=>
                            (<SubbedCommunities state={this.state} app={this}/>)}/>
                        <Route path='/profile' render={()=>
                            (<UserProfile state={this.state} app={this}/>)}/>
                        <Route exact path={'/' + this.state.notifications} render={()=>
                            (<NotificationsPage state={this.state} app={this}/>)}/>
                        <Route path="*" render={()=><NoMatch state={this.state} app={this}/>}/>
                    </Switch>
                </BrowserRouter>
            );
        }
        else{
            return (
                <div>
                    <BrowserRouter>
                        <Switch>
                            <Route exact
                                   path={[
                                       '/', '/dashboard', '/login', '/settings', '/community/jazzitup',
                                       '/' + this.state.create_community,'/history','/subscriptions','/profile',
                                       '/' + this.state.notifications
                                   ]}
                                   render={() => <LoginPage app={this}/>}
                            />
                            <Route exact path='/register' render={() => <RegisterPage state={this.state}/>}/>
                            <Route exact path='/forgot_password' render={() => <ForgotPassword state={this.state}/>}/>
                            <Route path="*" render={()=><NoMatch state={this.state}/>}/>
                        </Switch>
                    </BrowserRouter>
                </div>
            );
        }
    }
}

export default App;