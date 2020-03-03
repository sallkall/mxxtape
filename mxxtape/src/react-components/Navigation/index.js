import React from "react";
import {Link, BrowserRouter as Router, withRouter} from "react-router-dom";

import "./styles.css";
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Menu, Icon, Input, Badge} from 'antd';
import NotificationBadge from "./NotificationBadge";

const {SubMenu} = Menu;
const {Search} = Input;

class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state  = {
            current: 'menu_dashboard',
            userInfo: {}
        };
    }

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
            this.getUserInfo(this.props.state.user);
            console.log("Nav bar mounted", 5);
        }
    }

    getLoggedInFromStateProp(state) {
        console.log(state);
        if (state && state.loggedIn) {
            return state.loggedIn
        }
    }

    render() {
        const {state} = this.props;
        const userInfo = this.state.userInfo ? this.state.userInfo : {};
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
                    <Menu.SubMenu
                        className='menu-notifications'
                        key="notifications"
                        onClick={() => {console.log(state.loggedIn)}}
                        title={
                            <NotificationBadge user={this.getLoggedInFromStateProp(state)}/>
                        }
                    />
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
