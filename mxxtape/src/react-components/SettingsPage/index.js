import React from "react";
import Nav from "../Navigation";
import {Redirect} from "react-router-dom";
import SettingsForm from "./SettingsForm";
import './index.css'
import {Form} from "antd";

class SettingsPage extends React.Component {

    render() {

        //will need api call to find out if the user is an admin or regular user
        if (this.props.app.state.loggedIn === 1) {
            const UserSettings = Form.create({name: "userSettings"})(
                SettingsForm
            );
            return (
                <div>
                    <Nav app={ this.props.app }/>
                    <div className="settingsForm" >
                        <UserSettings state={ this.props.app.state } username="user"/>
                    </div>
                </div>
            )
        } else if (this.props.app.state.loggedIn === 2) {
            const AdminSettings = Form.create({name: "adminSettings"})(
                SettingsForm
            );
            return (
                <div>
                    <Nav app={ this.props.app }/>
                    <div className="settingsForm" >
                        <header id="settings-header-admin">Welcome, admin user.</header>
                        <AdminSettings state={this.props.app.state} username="admin" isAdmin={true}/>
                    </div>
                </div>
            )
        } else {
            return (<Redirect to='/login'/>)
        }
    }

}

export default SettingsPage;