import React from "react";
import Nav from "../Navigation";
import {Redirect} from "react-router-dom";
import UserSettingsForm from "./UserSettingsForm";
import './index.css'

class SettingsPage extends React.Component {

    render() {
        const { state } = this.props;

        //will need api call to find out if the user is an admin or regular user
        if (state.loggedIn === -1) {
            return (<Redirect to='/login'/>)
        } else if (state.loggedIn === 1) {
            return (
                <div>
                    <Nav state={ state }/>
                    <div className="settingsForm" >
                        <UserSettingsForm state={state}/>
                    </div>
                </div>
            )
        } else if (state.loggedIn === 2) {
            return (
                <div>
                    <Nav state={ state }/>
                    <div className="settingsForm" >
                        Welcome admin.
                        <UserSettingsForm state={state}/>
                    </div>
                </div>
            )
        }
    }

}

export default SettingsPage;