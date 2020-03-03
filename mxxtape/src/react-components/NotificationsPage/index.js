import React from "react";

import "./index.css";
import 'antd/dist/antd.css';
import Nav from "../Navigation";
import NotificationsList from "./NotificationsList";

class NotificationsPage extends React.Component {
    render() {
        const {state} = this.props;

        return (
            <div>
                <Nav state={state} />
                <div className="notifications-page">
                    <header className="notifications-page-header">
                        Notifications
                    </header>
                    <hr/>
                    <NotificationsList loggedIn={state.loggedIn} updateGlobal={state.updateGlobal}/>
                </div>
            </div>
        )
    }
}
export default NotificationsPage;