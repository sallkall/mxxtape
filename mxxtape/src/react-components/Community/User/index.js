import React from "react";

import "./styles.css";
import 'antd/dist/antd.css';
import Nav from "../../Navigation";
import NewTextPost from "../NewTextPost"
import NewMusicPost from "../NewMusicPost";
import CommunityFeed from "../CommunityFeed";
import FeedFilter from "../FeedFilter"
import FeedTags from "../FeedTags";
import MembersList from "../MembersList";

import {Layout, Breadcrumb, Icon, Button} from 'antd';
import {getFeed} from "../../../actions/post";
import {getUserProfile, subscribeToCommunity} from "../../../actions/user";

const {Content, Sider} = Layout;

// This is a sample community for 'jazz it up' in user's view

// store the current user's data
let userjson = {
    exists: false,
    starsong: "",
    history: [],
    subscriptions: []
};

let communityjson = {
    name: "tempo_name"
};

class Community extends React.Component {
    constructor(props) {
        super(props);
        getFeed(this);
        getUserProfile(props.username, userjson, this);
        //get community info

        // console.log("Community constructor", this.state);
    }

    state = {
        posts: [],
        loadingFeed: true,
        isMember: userjson.subscriptions.includes("tempo_name"),    //check
        newPost: false,
        message: { type: "", body: "" },
        updateFeed: () => {
            this.setState({newPost: !this.state.newPost, loadingFeed: true}, () => getFeed(this));
            // this.setState({newPost: !this.state.newPost});
        }
    };

    joinCommunity(username) {
        subscribeToCommunity(username, communityjson.name, this)
    }

    render() {
        console.log("userinfooooooo", userjson)
        let join_button = this.state.isMember ? "minus-square" : "plus-square";
        let join_button_color = this.state.isMember ? "" : "#52c41a";
        const username = this.props.app.state.currentUser;
        return (
            <div>
                <Nav app={this.props.app}/>
                <Layout>
                    <Content className="content">
                        <div className="header">
                            <div id="header_container">
                                <div id="group_avatar"/>
                                <h1 className="header_h1"> Jazz it Up </h1>
                            </div>
                            <Button
                                className="header_join_button"
                                onClick={() => this.joinCommunity(username)}
                                size='large'
                            > {this.state.isMember ? 'Leave Community' : 'Join Community'}
                                <Icon type={join_button} theme="twoTone" twoToneColor={join_button_color}/>
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
                                        {/*Make new music post*/}
                                        <NewMusicPost username={username} isMember={this.state.isMember} state={this.state}/>
                                    </div>
                                    <div id="newtextpost_button">
                                        {/*Make new text post*/}
                                        <NewTextPost username={username} isMember={this.state.isMember} state={this.state}/>
                                    </div>
                                    <div id="feed_filter">
                                        {/*Filter by most recent or oldest*/}
                                        <FeedFilter state={this}/>
                                    </div>
                                </div>
                                <div className="posts">
                                    {/*Render all of community feed/users' posts*/}
                                    {/*<CommunityFeed/>*/}
                                    {this.state.loadingFeed ? <p>loading...</p> : <CommunityFeed app={this.props.app} posts={this.state.posts}/>}
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
                </Layout>
            </div>
        )
    }
}

export default Community;