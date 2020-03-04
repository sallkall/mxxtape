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

class App extends React.Component {

    // a 'global' state that you can pass through to any child components of App.
    //   In the Routes below they are passed to both the Home and Queue states.
    state = {
        community: "community",
        profile: "profile",
        dashboard: "dashboard",
        forgot_password: 'forgot_password',
        register: 'register',
        create_community: 'create-community',
        notifications: 'notifications',
        //loggedIn is -1 if not logged in 1 to "user", 2 for "admin"
        //will eventually be replaced with a user's information in login
        loggedIn: -1,
        handleLoggedIn: (val) => {
            console.log("handleLogin", val);
            if (val === 1 || val === 2 || val === 3){
                this.setState(
                    {loggedIn: val},
                    () => {console.log(this.state)}
                );
            }
        },
        handleLogOut: () => {
            console.log("Logout", -1);
            this.setState(
                {loggedIn: -1},
                () => {console.log(this.state)}
            );
        },
        updateGlobal: () => {
            console.log("state.updateGlobal");
            this.setState(
                {update: this.state.update? this.state.update + 1 : 0}
            )
        }
    };

    render() {
        if (this.state.loggedIn === -1) {
            return(
                <div>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path='/'>
                                <LoginPage state={this.state}/>
                            </Route>
                            <Route exact path={'/register'} ><RegisterPage state={this.state}/></Route>
                            <Route exact path={'/forgot_password'}><ForgotPassword state={this.state}/></Route>
                            <Route path="*">
                                <Redirect path={'/'}/>
                            </Route>
                        </Switch>
                    </BrowserRouter>
                </div>
            )
        } else if (this.state.loggedIn === 1) {
            return (
                <div>
                    <BrowserRouter>
                        <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
                            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
                            <Route exact path='/'>
                                <UserDashboard state={this.state}/>
                            </Route>
                            <Route path='/dashboard'>
                                <UserDashboard state={this.state}/>
                            </Route>
                            <Route exact path='/login'>
                                <Redirect path={'/'}/>
                            </Route>
                            <Route exact path={'/register'} render={()=>
                                (<RegisterPage state={this.state}/>)}/>
                            <Route exact path={'/forgot_password'} render={()=>
                                (<ForgotPassword state={this.state}/>)}/>
                            <Route exact path='/settings' render={()=>
                                (<SettingsPage state={this.state}/>)}/>
                            <Route exact path='/community/jazzitup' render={() =>
                                (<Community state={this.state}/>)}/>)}/>
                            <Route exact path={'/' + this.state.create_community} render={() =>
                                (<CreateCommunityPage state={this.state}/>)}/>
                            <Route path='/history' render={()=>
                                (<History state={this.state}/>)}/>
                            <Route path='/subscriptions' render={()=>
                                (<SubbedCommunities state={this.state}/>)}/>
                            <Route path='/profile' render={()=>
                                (<UserProfile state={this.state}/>)}/>
                            <Route exact path={'/' + this.state.notifications} render={()=>
                                (<NotificationsPage state={this.state}/>)}/>
                            <Route path="*">
                                <NoMatch state={this.state}/>
                            </Route>
                        </Switch>
                    </BrowserRouter>
                </div>
            );
        } else if (this.state.loggedIn === 2) { //admin versions
            return (
                <div>
                    <BrowserRouter>
                        <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
                            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
                            <Route exact path='/'>
                                <AdminDashboard state={this.state}/>
                            </Route>
                            <Route exact path='/login'>
                                <Redirect path={'/'}/>
                            </Route>
                            <Route exact path={'/' + this.state.register} render={()=>
                                (<RegisterPage state={this.state}/>)}/>
                            <Route exact path={'/' + this.state.forgot_password} render={()=>
                                (<ForgotPassword state={this.state}/>)}/>
                            <Route exact path='/settings' render={()=>
                                (<SettingsPage state={this.state}/>)}/>
                            <Route exact path='/community/jazzitup' render={() =>
                                (<CommunityAdmin state={this.state}/>)}/>
                            <Route exact path={'/' + this.state.create_community} render={() =>
                                (<CreateCommunityPage state={this.state}/>)}/>
                            <Route path='/history' render={()=>
                                (<History state={this.state}/>)}/>
                            <Route path='/subscriptions' render={()=>
                                (<SubbedCommunities state={this.state}/>)}/>
                            <Route path='/profile' render={()=>
                                (<UserProfile state={this.state}/>)}/>
                            <Route exact path={'/' + this.state.notifications} render={()=>
                                (<NotificationsPage state={this.state}/>)}/>
                            <Route path="*">
                                <NoMatch state={this.state}/>
                            </Route>
                        </Switch>
                    </BrowserRouter>
                </div>
            );
        } else {
            return (
                <div>
                    <BrowserRouter>
                        <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
                            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
                            <Route exact path='/'>
                                <UserDashboard state={this.state}/>
                            </Route>
                            <Route exact path='/login'>
                                <Redirect path={'/'}/>
                            </Route>
                            <Route exact path={'/' + this.state.register} render={()=>
                                (<RegisterPage state={this.state}/>)}/>
                            <Route exact path={'/' + this.state.forgot_password} render={()=>
                                (<ForgotPassword state={this.state}/>)}/>
                            <Route exact path='/settings' render={()=>
                                (<SettingsPage state={this.state}/>)}/>
                            <Route exact path='/community/jazzitup' render={() =>
                                (<Community state={this.state}/>)}/>
                            <Route exact path='/community/jazzitup/admin' render={() =>
                                (<CommunityAdmin state={this.state}/>)}/>
                            <Route exact path={'/' + this.state.create_community} render={() =>
                                (<CreateCommunityPage state={this.state}/>)}/>
                            <Route path='/history' render={()=>
                                (<History state={this.state}/>)}/>
                            <Route path='/subscriptions' render={()=>
                                (<SubbedCommunities state={this.state}/>)}/>
                            <Route exact path='/admin' render={()=>
                                (<AdminDashboard state={this.state}/>)}/>
                            <Route path='/profile' render={()=>
                                (<UserProfile state={this.state}/>)}/>
                            <Route path='/dashboard/Connor' render={()=>
                                (<UserDashboard state={this.state}/>)}/>
                            <Route exact path={'/' + this.state.notifications} render={()=>
                                (<NotificationsPage state={this.state}/>)}/>
                            <Route path="*">
                                <NoMatch state={this.state}/>
                            </Route>
                        </Switch>
                    </BrowserRouter>
                </div>
            );
        }
    }
}

export default App;