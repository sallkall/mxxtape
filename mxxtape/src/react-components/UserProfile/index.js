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

const { Sider, Content } = Layout;

let starSong = "https://soundcloud.com/gdfhdhsoundcloud/portal-still-alive-2";

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

class UserProfile extends React.Component {
    redirect(dir) {
        this.props.history.push(dir);
    }
    render() {
        const { state } = this.props;
        let username = this.props.location.pathname.substring(9);
        if(username==="") {
            username = "USERNAME";
        }
        return (
            <div>
                <Nav state={ state }/>
                <Router>
                    <Layout>
                        <Sider id="ProfileSidebar">
                            <Card id="ProfileSidebarCard" title={username}>
                                <Avatar id="ProfileSidebarAvatar" shape="square" src={"/"+username+".png"}/>
                                <Divider/>
                                <p>Starred Song</p>
                                <ReactPlayer height={200} width={150} controls={false} url={starSong}/>
                            </Card>
                        </Sider>

                        <Content id="ProfileContents">
                            <Card className="ProfileContentCard SongListCard" title="USER HISTORY">
                                <List
                                    footer = {<Button onClick={() => this.redirect("/history/"+username)}>[MORE]</Button>}
                                    dataSource = {HistoryList}
                                    renderItem = {item => (
                                        <List.Item>
                                            <ReactPlayer height={70} width={650} controls={false} url={item}/>
                                        </List.Item>
                                    )}
                                />
                            </Card>

                            <Card id="ProfileCommunityCard" className="ProfileContentCard" title="USER COMMUNITIES">
                                <List
                                    footer = {<Button onClick={() => this.redirect("/subscriptions/"+username)}>[MORE]</Button>}
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

export default withRouter(UserProfile);