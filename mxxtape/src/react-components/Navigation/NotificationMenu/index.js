import React from "react";

import "./styles.css";
import 'antd/dist/antd.css';
import Nav from "../Navigation";

class NotificationMenu extends React.Component {
    render() {
        const {state} = this.props;
        return (
            <div><Nav state={state} /></div>
        )
    }
}
export default NotificationMenu;