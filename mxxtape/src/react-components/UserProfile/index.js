import React from "react";
import {BrowserRouter as Router, withRouter} from "react-router-dom";

import "./styles.css";
import 'antd/dist/antd.css';
import Nav from "../Navigation";
import ReactPlayer from 'react-player'

import bannerPic from "./randombanner.jpg"

import {Divider, Layout} from 'antd';
import { Avatar } from 'antd';
import { Card } from 'antd';
import { List } from 'antd';
import { Button } from 'antd';

import NoMatch from "../NoMatch"

import {addToHistory, getUserProfile} from "../../actions/user";


const { Sider, Content } = Layout;

let userjson = {
    exists: false,
    starsong: "",
    history: [],
    subscriptions: [],
    avatar: ""
};

class UserProfile extends React.Component {
    constructor(props) {
        console.log("CONSTRUCTOR");
        super(props);
        this.props.history.push("/profile/"+props.username);
        getUserProfile(props.username, userjson, this);

    }

    redirect(dir) {
        this.props.history.push(dir);
    }

    render() {
        if(!userjson.exists) {
            return (
                <NoMatch app={this.props.app}/>
            )
        }
        userjson.history = userjson.history.slice(0, 4);
        userjson.subscriptions = userjson.subscriptions.slice(0, 4);
        const username = this.props.username;

        return (
            <div>
                <Nav app={this.props.app}/>
                <Router>
                    <Layout>
                        <Sider id="ProfileSidebar">
                            <Card id="ProfileSidebarCard" title={username}>
                                <Avatar id="ProfileSidebarAvatar" shape="square" src={userjson.avatar}/>
                                <Divider/>
                                <p>Starred Song</p>
                                <ReactPlayer height={200} width={150} controls={false} url={userjson.starsong} onPlay={function() {addToHistory(this.props.app.state.currentUser, userjson.starsong)}}/>
                            </Card>
                        </Sider>

                        <Content id="ProfileContents">
                            <Card className="ProfileContentCard SongListCard" title="USER HISTORY">
                                <List
                                    footer = {<Button onClick={() => this.redirect("/history/"+username)}>[MORE]</Button>}
                                    dataSource = {userjson.history}
                                    renderItem = {item => (
                                        <List.Item>
                                            <ReactPlayer height={70} controls={false} url={item} onPlay={function() {addToHistory(this.props.app.state.currentUser, item)}}/>
                                        </List.Item>
                                    )}
                                />
                            </Card>

                            <Card id="ProfileCommunityCard" className="ProfileContentCard" title="USER COMMUNITIES">
                                <List
                                    footer = {<Button onClick={() => this.redirect("/subscriptions/"+username)}>[MORE]</Button>}
                                    dataSource = {userjson.subscriptions}
                                    renderItem = {item => (
                                        <List.Item>
                                            <div className="CommunityDiv">
                                                <img className="CommunityBanner" src={bannerPic} alt="Image Load Error"/>
                                                <a className="CommunityTitle" onClick={() => this.redirect("/community/"+item)}>{item}</a>
                                            </div>
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </Content>
                    </Layout>
                </Router>
            </div>
        );
    }
}

export default withRouter(UserProfile);