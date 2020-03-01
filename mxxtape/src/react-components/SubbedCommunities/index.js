import React from "react";

import "./styles.css";
import 'antd/dist/antd.css';
import Nav from "../Navigation";

import {Layout} from 'antd';
import { Card } from 'antd';
import { List } from 'antd';
import { Button } from 'antd';


import removePic from "./removeicon.png"
import bannerPic from "../Profile/randombanner.jpg";

const { Header, Footer, Sider, Content } = Layout;

let SubList = ["Rock N Roll", "Digital", "AAAAA", "Rickrolls", "8"];

function UnSub(community, react) {
    SubList.splice(SubList.indexOf(community), 1);
    react.forceUpdate();
}

class SubbedCommunities extends React.Component {
    render() {
        return (
            <div id={"Root"}>
                <Nav/>
                <Layout id="Layout">
                    <Sider id="Sidebar">
                        <Button id="BackButton" href="./Profile">{"< Back"}</Button>
                    </Sider>
                    <Content>
                        <Card id="Subscriptions" className="ContentCard" title="SUBSCRIPTIONS">
                            <List
                                dataSource = {SubList}
                                renderItem = {item => (
                                    <List.Item className="CommunityItem">
                                        <div className="SubbedCommunityDiv">
                                            <img className="SubbedCommunityBanner" src={bannerPic} alt="Image Load Error"/>
                                            <a className="SubbedCommunityTitle" href="../Community">{item}</a>
                                        </div>
                                        <input type="image" className="UnSubButton" src={removePic} alt="Image Load Error" onClick={() => UnSub(item, this)}/>
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