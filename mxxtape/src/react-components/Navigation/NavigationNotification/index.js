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

    getNotificationList = (user) => {
        if (user && user !== -1) {
            // get user's notification list and update state
            console.log("got unread notifications list from server");
            const unread_posts = [
                {
                    postId: 5,
                    author: "jazzy cat",
                    avatar: "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/s150x150/83885851_189723372356264_5738621742125501341_n.jpg?_nc_ht=scontent-yyz1-1.cd…",
                    content: "asdf",
                    timestamp: "2020-03-03 01:51:16"
                },
                {
                    postId: 4,
                    author: "jazzy cat",
                    avatar: "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/s150x150/83885851_189723372356264_5738621742125501341_n.jpg?_nc_ht=scontent-yyz1-1.cd…",
                    content: "asdf",
                    timestamp: "2020-03-03 01:51:16"
                },
                {
                    postId: 3,
                    author: "jazzy cat",
                    avatar: "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/s150x150/83885851_189723372356264_5738621742125501341_n.jpg?_nc_ht=scontent-yyz1-1.cd…",
                    content: "asdf",
                    timestamp: "2020-03-03 01:51:16"
                }
            ];

            console.log(unread_posts);

            return unread_posts;
        } else {
            return [];
        }
    };

    render() {
        const notification_list = this.getNotificationList(this.state.user);

        return (
            <Badge count={notification_list.length}>
                <Icon type="compass" theme="twoTone" />
                Notifications
            </Badge>
        )
    }
}
export default NavigationNotification;