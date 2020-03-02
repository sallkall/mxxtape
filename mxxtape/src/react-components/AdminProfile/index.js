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

const { Header, Footer, Sider, Content } = Layout;


class Community extends React.Component {
    render_request(requestTitle, requestBody) {
        return (
            <Card id="AdminQueueCard" className="ContentCard" title={requestTitle}>
                <p>{requestBody}</p>
                <Button id="AdminQueueApprove">Approve</Button>
                <Button id="AdminQueueDecline">Decline</Button>
            </Card>
        )
    }

    render() {
        return (
            <div id={"Root"}>
                <Nav/>
                <Layout id="Layout">
                    <Sider id="Sidebar">
                        <Card id="SidebarCard" title="Administrator">
                            <Avatar id="SidebarAvatar" shape="square" src={profilePic}/>
                            <Divider/>
                            TODO Stuff here
                        </Card>
                    </Sider>

                    <Content>
                        <Card id="AdminFeaturedCard" className="ContentCard" title="FEATURED SONG">
                            <img id="AdminFeaturedAlbumCover" className="AlbumCover" src={albumPic} alt="Image Load Error"/>
                            <p id="AdminFeaturedSongName">SONG NAME</p>
                            <audio controls id="AdminFeaturedAudio">
                                <source src={song}/>
                            </audio>
                        </Card>
                        <Card id="AdminSetFeaturedCard" className="ContentCard" title="Set Featured Song">
                            TODO Stuff
                        </Card>

                        <div id="AdminQueueDiv">
                            {this.render_request("Username requests Moderator on Community", "hi can i have mod pls")}
                            {this.render_request("Username requests New Community: Community", "I'd like to create this new community for reasons I'm not bothering to write.")}
                            {this.render_request("Title", "Body")}
                            {this.render_request("Title", "Body")}
                        </div>
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default Community;