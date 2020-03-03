import React from "react";

import "./styles.css";
import 'antd/dist/antd.css';
import {Badge, Icon} from "antd";

//information from server for jazzy cat
let unreadnotice = [
    {
        read: false,
        postId: 20,
        author: "jazzy cat",
        avatar: "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/s150x150/83885851_189723372356264_5738621742125501341_n.jpg?_nc_ht=scontent-yyz1-1.cd…",
        content: "bahahaha",
        timestamp: "2020-03-03 01:51:16",
        updatedAt:"2020-03-03 01:51:16",
        community:"jazz it up"
    },
    {
        read: false,
        postId: 19,
        author: "Sally Kang",
        avatar: 'https://scontent.fyto1-1.fna.fbcdn.net/v/t1.0-9/83337570_3515329088508799_4523582417981669376_n.jpg?_nc_cat=104&_nc_sid=85a577&_nc_ohc=6unpVlo76lgAX_kJl9K&_nc_ht=scontent.fyto1-1.fna&oh=b515f36742c04f5c702bf2426e9f0739&oe=5EF63A44',
        content: "Welcome to jazz it up",
        timestamp: "2020-03-03 01:51:17",
        updatedAt:"2020-03-03 01:51:17",
        community:"jazz it up"
    },
    {
        read: false,
        postId: 18,
        author: "Connor Ferwerda",
        avatar: 'https://scontent-yyz1-1.xx.fbcdn.net/v/t1.0-9/17796794_111333216080695_8382139360744649163_n.jpg?_nc_cat=111&_nc_sid=85a577&_nc_ohc=Gf4HcH4bUcQAX_g6YG3&_nc_ht=scontent-yyz1-1.xx&oh=f5c0629f62f78998651c403538c80b3e&oe=5EEE926E',
        content: "Lorem...ipsum???",
        timestamp: "2020-03-03 01:51:18",
        updatedAt:"2020-03-03 01:51:18",
        community:"jazz it up"
    }
];

const readNotice = [
    {
        read: true,
        postId: 20,
        author: "jazzy cat",
        avatar: "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/s150x150/83885851_189723372356264_5738621742125501341_n.jpg?_nc_ht=scontent-yyz1-1.cd…",
        content: "bahahaha",
        timestamp: "2020-03-03 01:51:16",
        updatedAt:"2020-03-03 01:51:16",
        community:"jazz it up"
    },
    {
        read: true,
        postId: 19,
        author: "Sally Kang",
        avatar: 'https://scontent.fyto1-1.fna.fbcdn.net/v/t1.0-9/83337570_3515329088508799_4523582417981669376_n.jpg?_nc_cat=104&_nc_sid=85a577&_nc_ohc=6unpVlo76lgAX_kJl9K&_nc_ht=scontent.fyto1-1.fna&oh=b515f36742c04f5c702bf2426e9f0739&oe=5EF63A44',
        content: "Welcome to jazz it up",
        timestamp: "2020-03-03 01:51:17",
        updatedAt:"2020-03-03 01:51:17",
        community:"jazz it up"
    },
    {
        read: true,
        postId: 18,
        author: "Connor Ferwerda",
        avatar: 'https://scontent-yyz1-1.xx.fbcdn.net/v/t1.0-9/17796794_111333216080695_8382139360744649163_n.jpg?_nc_cat=111&_nc_sid=85a577&_nc_ohc=Gf4HcH4bUcQAX_g6YG3&_nc_ht=scontent-yyz1-1.xx&oh=f5c0629f62f78998651c403538c80b3e&oe=5EEE926E',
        content: "Lorem...ipsum???",
        timestamp: "2020-03-03 01:51:18",
        updatedAt:"2020-03-03 01:51:18",
        community:"jazz it up"
    }
];

//information from server for jazzycat
const userInfo = {
    name: "jazzy cat",
    notifyCount: 12, // from server
    unreadCount: 3, // from server
    notice: unreadnotice
};

export function getUserInfo(user, callback) {
    if (user && user !== -1) {
        // get user's notification list and update state
        console.log("got unread notifications list from server");

        callback(userInfo);
    } else {
        // callback([]);
        console.log("no users here");
        callback(userInfo);
    }
}

export function getUserNotices(user, callback) {
    if (user && user !== -1) {
        // get user's notification list and update state
        console.log("got more notifications from server");

        callback(unreadnotice);
    } else {
        console.log("no users here");
        callback([]);
    }
}

export function getMoreNotices(user, callback) {
    if (user && user !== -1) {
        // get user's notification list and update state
        console.log("got more notifications from server");

        callback(readNotice);
    } else {
        callback([]);
    }
}

class NotificationBadge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user ? this.props.user : -1,
        }
    }

    componentDidMount() {
        if (this.state.user) {
            getUserInfo(
                this.state.user, userInfo => {this.setState(
                {
                    userInfo: userInfo,
                },
                () => {
                    console.log("Notification badge mounted, userinfo:", this.state.userInfo)
                }
            )});
        }
    }

    render() {
        let unreadNotifs = this.state.userInfo ? this.state.userInfo.unreadCount : 0;
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
export default NotificationBadge;