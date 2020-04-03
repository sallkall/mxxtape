import React from "react";
import Nav from "../Navigation";
import SettingsForm from "./SettingsForm";
import './index.css'
import {Form} from "antd";

class SettingsPage extends React.Component {

    render() {
        const {app} = this.props;
        //will need api call to find out if the user is an admin or regular user
        const UserSettings = Form.create({name: "userSettings"})(
            SettingsForm
        );
        return (
            <div className="settings-page">
                <Nav app={ this.props.app }/>
                <div className="settingsForm" >
                    {app.state.loggedIn === 2 ?
                        <header id="settings-header-admin">Welcome, admin user.</header> :
                        ''}
                    <UserSettings state={ this.props.app.state } username={app.state.currentUser}/>

                </div>
            </div>
        )
    }

}

export default SettingsPage;