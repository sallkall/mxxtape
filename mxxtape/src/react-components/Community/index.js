import React from "react";

import "./styles.css";
import 'antd/dist/antd.css';
import Nav from "../Navigation";
import NewPost from "./NewPost"
import TextPost from "./TextPost"


import {Layout, Menu, Breadcrumb, Icon, Avatar, Button} from 'antd';

const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;


class Community extends React.Component {
    state = {
        isMember: false,
    }
    joinCommunity() {
        this.setState({isMember: !this.state.isMember})
    }

    render() {
        let join_button = this.state.isMember ? "minus-square" : "plus-square";
        let join_button_color = this.state.isMember ? "" : "#52c41a";

        return (
            <Layout>
                <Nav/>
                <Content className="content">
                    <div className="header">
                        <div id="header_container">
                            <Avatar
                                className="header_avatar"
                                icon="book"
                                size={110}
                                >
                            </Avatar>
                            <h1 id="header_h1">Jazz it Up</h1>
                        </div>
                        <Button
                            className="header_join_button"
                            onClick={() => this.joinCommunity()}
                            size='large'
                            shape='round'
                        > Join Community<Icon type={join_button} theme="twoTone" twoToneColor={join_button_color} />
                        </Button>
                    </div>
                </Content>
                <Content className="content">
                    <Breadcrumb className="breadcrumb">
                        <Breadcrumb.Item>Community</Breadcrumb.Item>
                        <Breadcrumb.Item>Study Music</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="feed_layout">
                        <Content className="feed_container">
                            {/*------ FEED/WALL -----*/}
                            <div id="new_post_button">
                                <NewPost/>
                            </div>
                            <div className="posts">
                                <TextPost/>
                            </div>
                        </Content>
                        <Sider width={200} >
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{height: '100%'}}
                            >
                                <SubMenu
                                    key="sub1"
                                    title={
                                        <span>
                  <Icon type="user"/>
                  subnav 1
                </span>
                                    }
                                >
                                    <Menu.Item key="1">option1</Menu.Item>
                                    <Menu.Item key="2">option2</Menu.Item>
                                    <Menu.Item key="3">option3</Menu.Item>
                                    <Menu.Item key="4">option4</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>mxxtape ©2020 </Footer>
            </Layout>
        )
    }
}

export default Community;