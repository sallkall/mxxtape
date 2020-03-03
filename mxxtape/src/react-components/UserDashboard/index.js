import React from "react";

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

let starSong = "https://soundcloud.com/gdfhdhsoundcloud/portal-still-alive-2";

function RenderNewStarSong(react) {
    const starSongInput = document.getElementById("SidebarSongInput");
    starSong = starSongInput.value;
    starSongInput.value = "";
    react.forceUpdate();
}

class UserDashboard extends React.Component {
    render() {
        return (
            <div>
                <Nav/>
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
                            <ReactPlayer height={450} width={350} controls={false} url="https://soundcloud.com/gdfhdhsoundcloud/portal-still-alive-2"/>
                        </Card>

                        <Card className="DashboardContentCard SongListCard" title="DISCOVER">
                            <List
                                dataSource = {["https://soundcloud.com/gdfhdhsoundcloud/portal-still-alive-2", "https://soundcloud.com/gdfhdhsoundcloud/portal-still-alive-2", "https://soundcloud.com/gdfhdhsoundcloud/portal-still-alive-2", "https://soundcloud.com/gdfhdhsoundcloud/portal-still-alive-2", "https://soundcloud.com/gdfhdhsoundcloud/portal-still-alive-2"]}
                                renderItem = {item => (
                                    <List.Item>
                                        <ReactPlayer height={70} width={650} controls={false} url={item}/>
                                    </List.Item>
                                )}
                            />
                        </Card>

                        <Card className="DashboardContentCard SongListCard" title="HISTORY">
                            <List
                                footer = {<Button href="../History">[MORE]</Button>}
                                dataSource = {["https://soundcloud.com/gdfhdhsoundcloud/portal-still-alive-2", "https://soundcloud.com/gdfhdhsoundcloud/portal-still-alive-2", "https://soundcloud.com/gdfhdhsoundcloud/portal-still-alive-2", "https://soundcloud.com/gdfhdhsoundcloud/portal-still-alive-2"]}
                                renderItem = {item => (
                                    <List.Item>
                                        <ReactPlayer height={70} width={650} controls={false} url={item}/>
                                    </List.Item>
                                )}
                            />
                        </Card>

                        <Card id="DashboardCommunityCard" className="DashboardContentCard" title="YOUR COMMUNITIES">
                            <List
                                footer = {<Button href="./Subscriptions">[MORE]</Button>}
                                dataSource = {["Rock N Roll", "Digital", "AAAAA", "Rickrolls", "8"]}
                                renderItem = {item => (
                                    <List.Item>
                                        <div className="CommunityDiv">
                                            <img className="CommunityBanner" src={bannerPic} alt="Image Load Error"/>
                                            <a className="CommunityTitle" href="../Community">{item}</a>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default UserDashboard;