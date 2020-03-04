import React from "react";

import "./styles.css";
import 'antd/dist/antd.css';
import Nav from "../../Navigation";
import NewTextPost from "../NewTextPost"
import NewMusicPost from "../NewMusicPost";
import CommunityFeed from "../CommunityFeed";
import FeedFilter from "../FeedFilter"
import FeedTags from "../FeedTags";
import MembersList from "../MembersList";

import {Layout, Breadcrumb, Icon, Button, Upload, message} from 'antd';

const {Content, Sider} = Layout;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class CommunityAdmin extends React.Component {
    state = {
        // admin have total access, cannot leave the group
        isMember: true,
        newPost: true,
        updateFeed: () => {
            this.setState({newPost: !this.state.newPost});
        },
        loading: false,
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    handleHeaderChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    joinCommunity() {
        this.setState({isMember: !this.state.isMember})
    }

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const {imageUrl, headerUrl} = this.state;

        return (
            <Layout>
                <Nav/>
                <Content className="content">
                    <div className="header">
                        <div id="header_container">
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="group_avatar"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleChange}
                                >
                                    {imageUrl ?
                                        <img className='avatar_image' src={imageUrl} alt="avatar"/> : uploadButton}
                                </Upload>
                            <h1 className="header_h1"> Jazz it Up </h1>
                        </div>
                    </div>
                </Content>
                <Content className="content">
                    <Breadcrumb className="breadcrumb">
                        <Breadcrumb.Item>Community</Breadcrumb.Item>
                        <Breadcrumb.Item>Jazz</Breadcrumb.Item>
                        <Breadcrumb.Item>Jazz it Up</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="feed_layout">
                        <Content className="feed_container">
                            {/*------ FEED/WALL -----*/}
                            <div id="feed_buttons">
                                <div id="newmusic_button">
                                    <NewMusicPost isMember={this.state.isMember} state={this.state}/>
                                </div>
                                <div id="newtextpost_button">
                                    <NewTextPost isMember={this.state.isMember} state={this.state}/>
                                </div>
                                <div id="feed_filter">
                                    <FeedFilter state={this.state}/>
                                </div>
                            </div>
                            <div className="posts">
                                <CommunityFeed/>
                            </div>
                        </Content>
                        <Sider className="sidebar" width={240}>
                            <h3>Popular Tags: </h3>
                            <div className="sidebar_item">
                                <FeedTags/>
                            </div>
                            <h3>Members: </h3>
                            <div className="sidebar_item">
                                <MembersList/>
                            </div>
                        </Sider>
                    </Layout>
                </Content>
            </Layout>
        )
    }
}

export default CommunityAdmin;