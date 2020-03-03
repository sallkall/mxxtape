import React from "react";

import "./styles.css";
import 'antd/dist/antd.css';
import Nav from "../Navigation";
import NewTextPost from "./NewTextPost"
import NewMusicPost from "./NewMusicPost";
import CommunityFeed from "./CommunityFeed"
import FeedFilter from "./FeedFilter"
import FeedTags from "./FeedTags";
import MembersList from "./MembersList";
import TextPost from "./Post";

import {Layout, Menu, Breadcrumb, Icon, Button} from 'antd';

const {SubMenu} = Menu;
const { Content, Footer, Sider} = Layout;
const samplePost = new TextPost(this, 'Sally', '', 'this is a test');

class Community extends React.Component {
    state = {
        isMember: false,
        newPost: false,
        updateFeed: () => {
            this.setState({newPost: !this.state.newPost});
        }
    };

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
                            <div id="group_avatar"/>
                            <h1 className="header_h1"> Jazz it Up </h1>
                        </div>
                        <Button
                            className="header_join_button"
                            onClick={() => this.joinCommunity()}
                            size='large'
                        > {this.state.isMember ? 'Leave Community' :'Join Community'}
                            <Icon type={join_button} theme="twoTone" twoToneColor={join_button_color} />
                        </Button>
                    </div>
                </Content>
                <Content className="content">
                    <Breadcrumb className="breadcrumb">
                        <Breadcrumb.Item>Community</Breadcrumb.Item>
                        <Breadcrumb.Item>Jazz</Breadcrumb.Item>
                        <Breadcrumb.Item>Jazz it Up</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="feed_layout">
                        <Content className="feed_container">
                            {/*------ FEED/WALL -----*/}
                            <div id="feed_buttons">
                                <div id="newmusic_button">
                                    <NewMusicPost isMember={this.state.isMember} state={this.state}/>
                                </div>
                                <div id="newtextpost_button">
                                    <NewTextPost isMember={this.state.isMember} state={this.state} handleUpdate={this.updateFeed}/>
                                </div>
                                <div id="feed_filter">
                                    <FeedFilter/>
                                </div>
                            </div>
                            <div className="posts">
                                <CommunityFeed/>
                            </div>
                        </Content>
                        <Sider className="sidebar" width={240}>
                            <h3>Popular Tags: </h3>
                            <div className="sidebar_item">
                                <FeedTags/>
                            </div>
                            <h3>Members: </h3>
                            <div className="sidebar_item">
                                <MembersList/>
                            </div>
                        </Sider>
                    </Layout>
                </Content>
                {/*<Footer style={{textAlign: 'center'}}>mxxtape ©2020 </Footer>*/}
            </Layout>
        )
    }
}

export default Community;