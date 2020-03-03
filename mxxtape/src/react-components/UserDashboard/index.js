import React from "react";
import {BrowserRouter as Router, withRouter} from "react-router-dom";

import "./styles.css";
import 'antd/dist/antd.css';
import Nav from "../Navigation";
import ReactPlayer from 'react-player'

import profilePic from "./profile.png"
import bannerPic from "./randombanner.jpg"

import {Divider, Layout} from 'antd';
import { Avatar } from 'antd';
import { Card } from 'antd';
import { List } from 'antd';
import { Button } from 'antd';

const { Sider, Content } = Layout;

let starSong = "https://soundcloud.com/aperturesciencepsychoacousticlaboratories/want-you-gone";

let FeaturedSong = "https://soundcloud.com/gdfhdhsoundcloud/portal-still-alive-2";

let DiscoverList = [
    "https://soundcloud.com/eveyx/65daysofstatic-debutante-no-mans-sky-trailer-edit",
    "https://soundcloud.com/m-w-j/kerbal-space-program-main",
    "https://soundcloud.com/melatonin-nl/factorio",
    "https://soundcloud.com/sarahbrightman/time-to-say-goodbye-con-te",
    "https://soundcloud.com/owlcityofficial/1-hot-air-balloon"
];

let HistoryList = [
    "https://soundcloud.com/qaffass/peter-gabriel-down-to-earth",
    "https://soundcloud.com/stromunfall8bit/we-didnt-start-the-fire-8bit",
    "https://soundcloud.com/mememanboi/take-me-home-country-roads-fallout",
    "https://soundcloud.com/thefatrat/thefatrat-mayday-feat-laura-brehm"
];

let SubList = [
    ["Jazz It Up", "jazzitup"],
    ["Digital", "digital"],
    ["Rock N Roll", "rocknroll"],
    ["Stubdep", "stubdep"],
    ["Harmonica Remixes", "harmonicaremixes"],
];

function RenderNewStarSong(react) {
    const starSongInput = document.getElementById("DashboardSidebarSongInput");
    starSong = starSongInput.value;
    starSongInput.value = "";
    react.forceUpdate();
}

class UserDashboard extends React.Component {
    redirect(dir) {
        this.props.history.push(dir);
    }
    render() {
        const { state } = this.props;
        return (
            <div>
                <Nav state={ state }/>
                <Router>
                    <Layout>
                        <Sider id="DashboardSidebar">
                            <Card id="DashboardSidebarCard" title="Username">
                                <Avatar id="DashboardSidebarAvatar" shape="square" src={profilePic}/>
                                <Divider/>
                                <p>Starred Song</p>
                                <ReactPlayer height={200} width={150} controls={false} url={starSong}/>
                                <br/><br/>
                                <input id="DashboardSidebarSongInput" type="text" placeholder="Song URL"/>
                                <Button id="DashboardSidebarSongButton" onClick={() => RenderNewStarSong(this)}>Set Starred Song</Button>
                            </Card>
                        </Sider>

                        <Content id="DashboardContents">
                            <Card id="DashboardFeaturedCard" className="DashboardContentCard" title="FEATURED SONG">
                                <ReactPlayer height={450} width={350} controls={false} url={FeaturedSong}/>
                            </Card>

                            <Card className="DashboardContentCard SongListCard" title="DISCOVER">
                                <List
                                    dataSource = {DiscoverList}
                                    renderItem = {item => (
                                        <List.Item>
                                            <ReactPlayer height={70} width={650} controls={false} url={item}/>
                                        </List.Item>
                                    )}
                                />
                            </Card>

                            <Card className="DashboardContentCard SongListCard" title="HISTORY">
                                <List
                                    footer = {<Button onClick={() => this.redirect("/history")}>[MORE]</Button>}
                                    dataSource = {HistoryList}
                                    renderItem = {item => (
                                        <List.Item>
                                            <ReactPlayer height={70} width={650} controls={false} url={item}/>
                                        </List.Item>
                                    )}
                                />
                            </Card>

                            <Card id="DashboardCommunityCard" className="DashboardContentCard" title="YOUR COMMUNITIES">
                                <List
                                    footer = {<Button onClick={() => this.redirect("/subscriptions/")}>[MORE]</Button>}
                                    dataSource = {SubList}
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
                        </Content>
                    </Layout>
                </Router>
            </div>
        );
    }
}

export default withRouter(UserDashboard);