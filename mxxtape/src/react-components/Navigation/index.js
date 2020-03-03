import React from "react";
import {Link, BrowserRouter as Router, withRouter} from "react-router-dom";

import "./styles.css";
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Menu, Icon, Input, Badge, Dropdown} from 'antd';
import NotificationMenu from "./NotificationMenu";

const {SubMenu} = Menu;
const {Search} = Input;

class Nav extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        current: 'menu_dashboard',
    };

    handleSearch(inputValue) {
        let cleanInput = inputValue.replace(/\s/g, "");
        const community_name = "/community/" + cleanInput;
        this.props.history.push(community_name);
    };

    redirect(addr) {
        console.log(addr);
        this.props.history.push(addr);
    };

    componentDidMount() {
        if (this.state.user) {
            this.getUserInfo(this.state.user);
        }
    }

    getUserInfo = (user) => {
        if (user && user !== -1) {
            // get user's notification list and update state
            console.log("got unread notifications list from server");
            const notice = [
                {
                    postId: 5,
                    author: "jazzy cat",
                    avatar: "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/s150x150/83885851_189723372356264_5738621742125501341_n.jpg?_nc_ht=scontent-yyz1-1.cd…",
                    content: "bahahaha",
                    timestamp: "2020-03-03 01:51:16",
                    updatedAt:"2020-03-03 01:51:16"
                },
                {
                    read: false,
                    postId: 4,
                    author: "Sally Kang",
                    avatar: 'https://scontent.fyto1-1.fna.fbcdn.net/v/t1.0-9/83337570_3515329088508799_4523582417981669376_n.jpg?_nc_cat=104&_nc_sid=85a577&_nc_ohc=6unpVlo76lgAX_kJl9K&_nc_ht=scontent.fyto1-1.fna&oh=b515f36742c04f5c702bf2426e9f0739&oe=5EF63A44',
                    content: "Welcome to jazz it up",
                    timestamp: "2020-03-03 01:51:17",
                    updatedAt:"2020-03-03 01:51:17"
                },
                {
                    read: false,
                    postId: 3,
                    author: "Connor Ferwerda",
                    avatar: 'https://scontent-yyz1-1.xx.fbcdn.net/v/t1.0-9/17796794_111333216080695_8382139360744649163_n.jpg?_nc_cat=111&_nc_sid=85a577&_nc_ohc=Gf4HcH4bUcQAX_g6YG3&_nc_ht=scontent-yyz1-1.xx&oh=f5c0629f62f78998651c403538c80b3e&oe=5EEE926E',
                    content: "Lorem...ipsum???",
                    timestamp: "2020-03-03 01:51:18",
                    updatedAt:"2020-03-03 01:51:18"
                },
                {
                    read: true,
                    postId: 2,
                    author: "Janet Wang",
                    avatar: 'https://scontent.fyto1-2.fna.fbcdn.net/v/t1.0-9/15871890_1178229362264200_2730942226162743028_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=GhhoJ0IXttIAX_Xql-z&_nc_ht=scontent.fyto1-2.fna&oh=65c60f89ab0c02ffb8961f4f69acf7ab&oe=5EFD122F',
                    content: "something about ui?",
                    timestamp: "2020-03-03 00:51:18",
                    updatedAt:"2020-03-03 00:51:18"
                }
            ];
            const userInfo = {
                name: "jazzy cat",
                notifyCount: 4,
                unreadCount: 3,
                notice: notice
            };

            this.setState(
                {user: user},
                () => console.log(userInfo)
            );

            return notice;
        } else {
            return [];
        }
    };

    render() {
        const {state} = this.props;
        return (
            <Router>
                <Menu
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                    style={{lineHeight: '50px'}}
                    className="menu"
                >
                    <Menu.Item className='menu_search' key="search">
                        <Search
                            placeholder="Search for a Community"
                            onSearch={value => this.handleSearch(value)}
                        />
                    </Menu.Item>
                    <Menu.Item className='menu_dashboard'
                               key="menu_dashboard"
                               onClick={() => this.redirect('/')}>
                        <Link to="/"><Icon type="compass" theme="twoTone" /> Dashboard </Link>
                    </Menu.Item>
                    <Menu.SubMenu className='menu-notifications'
                        key="notifications"
                        title={
                            <Badge>
                                <Icon type="bell" theme="twoTone" />
                            </Badge>
                        }
                    >
                        <Menu.ItemGroup title="Notifications">
                            <Menu.Item key="setting:1">Notification 1</Menu.Item>
                            <Menu.Item key="create-community">Notification 2</Menu.Item>
                        </Menu.ItemGroup>
                    </Menu.SubMenu>

                    <SubMenu
                        className='menu_sub'
                        title={
                            <span className="dropdown_menu">
                                <Icon type="meh" theme="twoTone"/>
                                Profile
                            </span>
                        }
                    >
                        <Menu.ItemGroup title="User">
                            <Menu.Item key="setting:1">Likes</Menu.Item>
                            <Menu.Item
                                key="create-community"
                                onClick = { () => {
                                    const addr = '/' + state.create_community;
                                    this.redirect(addr)
                                }}
                            >
                                Create Community
                            </Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="Settings">
                            <Menu.Item
                                key="settings"
                                onClick={ () => {
                                    this.redirect('/settings')
                                }}
                            >
                                Account Settings
                            </Menu.Item>
                            <Menu.Item
                                key="setting:4"
                                onClick={ () => {
                                    state.handleLogOut();
                                }}
                            >
                                Logout
                            </Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                </Menu>
            </Router>
        );
    }
}

ReactDOM.render(<Nav/>, document.getElementById('root'));

export default withRouter(Nav);
