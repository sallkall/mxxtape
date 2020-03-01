import React from "react";

import "./User/styles.css";
import 'antd/dist/antd.css';
import Nav from "../Navigation";

import profilePic from "./profile.png"
import albumPic from "./unregisteredhypercam2.jpg"
import song from "./unregisteredhypercam2.m4a"

let genericHistorySong = (
    <div className="historyDiv">
        <img className="historyImage" src={albumPic}/>
        <p className="historySongName">[Song Name]</p>
        <audio controls className="historyAudio">
            <source src={song}/>
        </audio>
    </div>
);

class Community extends React.Component {
    render() {
        return (
            <div>
                <Nav/>
                <div id="userSidebar">
                    <p className="bigText">Welcome, Username!</p>
                    <img id="userSidebarIcon" src={profilePic}/>
                    <div id="userSidebarDiv">
                        <p className="bigText">Starred Song:</p>
                        <img id="userSidebarSongImage" src={albumPic}/>
                        <p>[Song Name]</p>
                        <audio controls id="userSidebarAudio">
                            <source src={song}/>
                        </audio>
                    </div>
                </div>
                <div id="featuredDiv">
                    <p className="bigText"><b>Featured Song:</b><br/>Unregistered Hypercam 2</p>
                    <a href="Community"><img id="featuredImage" src={albumPic}/></a>
                    <audio controls id="featuredAudio">
                        <source src={song}/>
                            Your browser does not support audio.
                    </audio>
                </div>
                <div id="historyDiv">
                    <p className="bigText"><b>Listening History</b></p>
                    {genericHistorySong}
                    {genericHistorySong}
                    {genericHistorySong}
                    {genericHistorySong}
                    {genericHistorySong}
                    <a href="" className="historyButton">[More]</a>
                </div>
            </div>
        )
    }
}

export default Community;