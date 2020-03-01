import React from "react";

import "./styles.css";
import 'antd/dist/antd.css';
import Nav from "../Navigation";

import {Layout} from 'antd';
import { Card } from 'antd';
import { List } from 'antd';
import { Button } from 'antd';

import albumPic from "../Profile/unregisteredhypercam2.jpg"
import song from "../Profile/unregisteredhypercam2.m4a"
import removePic from "./removeicon.png"

const { Header, Footer, Sider, Content } = Layout;

let SongList = ["Song Uno", "Extremely Long Song Name For Testing Purposes", "Song 3", "Song Four", "Song E", "Additional Song", "A113", "112358", "Keter Containment Breach"]
function RemoveFromHistory(songName, react) {
    SongList.splice(SongList.indexOf(songName), 1);
    react.forceUpdate();
}

class History extends React.Component {
    render() {
        return (
            <div id={"Root"}>
                <Nav/>
                <Layout id="Layout">
                    <Sider id="Sidebar">
                        <Button id="BackButton" href="./Profile">{"< Back"}</Button>
                    </Sider>
                    <Content>
                        <Card id="History" className="ContentCard" title="HISTORY">
                            <List
                                dataSource = {SongList}
                                renderItem = {item => (
                                    <List.Item className="HistoryItem">
                                        <img className="HistoryAlbumCover AlbumCover" src={albumPic} alt="Image Load Error"/>
                                        <p className="HistoryTitle">{item}</p>
                                        <audio controls>
                                            <source src={song}/>
                                        </audio>
                                        <input type="image" className="HistoryRemoveButton" src={removePic} alt="Image Load Error" onClick={() => RemoveFromHistory(item, this)}/>
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



export default History;