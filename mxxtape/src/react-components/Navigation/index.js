import React from "react";
import {Link, BrowserRouter as Router, withRouter} from "react-router-dom";

import "./styles.css";
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Menu, Icon, Input, Badge} from 'antd';
import NotificationBadge from "./NotificationBadge";
import {logout} from "../../actions/user";

const {SubMenu} = Menu;
const {Search} = Input;

class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state  = {
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

    getLoggedInFromStateProp(state) {
        // console.log(state);
        // this will be a server call for current user
        if (state && state.loggedIn) {
            return state.loggedIn
        }
    }

    navbarLogout = (app) => {
        this.props.history.push("/login");
        // logout(app);
        state.handleLogOut()
    };

    render() {
        const {state, app} = this.props;
        console.log(app.state);
        return (
            <Router>
                <Menu
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
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
                    <Menu.Item
                        className='menu-notifications'
                        key="notifications"
                        onClick={() => this.redirect('/'+ state.notifications)}
                    >
                        <NotificationBadge user={this.getLoggedInFromStateProp(state)}/>
                    </Menu.Item>
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
                            <Menu.Item
                                key="goto-subscriptions"
                                onClick = { () => {
                                    this.redirect("/subscriptions")
                                }}
                            >
                                Subscriptions
                            </Menu.Item>
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
                                key="logout"
                                onClick={ () => { this.navbarLogout(app) }}
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

/*ReactDOM.render(<Nav/>, document.getElementById('root'));*/

export default withRouter(Nav);
