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

let SubList = [
    ["Jazz It Up", "jazzitup"],
    ["Digital", "digital"],
    ["Rock N Roll", "rocknroll"],
    ["Stubdep", "stubdep"],
    ["Harmonica Remixes", "harmonicaremixes"],
];

class UserProfile extends React.Component {
    render() {
        return (
            <div>
                <Nav/>
                <Layout>
                    <Sider id="ProfileSidebar">
                        <Card id="ProfileSidebarCard" title="Username">
                            <Avatar id="ProfileSidebarAvatar" shape="square" src={profilePic}/>
                            <Divider/>
                            <p>Starred Song</p>
                            <ReactPlayer height={200} width={150} controls={false} url={starSong}/>
                        </Card>
                    </Sider>

                    <Content id="ProfileContents">
                        <Card className="ProfileContentCard SongListCard" title="USER HISTORY">
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

                        <Card id="ProfileCommunityCard" className="ProfileContentCard" title="USER COMMUNITIES">
                            <List
                                footer = {<Button href="./Subscriptions">[MORE]</Button>}
                                dataSource = {SubList}
                                renderItem = {item => (
                                    <List.Item>
                                        <div className="CommunityDiv">
                                            <img className="CommunityBanner" src={bannerPic} alt="Image Load Error"/>
                                            <a className="CommunityTitle" href={"../Community/"+item[1]}>{item[0]}</a>
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

export default UserProfile;