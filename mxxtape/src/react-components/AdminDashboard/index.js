import React from "react";
import {BrowserRouter as Router, withRouter} from "react-router-dom";

import "./styles.css";
import 'antd/dist/antd.css';
import Nav from "../Navigation";
import ReactPlayer from 'react-player'

import profilePic from "./profile.png"

import {Divider, Layout} from 'antd';
import { Avatar } from 'antd';
import { Card } from 'antd';
import { Button } from 'antd';

const { Sider, Content } = Layout;

let featuredSong = "https://soundcloud.com/gdfhdhsoundcloud/portal-still-alive-2";
let adminRequests = [
    ["DiamondMiner74 requests Moderator on Minecraft Parodies", "hi can i have mod pls"],
    ["Secondary_Computer requests creation of Smooth Jazz (Jazz)", "To keep you tranquil in the face of almost certain death, smooth jazz will be deployed in 3, 2, 1."],
    ["ReallyLongUsername requests creation of Really Long Community (Long Genre)", "This is a fairly long piece of text for the purposes of noting the maximum reasonable length of a request. They can be fairly long because there's a lot of room for you to put text in."],
    ["Title", "Body"],
    ["Title", "Body"],
    ["Title", "Body"]
];


function RenderNewStarSong(react) {
    const featuredSongInput = document.getElementById("AdminSongInput");
    featuredSong = featuredSongInput.value;
    featuredSongInput.value = "";
    react.forceUpdate();
}

function RenderAdminRequests(react) {
    let QueueCardList = [];
    for(let i=0; i<adminRequests.length; i++) {
        QueueCardList.push(
            <Card className="AdminQueueCard AdminContentCard" title={adminRequests[i][0]}>
                <p>{adminRequests[i][1]}</p>
                <Button className="AdminQueueApprove" onClick={() => ApproveRequest(adminRequests[i], react)}>Approve</Button>
                <Button className="AdminQueueDecline" onClick={() => DenyRequest(adminRequests[i], react)}>Decline</Button>
            </Card>
        );
    }
    if(adminRequests.length===0) {
        QueueCardList.push(
            <Card className="AdminQueueCard AdminContentCard">
                No Requests!
            </Card>
        );
    }
    return QueueCardList;
}
function ApproveRequest(request, react) {
    //TODO Approval
    RemoveRequest(request, react);
}
function DenyRequest(request, react) {
    //TODO Denial
    RemoveRequest(request, react);
}
function RemoveRequest(request, react) {
    adminRequests.splice(adminRequests.indexOf(request), 1);
    react.forceUpdate();
}

class AdminDashboard extends React.Component {
    render() {
        return (
            <div>
                <Nav app={this.props.app}/>
                <Router>
                    <Layout>
                        <Sider id="AdminSidebar">
                            <Card id="AdminSidebarCard" title="Administrator">
                                <Avatar id="AdminSidebarAvatar" shape="square" src={profilePic}/>
                                <Divider/>
                            </Card>
                        </Sider>

                        <Content id="AdminContents">
                            <Card id="AdminFeaturedCard" className="AdminContentCard" title="CURRENT FEATURED SONG">
                                <ReactPlayer height={500} width={450} controls={false} url={featuredSong}/>
                                <br/>
                                <input id="AdminSongInput" type="text" placeholder="Song URL"/>
                                <Button id="AdminSongButton" onClick={() => RenderNewStarSong(this)}>Set Featured Song</Button>
                            </Card>


                            {RenderAdminRequests(this)}

                        </Content>
                    </Layout>
                </Router>
            </div>
        );
    }
}

export default withRouter(AdminDashboard);