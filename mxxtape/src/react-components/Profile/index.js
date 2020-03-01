import React from "react";

import "./styles.css";
import 'antd/dist/antd.css';
import Nav from "../Navigation";

import profilePic from "./profile.png"
import albumPic from "./unregisteredhypercam2.jpg"
import song from "./unregisteredhypercam2.m4a"
import bannerPic from "./randombanner.jpg"

import {Divider, Layout} from 'antd';
import { Avatar } from 'antd';
import { Card } from 'antd';
import { List } from 'antd';
import { Button } from 'antd';
import {Row, Col} from 'antd';

const { Header, Footer, Sider, Content } = Layout;

class Community extends React.Component {
    render() {
        return (
            <div id={"Root"}>
                <Nav/>
                <Layout id="Layout">
                    <Sider id="Sidebar">
                        <Card id="SidebarCard" title="Username">
                            <Avatar id="SidebarAvatar" shape="square" src={profilePic}/>
                            <Divider/>
                            <img id="SidebarAlbumCover" className="AlbumCover" src={albumPic} alt="Image Load Error"/>
                            <p id="SidebarSongName">SONG NAME</p>
                            <audio controls id="SidebarAudio">
                                <source src={song}/>
                            </audio>
                        </Card>
                    </Sider>

                    <Content>
                        <Card id="FeaturedCard" className="ContentCard" title="FEATURED SONG">
                            <img id="FeaturedAlbumCover" className="AlbumCover" src={albumPic} alt="Image Load Error"/>
                            <p id="FeaturedSongName">SONG NAME</p>
                            <audio controls id="FeaturedAudio">
                                <source src={song}/>
                            </audio>
                        </Card>

                        <Card id="DiscoverCard" className="ContentCard" title="DISCOVER">
                            <List
                                dataSource = {["Song Uno", "Extremely Long Song Name For Testing Purposes", "Song 3", "Song Four", "Song E", "Foxtrot"]}
                                renderItem = {item => (
                                    <List.Item className="HistoryItem">
                                        <img className="HistoryAlbumCover AlbumCover" src={albumPic} alt="Image Load Error"/>
                                        <p>{item}</p>
                                        <audio controls>
                                            <source src={song}/>
                                        </audio>
                                    </List.Item>
                                )}
                            />
                        </Card>

                        <Card id="HistoryCard" className="ContentCard" title="HISTORY">
                            <List
                                footer = {<Button href="../History">[MORE]</Button>}
                                dataSource = {["Song Uno", "Extremely Long Song Name For Testing Purposes", "Song 3", "Song Four", "Song E"]}
                                renderItem = {item => (
                                    <List.Item className="HistoryItem">
                                        <img className="HistoryAlbumCover AlbumCover" src={albumPic} alt="Image Load Error"/>
                                        <p>{item}</p>
                                        <audio controls>
                                            <source src={song}/>
                                        </audio>
                                    </List.Item>
                                )}
                            />
                        </Card>

                        <Card id="CommunityCard" className="ContentCard" title="YOUR COMMUNITIES">
                            <List
                                footer = {<Button href="./Subscriptions">[MORE]</Button>}
                                dataSource = {["Rock N Roll", "Digital", "AAAAA", "Rickrolls", "8"]}
                                renderItem = {item => (
                                    <List.Item className="HistoryItem">
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

export default Community;