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
import { Input } from 'antd';

import {getUserProfile, addToHistory} from "../../actions/user";


const { Sider, Content } = Layout;

let userjson = {
    exists: false,
    starsong: "",
    history: [],
    subscriptions: [],
    avatar: ""
};

let featuredSong = "";

let DiscoverList = [
    "https://soundcloud.com/eveyx/65daysofstatic-debutante-no-mans-sky-trailer-edit",
    "https://soundcloud.com/m-w-j/kerbal-space-program-main",
    "https://soundcloud.com/melatonin-nl/factorio",
];

/*function addToHistory(username, song) {
    console.log("ADDING");
    console.log(username);
    console.log(song);
}*/

class UserDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.props.history.push("/dashboard");
        getUserProfile(this.props.app.state.currentUser, userjson, this);
        fetch("/featuredsong", {method: 'GET'})
            .then(
                res => {
                    return res.json();
                }
            )
            .then(
                json => {
                    featuredSong = json.featuredSong;
                    this.forceUpdate();
                }
            )
            .catch(
                error => {
                    console.log(error);
                }
            );
    }

    redirect(dir) {
        this.props.history.push(dir);
    }

    setStarSong(username, react) {
        const starSongInput = document.getElementById("DashboardSidebarSongInput");
        userjson.starsong = starSongInput.value;
        starSongInput.value = "";
        react.forceUpdate();
        fetch("/users/"+username+"/starsong", {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({"starsong": userjson.starsong})})
            .catch(
                error => {
                    console.log(error);
                }
            );
    }

    render() {
        const username = this.props.app.state.currentUser;
        userjson.history = userjson.history.slice(0, 4);
        userjson.subscriptions = userjson.subscriptions.slice(0, 4);
        return (
            <div>
                <Nav app={this.props.app}/>
                <Router>
                    <Layout id="layout">
                        <Sider id="DashboardSidebar">
                            <Card title={username}>
                                <Avatar id="DashboardSidebarAvatar" shape="square" src={userjson.avatar}/>
                                <Divider/>
                                <p>Starred Song</p>
                                <ReactPlayer height={150} width={150} controls={false} url={userjson.starsong} onPlay={function() {addToHistory(username, userjson.starsong)}}/>
                                <br/><br/>
                                <Input id="DashboardSidebarSongInput" type="text" placeholder="Song URL"/>
                                <Button id="DashboardSidebarSongButton" onClick={() => this.setStarSong(username, this)}>Set Starred Song</Button>
                            </Card>
                        </Sider>

                        <Content id="DashboardContents">
                            <div id="topCards">
                            <Card className="featuredSongCard" title="FEATURED SONG">
                                <ReactPlayer width="auto" height='150px' controls={false} url={featuredSong} onPlay={function() {addToHistory(username, featuredSong)}}/>
                            </Card>

                            <Card className="discoverCard" title="DISCOVER">
                                <List
                                    className="listItems"
                                    dataSource = {DiscoverList}
                                    renderItem = {item => (
                                        <List.Item>
                                            <ReactPlayer height='60px' controls={false} url={item} onPlay={function() {addToHistory(username, item)}}/>
                                        </List.Item>
                                    )}
                                />
                            </Card>
                            </div>
                            <div id="bottomCards">
                            <Card className="historyCard" title="HISTORY">
                                <List
                                    className="listItems"
                                    footer = {<Button onClick={() => this.redirect("/history/"+username)}>MORE</Button>}
                                    dataSource = {userjson.history}
                                    renderItem = {item => (
                                        <List.Item>
                                            <ReactPlayer height={70}  controls={false} url={item} onPlay={function() {addToHistory(username, item)}}/>
                                        </List.Item>
                                    )}
                                />
                            </Card>

                            <Card className="communitiesCard" title="YOUR COMMUNITIES">
                                <List
                                    className="listItems"
                                    footer = {<Button onClick={() => this.redirect("/subscriptions/"+username)}>MORE</Button>}
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
                            </div>
                        </Content>
                    </Layout>
                </Router>
            </div>
        );
    }
}

export default withRouter(UserDashboard);