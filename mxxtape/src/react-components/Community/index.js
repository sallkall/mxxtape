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
    // constructor(props) {
    //     super(props);
    //     console.log(props);
    // }

    state = {
        isMember: false,
    }

    joinCommunity() {
        this.setState({isMember: !this.state.isMember})
    }

    render() {
        let join_button = this.state.isMember ? "minus-square" : "plus-square";

        return (
            <Layout>
                <Nav/>
                <Content style={{padding: '0 50px'}}>
                    <div className="header"
                         style={{
                             background: 'AliceBlue',
                             height: '200px',
                             position: 'relative',
                         }}>
                        <div style={{
                            // marginBottom: '30px',
                        }}><Avatar
                            icon="book"
                            size={100}
                            style={{
                                color: '#fff',
                                backgroundColor: '#90c9e8',
                                position: 'absolute',
                                bottom: '0',
                                marginBottom: '30px',
                                marginLeft: '80px',
                            }}>
                        </Avatar>
                            <h1 style={{
                                position: 'absolute',
                                bottom: '0',
                                marginBottom: '30px',
                                marginLeft: '200px',
                                width: '10px'
                            }}
                            >Study Music</h1>
                        </div>
                        <Button
                            onClick={() => this.joinCommunity()}
                            size='large'
                            style={{
                                position: 'absolute',
                                bottom: '0',
                                right: '0',
                                marginBottom: '30px',
                                marginRight: '30px',
                            }}
                        > Join Community<Icon type={join_button} theme="twoTone" />
                        </Button>
                    </div>
                </Content>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Community</Breadcrumb.Item>
                        <Breadcrumb.Item>Study Music</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout style={{padding: '24px 0', background: '#fff'}}>
                        <Content style={{padding: '0 24px', minHeight: 280, position: 'relative',
                        }}>
                            Feed
                            <div style={{
                                position: 'absolute',
                                right: '0px',
                                marginRight: '100px',}}
                            >
                                <NewPost/>
                            </div>
                            <div style={{
                                position: 'absolute',
                                marginTop: '30px',
                                marginRight: '100px',}}
                            >
                                <TextPost/>
                            </div>
                        </Content>
                        <Sider width={200} style={{background: '#fff'}}>
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