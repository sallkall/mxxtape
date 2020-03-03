import React from "react";

import "./styles.css";
import 'antd/dist/antd.css';
import Nav from "../Navigation";

import {Icon, Layout} from 'antd';
import { Card } from 'antd';
import { List } from 'antd';
import { Button } from 'antd';


import removePic from "./removeicon.png"
import bannerPic from "../UserDashboard/randombanner.jpg";

const { Header, Footer, Sider, Content } = Layout;

let SubList = [
    ["Jazz It Up", "jazzitup"],
    ["Digital", "digital"],
    ["Rock N Roll", "rocknroll"],
    ["Stubdep", "stubdep"],
    ["Harmonica Remixes", "harmonicaremixes"],
];

function UnSub(community, react) {
    SubList.splice(SubList.indexOf(community), 1);
    react.forceUpdate();
}

class SubbedCommunities extends React.Component {
    render() {
        return (
            <div>
                <Nav/>
                <Layout>
                    <Sider id="Sidebar">
                        <Button id="BackButton" href="./Profile">{"< Back"}</Button>
                    </Sider>
                    <Content>
                        <Card id="Subscriptions" className="ContentCard" title="SUBSCRIPTIONS">
                            <List
                                dataSource = {SubList}
                                renderItem = {item => (
                                    <List.Item>
                                        <div className="SubbedCommunityDiv">
                                            <img className="SubbedCommunityBanner" src={bannerPic} alt="Image Load Error"/>
                                            <a className="SubbedCommunityTitle" href={"../Community/"+item[1]}>{item[0]}</a>
                                        </div>
                                        <Button onClick={() => UnSub(item, this)} size='large'>
                                            Leave Community
                                            <Icon type="minus-square" theme="twoTone"/>
                                        </Button>
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



export default SubbedCommunities;