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

import {getUserProfile} from "../../actions/user";


const { Sider, Content } = Layout;

let username = "USERNAME";

let userjson = {
    exists: false,
    starsong: "",
    history: [],
    subscriptions: []
};

let FeaturedSong = "https://soundcloud.com/gdfhdhsoundcloud/portal-still-alive-2";

let DiscoverList = [
    "https://soundcloud.com/eveyx/65daysofstatic-debutante-no-mans-sky-trailer-edit",
    "https://soundcloud.com/m-w-j/kerbal-space-program-main",
    "https://soundcloud.com/melatonin-nl/factorio",
];

/*let HistoryList = [
    "https://soundcloud.com/qaffass/peter-gabriel-down-to-earth",
    "https://soundcloud.com/stromunfall8bit/we-didnt-start-the-fire-8bit",
    "https://soundcloud.com/mememanboi/take-me-home-country-roads-fallout",
];

let SubList = [
    ["Jazz It Up", "jazzitup"],
    ["Digital", "digital"],
    ["Rock N Roll", "rocknroll"],
];*/

function RenderNewStarSong(react) {
    /*const starSongInput = document.getElementById("DashboardSidebarSongInput");
    userjson.starsong = starSongInput.value;
    starSongInput.value = "";
    react.forceUpdate();*/
    const starSongInput = document.getElementById("DashboardSidebarSongInput");
}

class UserDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.props.history.push("/dashboard");
        getUserProfile(this.props.state.currentUser, userjson, this);
    }

    redirect(dir) {
        this.props.history.push(dir);
    }
    render() {
        const { state } = this.props;
        const username = this.props.state.currentUser;
        userjson.history = userjson.history.slice(0, 4);
        userjson.subscriptions = userjson.subscriptions.slice(0, 4);
        return (
            <div>
                <Nav state={ state }/>
                <Router>
                    <Layout id="layout">
                        <Sider id="DashboardSidebar">
                            <Card title={username}>
                                <Avatar id="DashboardSidebarAvatar" shape="square" src={"/"+username+".png"}/>
                                <Divider/>
                                <p>Starred Song</p>
                                <ReactPlayer height={150} width={150} controls={false} url={userjson.starsong}/>
                                <br/><br/>
                                <input id="DashboardSidebarSongInput" type="text" placeholder="Song URL"/>
                                <Button id="DashboardSidebarSongButton" onClick={() => RenderNewStarSong(this)}>Set Starred Song</Button>
                            </Card>
                        </Sider>

                        <Content id="DashboardContents">
                            <div id="topCards">
                            <Card className="featuredSongCard" title="FEATURED SONG">
                                <ReactPlayer width="auto" height='150px' controls={false} url={FeaturedSong}/>
                            </Card>

                            <Card className="discoverCard" title="DISCOVER">
                                <List
                                    className="listItems"
                                    dataSource = {DiscoverList}
                                    renderItem = {item => (
                                        <List.Item>
                                            <ReactPlayer height='60px' controls={false} url={item}/>
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
                                            <ReactPlayer height={70}  controls={false} url={item}/>
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
                                                <a className="CommunityTitle" onClick={() => this.redirect("/community/"+item[1])}>{item[0]}</a>
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