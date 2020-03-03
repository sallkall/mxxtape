import React from "react";

import "./index.css";
import 'antd/dist/antd.css';
import {List} from "antd";
import {getUserInfo} from "../../Navigation/NotificationBadge";

class NotificationsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: this.props.loggedIn ? this.props.loggedIn : -1,
            notice: []
        }
    }

    componentDidMount() {
        if (this.state.loggedIn && this.state.loggedIn !== -1) {
            const userInfo = getUserInfo(this.state.loggedIn);
            this.setState(
                {
                    userInfo: userInfo,
                },
                () => {
                    console.log("notifications list mounted, userinfo:", this.state.userInfo)
                }
            )
        }
    }

    render() {

        return (
            <List>
                <List.Item>
                    <List.Item.Meta
                        title={this.state.loggedIn}
                        description={"this.state.username"}
                    />
                </List.Item>
                <List.Item>
                    <List.Item.Meta
                        title={"Username"}
                        description={"this.state.username"}
                    />
                </List.Item>
                <List.Item>
                    <List.Item.Meta
                        title={"Username"}
                        description={"this.state.username"}
                    />
                </List.Item>
            </List>
        )
    }
}
export default NotificationsList;