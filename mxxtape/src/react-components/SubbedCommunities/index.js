import React from "react";
import {BrowserRouter as Router, withRouter} from "react-router-dom";

import "./styles.css";
import 'antd/dist/antd.css';
import Nav from "../Navigation";

import {Icon, Layout} from 'antd';
import { Card } from 'antd';
import { List } from 'antd';
import { Button } from 'antd';


import bannerPic from "../UserDashboard/randombanner.jpg";
import {getUserProfile} from "../../actions/user";

const { Sider, Content } = Layout;

/*let SubList = [
    ["Jazz It Up", "jazzitup"],
    ["Digital", "digital"],
    ["Rock N Roll", "rocknroll"],
    ["Stubdep", "stubdep"],
    ["Harmonica Remixes", "harmonicaremixes"],
];*/

let userjson = {
    exists: false,
    starsong: "",
    history: [],
    subscriptions: []
};

class SubbedCommunities extends React.Component {
    constructor(props) {
        super(props);
        this.props.history.push("/subscriptions/"+props.username);
        getUserProfile(props.username, userjson, this);
    }

    Unsubscribe(username, community) {
        const react = this;
        fetch("/users/"+username+"/subscriptions", {method: 'DELETE', body: "{\"community\": "+community+"}"})
            .then(
                res => {
                    return res.json();
                }
            )
            .then(
                json => {
                    userjson.subscriptions = json.subscriptions;
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
                <Nav state={ state }/>
                <Router>
                    <Layout>
                        <Sider id="Sidebar">
                            <Button id="BackButton" onClick={() => this.redirect("/profile/"+username)}>{"< Back"}</Button>
                        </Sider>
                        <Content>
                            <Card id="Subscriptions" className="ContentCard" title="SUBSCRIPTIONS">
                                <List
                                    dataSource = {userjson.subscriptions}
                                    renderItem = {item => (
                                        <List.Item>
                                            <div className="SubbedCommunityDiv">
                                                <img className="SubbedCommunityBanner" src={bannerPic} alt="Image Load Error"/>
                                                <a className="SubbedCommunityTitle" onClick={() => this.redirect("/community/"+item[1])}>{item[0]}</a>
                                            </div>
                                            <Button onClick={() => this.Unsubscribe(username, item)} size='large'>
                                                Leave Community
                                                <Icon type="minus-square" theme="twoTone"/>
                                            </Button>
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



export default withRouter(SubbedCommunities);