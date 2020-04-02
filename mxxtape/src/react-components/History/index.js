import React from "react";
import {BrowserRouter as Router, withRouter} from "react-router-dom";

import "./styles.css";
import 'antd/dist/antd.css';
import Nav from "../Navigation";
import ReactPlayer from 'react-player'

import { Card } from 'antd';
import { List } from 'antd';
import { Button } from 'antd';

import removePic from "./removeicon.png"

let SongList = [
    "https://soundcloud.com/qaffass/peter-gabriel-down-to-earth",
    "https://soundcloud.com/stromunfall8bit/we-didnt-start-the-fire-8bit",
    "https://soundcloud.com/mememanboi/take-me-home-country-roads-fallout",
    "https://soundcloud.com/thefatrat/thefatrat-mayday-feat-laura-brehm",
    "https://soundcloud.com/shinya-kougami/ajoura-the-scp-foundation-main",
    "https://soundcloud.com/giammarco-simonelli/portal-2-main-theme",
    "https://soundcloud.com/jerry-berg/56k-dialup-model-connection-sound",
    "https://soundcloud.com/annsoselia/danube",
    "https://soundcloud.com/soundcirclemusic/elite-dangerous-kickstarter"
];
function RemoveFromHistory(songName, react) {
    SongList.splice(SongList.indexOf(songName), 1);
    react.forceUpdate();
}

class History extends React.Component {
    redirect(dir) {
        this.props.history.push(dir);
    }
    render() {
        let username = this.props.location.pathname.substring(9);
        if(username==="") {
            username = "USERNAME";
        }
        return (
            <div>
                <Nav app={this.props.app}/>
                <Router>
                    <Button id="BackButton" onClick={() => this.redirect("/profile/"+username)}>{"< Back"}</Button>
                    <Card id="History" className="ContentCard" title="HISTORY">
                        <List
                            dataSource = {SongList}
                            renderItem = {item => (
                                <List.Item>
                                    <ReactPlayer height={70} width={700} controls={false} url={item}/>
                                    <input type="image" className="HistoryRemoveButton" src={removePic} alt="Image Load Error" onClick={() => RemoveFromHistory(item, this)}/>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Router>
            </div>
        );
    }
}

export default withRouter(History);