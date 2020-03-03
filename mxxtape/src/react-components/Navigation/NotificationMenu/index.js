import React from "react";

import "./styles.css";
import 'antd/dist/antd.css';
// import Nav from "../Navigation";
import {Badge, Dropdown, Icon, Menu} from "antd";

class NotificationMenu extends React.Component {
    render() {
        const {state} = this.props;
        return (
            <Dropdown>
                <Menu title="Notifications">
                    <Menu.Item key="setting:1">Notification 1</Menu.Item>
                    <Menu.Item key="create-community">Notification 2</Menu.Item>
                </Menu>
            </Dropdown>
        )
    }
}
export default NotificationMenu;