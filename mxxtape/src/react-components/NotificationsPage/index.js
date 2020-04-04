import React from "react";

import "./index.css";
import 'antd/dist/antd.css';
import Nav from "../Navigation";
import NotificationsList from "./NotificationsList";

class NotificationsPage extends React.Component {
    render() {

        return (
            <div>
                <Nav app={this.props.app} />
                <div className="notifications-page">
                    <header className="notifications-page-header">
                        Notifications
                    </header>
                    <hr/>
                    <NotificationsList
                        loggedIn={this.props.app.state.loggedIn}
                        updateGlobal={this.props.app.state.updateGlobal}/>
                </div>
            </div>
        )
    }
}
export default NotificationsPage;