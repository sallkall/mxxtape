import React from "react";
import Nav from "../Navigation";
import {Redirect} from "react-router-dom";
import SettingsForm from "./SettingsForm";
import './index.css'
import {Form} from "antd";

class SettingsPage extends React.Component {

    render() {

        //will need api call to find out if the user is an admin or regular user
        const UserSettings = Form.create({name: "userSettings"})(
            SettingsForm
        );
        return (
            <div className="settings-page">
                <Nav app={ this.props.app }/>
                <div className="settingsForm" >
                    {this.props.app.state.loggedIn === 2 ?
                        <header id="settings-header-admin">Welcome, admin user.</header> :
                        ''}
                    {this.props.app.state.loggedIn === 2 ?
                        <UserSettings state={ this.props.app.state } username="admin" isAdmin={true}/>:
                        <UserSettings state={ this.props.app.state } username="user"/>}

                </div>
            </div>
        )
    }

}

export default SettingsPage;