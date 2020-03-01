import React from "react";
import Nav from "../Navigation";
import {Redirect} from "react-router-dom";
import SettingsForm from "./SettingsForm";
import './index.css'
import {Form} from "antd";

class SettingsPage extends React.Component {

    render() {
        const { state } = this.props;

        //will need api call to find out if the user is an admin or regular user
        if (state.loggedIn === -1) {
            return (<Redirect to='/login'/>)
        } else if (state.loggedIn === 1) {
            const UserSettings = Form.create({name: "userSettings"})(
                SettingsForm
            );
            return (
                <div>
                    <Nav state={ state }/>
                    <div className="settingsForm" >
                        <UserSettings state={ state } username="user"/>
                    </div>
                </div>
            )
        } else if (state.loggedIn === 2) {
            const AdminSettings = Form.create({name: "adminSettings"})(
                SettingsForm
            );
            return (
                <div>
                    <Nav state={ state }/>
                    <div className="settingsForm" >
                        Welcome admin.
                        <AdminSettings state={state} username="admin"/>
                    </div>
                </div>
            )
        }
    }

}

export default SettingsPage;