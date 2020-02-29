import React from "react";
import Nav from "../Navigation";
import {Redirect} from "react-router-dom";
import UserSettingsForm from "./UserSettingsForm";
import './index.css'

class SettingsPage extends React.Component {

    render() {
        const { state } = this.props;

        if (state.loggedIn === -1) {
            return (<Redirect to='/login'/>)
        } else if (state.loggedIn === 1) {
            // const UserSettingsForm
            return (
                <div>
                    <Nav state={ state }/>
                    <div className="settingsForm" >
                        <UserSettingsForm state={state}/>
                    </div>

                </div>
            )
        }
    }

}

export default SettingsPage;