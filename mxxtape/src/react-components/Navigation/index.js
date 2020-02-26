import React from "react";
import {Link, BrowserRouter as Router, withRouter} from "react-router-dom";

import "./styles.css";
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Menu, Icon, Input, Layout} from 'antd';

const {SubMenu} = Menu;
const {Search} = Input;

class Nav extends React.Component {
    state = {
        current: 'menu_dashboard',
    };

    handleSearch(inputValue) {
        console.log('searching: ', inputValue)
        const community_name = "/community/" + inputValue;
        this.props.history.push(community_name);
    };

    render() {
        return (
            <Router>
                <Menu
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                    style={{ lineHeight: '50px' }}
                >
                    {/*<Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">*/}
                    <Menu.Item className='menu_search' key="search">
                        <Search
                            defaultValue="Search for a Community"
                            placeholder="input search text"
                            onSearch={value => this.handleSearch(value)}
                        />
                    </Menu.Item>
                    <Menu.Item className='menu_dashboard' key="menu_dashboard">
                        <Link to="/"><Icon type="compass" theme="twoTone" /> Dashboard </Link>
                    </Menu.Item>
                    <Menu.Item className='menu_community' key="menu_community">
                        <Link to="/community"><Icon type="bank" theme="twoTone" /> Community </Link>
                    </Menu.Item>

                    <SubMenu
                        className='menu_sub'
                        title={
                            <span className="dropdown_menu">
             <Icon type="meh" theme="twoTone" />
              Profile
            </span>
                        }
                    >
                        <Menu.ItemGroup title="User">
                            <Menu.Item key="setting:1">Likes</Menu.Item>
                            <Menu.Item key="setting:2">Communities</Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="Settings">
                            <Menu.Item key="setting:3">Account Settings</Menu.Item>
                            <Menu.Item key="setting:4"><b>Logout</b></Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                </Menu>
            </Router>
        );
    }
}

ReactDOM.render(<Nav/>, document.getElementById('root'));

export default withRouter(Nav);
