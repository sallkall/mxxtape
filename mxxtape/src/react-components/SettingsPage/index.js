import React from "react";
import Nav from "../Navigation";
import {Redirect} from "react-router-dom";
import UserSettingsForm from "./UserSettingsForm";
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
                UserSettingsForm
            );
            return (
                <div>
                    <Nav state={ state }/>
                    <div className="settingsForm" >
                        <UserSettings state={ state }/>
                    </div>
                </div>
            )
        } else if (state.loggedIn === 2) {
            const AdminSettings = Form.create({name: "adminSettings"})(
                UserSettingsForm
            );
            return (
                <div>
                    <Nav state={ state }/>
                    <div className="settingsForm" >
                        Welcome admin.
                        <AdminSettings state={state}/>
                    </div>
                </div>
            )
        }
    }

}

export default SettingsPage;