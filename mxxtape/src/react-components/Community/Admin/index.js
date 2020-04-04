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
import {getFeed} from "../../../actions/post";
import {getUserProfile} from "../../../actions/user";
import {getCommunity} from "../../../actions/community";

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

// store the current user's data
let userjson = {
    exists: false,
    starsong: "",
    history: [],
    subscriptions: []
};

let communityjson = {
    name: "jazzitup"
};

// This is a sample community for 'jazz it up' in admin's view
class CommunityAdmin extends React.Component {
    constructor(props) {
        super(props);
        getUserProfile(props.username, userjson, this);

        // console.log("Community constructor", this.state);

        //get community info
        // console.log("state set", this.communityName, this);
        getCommunity(this.props.name, this, (json) => {
            communityjson.name = json.name;
            communityjson.genres = json.genres;
            communityjson.description = json.description;
            communityjson.moderators = json.moderators;
            communityjson.members = json.members;
            this.setState({
                    loadingCommunity: false,
                    // loadingFeed: false,
                    // posts: json.posts ? json.posts : []
                },
                () => {getFeed(this); console.log(communityjson)}
            )
        })
        // console.log("Community constructor", this.state);
    }

    state = {
        loadingFeed: true,
        loadingCommunity: true,
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
            <div>
                <Nav app={this.props.app}/>
            <Layout>
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
                                {/*<CommunityFeed/>*/}
                                {this.state.loadingFeed ? <p>loading...</p> : <CommunityFeed app={this.props.app} posts={this.state.posts}/>}
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
            </div>
        )
    }
}

export default CommunityAdmin;