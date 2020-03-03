import React from "react";

import "./styles.css";
import 'antd/dist/antd.css';
import {Badge, Icon} from "antd";

class NavigationNotification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user ? this.props.user : -1,
        }
    }

    render() {
        const notification_list = [1, 2, 3];

        return (
            <Badge count={notification_list.length}>
                <Icon type="compass" theme="twoTone" />
                Notifications
            </Badge>
        )
    }
}
export default NavigationNotification;