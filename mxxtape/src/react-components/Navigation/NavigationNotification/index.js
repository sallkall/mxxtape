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

    componentDidMount() {
        if (this.state.user) {
            this.getNotificationList(this.state.user);
        }
    }

    getNotificationList = (user) => {
        if (user && user !== -1) {
            // get user's notification list and update state
            console.log("got unread notifications list from server");
            const posts = [
                {
                    read: false,
                    postId: 5,
                    author: "jazzy cat",
                    avatar: "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/s150x150/83885851_189723372356264_5738621742125501341_n.jpg?_nc_ht=scontent-yyz1-1.cd…",
                    content: "bahahaha",
                    timestamp: "2020-03-03 01:51:16"
                },
                {
                    read: false,
                    postId: 4,
                    author: "Sally Kang",
                    avatar: 'https://scontent.fyto1-1.fna.fbcdn.net/v/t1.0-9/83337570_3515329088508799_4523582417981669376_n.jpg?_nc_cat=104&_nc_sid=85a577&_nc_ohc=6unpVlo76lgAX_kJl9K&_nc_ht=scontent.fyto1-1.fna&oh=b515f36742c04f5c702bf2426e9f0739&oe=5EF63A44',
                    content: "Welcome to jazz it up",
                    timestamp: "2020-03-03 01:51:17"
                },
                {
                    read: false,
                    postId: 3,
                    author: "Connor Ferwerda",
                    avatar: 'https://scontent-yyz1-1.xx.fbcdn.net/v/t1.0-9/17796794_111333216080695_8382139360744649163_n.jpg?_nc_cat=111&_nc_sid=85a577&_nc_ohc=Gf4HcH4bUcQAX_g6YG3&_nc_ht=scontent-yyz1-1.xx&oh=f5c0629f62f78998651c403538c80b3e&oe=5EEE926E',
                    content: "Lorem...ipsum???",
                    timestamp: "2020-03-03 01:51:18"
                }
            ];

            this.setState(
                {posts: posts},
                () => console.log(posts)
            );

            return posts;
        } else {
            return [];
        }
    };

    getUnreadNotifications = () => {
        let count = 0;
        if (this.state.posts) {
            for (let i = 0; i < this.state.posts.length; i++) {
                if (!this.state.posts[i].read) {
                    count ++
                }
            }
        }
        return count
    };

    render() {
        let unreadNotifs = this.state.posts ? this.getUnreadNotifications() : "";
        return (
            <Badge
                count={unreadNotifs}
                title={unreadNotifs + " unread notifications"}
            >
                <Icon type="bell" theme="twoTone" />
            </Badge>
        )
    }
}
export default NavigationNotification;