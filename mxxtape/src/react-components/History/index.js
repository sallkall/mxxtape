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
import {getUserProfile} from "../../actions/user";

/*let SongList = [
    "https://soundcloud.com/qaffass/peter-gabriel-down-to-earth",
    "https://soundcloud.com/stromunfall8bit/we-didnt-start-the-fire-8bit",
    "https://soundcloud.com/mememanboi/take-me-home-country-roads-fallout",
    "https://soundcloud.com/thefatrat/thefatrat-mayday-feat-laura-brehm",
    "https://soundcloud.com/shinya-kougami/ajoura-the-scp-foundation-main",
    "https://soundcloud.com/giammarco-simonelli/portal-2-main-theme",
    "https://soundcloud.com/jerry-berg/56k-dialup-model-connection-sound",
    "https://soundcloud.com/annsoselia/danube",
    "https://soundcloud.com/soundcirclemusic/elite-dangerous-kickstarter"
];*/

let userjson = {
    exists: false,
    starsong: "",
    history: [],
    subscriptions: []
};


class History extends React.Component {
    constructor(props) {
        super(props);
        this.props.history.push("/history/"+props.username);
        getUserProfile(props.username, userjson, this);
    }

    RemoveFromHistory(username, song) {
        const react = this;
        fetch("/users/"+username+"/history", {method: 'DELETE', body: "{\"song\": "+song+"}"})
            .then(
                res => {
                    return res.json();
                }
            )
            .then(
                json => {
                    userjson.history = json.history;
                    react.forceUpdate();
                }
            )
            .catch(
                error => {
                    console.log(error);
                }
            );
    }

    redirect(dir) {
        this.props.history.push(dir);
    }
    render() {
        const { state } = this.props;
        const username = this.props.username;
        return (
            <div>
                <Nav state={state}/>
                <Router>
                    <Button id="BackButton" onClick={() => this.redirect("/profile/"+username)}>{"< Back"}</Button>
                    <Card id="History" className="ContentCard" title="HISTORY">
                        <List
                            dataSource = {userjson.history}
                            renderItem = {item => (
                                <List.Item>
                                    <ReactPlayer height={70} width={700} controls={false} url={item}/>
                                    {this.props.state.currentUser===username && <input type="image" className="HistoryRemoveButton" src={removePic} alt="Image Load Error" onClick={() => this.RemoveFromHistory(username, item)}/>}
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