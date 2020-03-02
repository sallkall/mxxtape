import React from "react";
import './index.css'
import {List, Button, Form, Input, message, Upload, Avatar} from 'antd'
import {withRouter} from 'react-router-dom'

function getBase64(img, callback) {
    // sample code from antd
    const reader = new FileReader();
    reader.addEventListener('load', () => {callback(reader.result)});
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    //sample code from antd
    // checking that image type is correct
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

function checkValidEmail(email) {
    // regex for email taken from https://emailregex.com
    const isEmailAddress = email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    if (!isEmailAddress){
        message.error('You must enter a valid email address!')
    }
    return isEmailAddress;
}

function checkValidSpotify(spotify) {
    // check if spotify with spotify's API
    // temporarily validating
    return true
}

class SettingsForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username ? this.props.username : "whoareyou?",
            user: null,
            changingSetting: false,
            changeEmail: false,
            changePassword: false,
            changeSpotifyAccount: false,
            deactivateAccount: false,
            changeDisplayName: false,
            changeAbout: false,
            changeAvatar: false,
            uploadingAvatar: false
        };
        //don't change these variables,
        // needed to maintain changingSettingSToggle
        this.emailSetting = "email";
        this.passwordSetting = "password";
        this.spotifyAccountSetting = "spotifyAccount";
        this.displayNameSetting = "displayName";
        this.aboutSetting = "about";
        this.avatarSetting = "avatar";

        // temp variable for current user
        // only for phase 1, eventually will user information will include whether or not they are an admin
        this.isAdmin = this.props.isAdmin;
    }

    resetDesc = () => {
        console.log("resetting fields");
        this.setState(
            {
                changingSetting: false,
                changeEmail: false,
                changePassword: false,
                changeSpotifyAccount: false,
                deactivateAccount: false,
                changeDisplayName: false,
                changeAbout: false,
                changeAvatar: false
            }
        )
    };

    componentDidMount() {
        //make server call with state.username passed from parent component
        // let user = getUser(state.username);
        //populate email. displayName, about, spotifyAccount, links to avatar
        let user = null;
        if (this.isAdmin) {
            user = {
                email: "admin@admin.com",
                password: "admin",
                displayName: "admin-display-name",
                about: "Music has always had a magic in that it is able to unite people in ways that other mediums " +
                    "can’t. For many people, music defines the cultural identity of the times they grew up in, the " +
                    "interests they have, and as a way to easily express their personality. And yet, the base " +
                    "functionality of music streaming sites on the internet like Spotify and Apple Music are very " +
                    "focused on providing users with a place to listen to music. Beyond allowing users to create " +
                    "playlists, they provide their users very little opportunity for people to connect with each " +
                    "other and share their love for music. In this way, the sense of community and unity through music " +
                    "is lost. For these reasons we came up with our project: Mxxtape.",
                spotifyAccount: "admin-spotify-account",
                avatar: "https://img.icons8.com/dusk/64/000000/music-record.png"
            };
        } else {
            user = {
                email: "user@user.com",
                password: "user",
                displayName: "user-display-name",
                about: "Welcome to CSC309H! This course teaches the basics of web programming, and aims to give " +
                    "context around the programming that we do in the course. By the end of the course, you should " +
                    "be able to explain the architecture behind a web application, and understand which technologies " +
                    "you can use to create web applications yourself.",
                spotifyAccount: "user-spotify-account",
                avatar: "https://img.icons8.com/dusk/64/000000/music-record.png"
            };
        }
        //callback
        this.updateStateFromServer(user)
    }

    updateStateFromServer = user => {
        console.log("updating user state");
        const errorInput = "something went wrong";
        this.setState(
            {
                email: user.email ? user.email : errorInput,
                password: user.password ? user.password : errorInput,
                displayName: user.displayName ? user.displayName : errorInput,
                about: user.about ? user.about : errorInput,
                spotifyAccount: user.spotifyAccount ? user.spotifyAccount : errorInput,
                avatar: user.avatar ? user.avatar : errorInput
            },
            () => {
                console.log(this.state);
            }
        );
    };

    redirect = addr => {
        console.log(addr);
        this.props.history.push(addr);
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let invalidSubmission = null;
            if(!err) {
                console.log("Received values of form: ", values);
                if (values.email) {
                    values.email = checkValidEmail(values.email) ? values.email : this.state.email;
                } else if (values.spotifyAccount) {
                    values.spotifyAccount = checkValidSpotify(values.spotifyAccount) ? values.spotifyAccount : this.state.spotifyAccount;
                }
                //how user information will be updated on the server
                let user = {
                    email: values.email ? values.email : this.state.email,
                    password: values.password ? values.password: this.state.password,
                    displayName: values.displayName ? values.displayName : this.state.displayName,
                    about: values.about ? values.about : this.state.about,
                    spotifyAccount: values.spotifyAccount ? values.spotifyAccount: this.state.spotifyAccount,
                    avatar: values.avatar ? values.avatar : this.state.avatar,
                };
                this.updateServerInfo(values);
                //get new user info from server
                //need to update user info from server
                this.updateStateFromServer(user);
                //reset the form with new values from server
                this.resetDesc();
            }
        })
    };

    updateServerInfo = (values) => {
        //make call to server to update user info from values
        console.log("Updated Server Info", values);
        message.success("Updated Info!")
    };

    changingSettingSToggle = (s) => {
        this.setState({changingSetting: !this.state.changingSetting});

        if (s === this.emailSetting) {
            console.log("change emailSetting", !this.state.changeEmail);
            this.setState({
                changeEmail: !this.state.changeEmail
            });
        } else if (s === this.passwordSetting) {
            console.log("change Password", !this.state.changePassword);
            this.setState({
                changePassword: !this.state.changePassword
            })
        } else if (s === this.spotifyAccountSetting) {
            console.log("change spotify account", !this.state.changeSpotifyAccount);
            this.setState({
                changeSpotifyAccount: !this.state.changeSpotifyAccount
            })
        } else if (s === this.displayNameSetting) {
            console.log("change display name", !this.state.changeDisplayName);
            this.setState({
                changeDisplayName: !this.state.changeDisplayName
            })
        } else if (s === this.aboutSetting) {
            console.log("change about", !this.state.changeAbout);
            this.setState({
                changeAbout: !this.state.changeAbout,
            })
        }
    };

    handleAvatarChange = info => {
        // sample code from antd for uploading images
        if (info.file.status === 'uploading') {
            this.setState({ uploadingAvatar: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this imageUrl from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                const values = {avatar: imageUrl};
                // upload image to server
                this.updateServerInfo(values);
                this.setState({
                    uploadingAvatar: false,
                });
                //get this user info from server
                let user = {
                    email: this.state.email,
                    password: this.state.password,
                    displayName: this.state.displayName,
                    about: this.state.about,
                    spotifyAccount: this.state.spotifyAccount,
                    avatar: values.avatar ? values.avatar : this.state.avatar,
                };
                this.updateStateFromServer(user);
            });
        }
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit}>
                <header className="settings-header">
                    Account Settings
                </header>

                <header className="settings-subheader">ACCOUNT PREFERENCES</header>
                <hr/>
                <List>
                    <List.Item>
                        <List.Item.Meta
                            title={"Username"}
                            description={this.state.username}
                        />
                    </List.Item>
                    <List.Item>
                        <List.Item.Meta
                            title={"Email Address"}
                            description={this.state.changeEmail ?
                                <Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator("email", {
                                            initialValue: this.state.email,
                                            rules: [{required: true, message: "Please input your emailSetting!"}]
                                        })(
                                            <Input className="settings-field" />
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            Save Changes
                                        </Button>
                                    </Form.Item>
                                </Form.Item>
                                : this.state.email
                            }
                        />
                        <Button
                            onClick={() => {
                                this.changingSettingSToggle(this.emailSetting)
                            }}
                            disabled={this.state.changingSetting}
                        >
                            {this.state.changeEmail ? "Save New": "Change" } Email
                        </Button>
                    </List.Item>
                    <List.Item>
                        <List.Item.Meta
                            title={"Change Password"}
                            description={this.state.changePassword ?
                                <Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator("password", {
                                            initialValue: this.state.password,
                                            rules: [{required: true, message: "Please input a password!"}]
                                        })(
                                            <Input className="settings-field" type="password"/>
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            Save Changes
                                        </Button>
                                    </Form.Item>
                                </Form.Item>
                                : "Change your password here"
                            }
                        />
                        <Button
                            onClick={() => {
                                this.changingSettingSToggle(this.passwordSetting)
                            }}
                            disabled={this.state.changingSetting}
                        >
                            {this.state.changePassword ? "Save New": "Change" } Password
                        </Button>
                    </List.Item>
                    <List.Item>
                        <List.Item.Meta
                            title={"Spotify Account"}
                            description={ this.state.changeSpotifyAccount ?
                                <Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator("spotifyAccount", {
                                            initialValue: this.state.spotifyAccount
                                        })(
                                            <Input className="settings-field"/>
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            Save Changes
                                        </Button>
                                    </Form.Item>
                                </Form.Item>
                                : this.state.spotifyAccount
                            }
                        />
                        <Button
                            onClick={() => {
                                this.changingSettingSToggle(this.spotifyAccountSetting)
                            }}
                            disabled={this.state.changingSetting}
                        >
                            Change Spotify account
                        </Button>
                    </List.Item>
                </List>
                <header className="settings-header">
                    Customize profile
                </header>
                <header className="settings-subheader">profile information</header>
                <hr/>
                <List>
                    <List.Item>
                        <List.Item.Meta
                            title={"Display Name"}
                            description={this.state.changeDisplayName ?
                                <Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator("displayName", {
                                            initialValue: this.state.displayName,
                                        })(
                                            <Input className="settings-field" />
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            Save Changes
                                        </Button>
                                    </Form.Item>
                                </Form.Item>
                                : this.state.displayName
                            }
                        />
                        <Button
                            onClick={() => {
                                this.changingSettingSToggle(this.displayNameSetting)
                            }}
                            disabled={this.state.changingSetting}
                        >
                            {this.state.changeDisplayName ? "Save New": "Change" } display name
                        </Button>
                    </List.Item>
                    <List.Item>
                        <List.Item.Meta
                            title={"About"}
                            description={this.state.changeAbout ?
                                <Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator("about", {
                                            initialValue: this.state.about,
                                        })(
                                            <Input.TextArea
                                                className="settings-field setting-about"
                                                autoSize={{ minRows: 2, maxRows: 6 }}
                                            />
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            Save Changes
                                        </Button>
                                    </Form.Item>
                                </Form.Item>
                                : this.state.about
                            }
                        />
                        <Button
                            className="button"
                            onClick={() => {
                                this.changingSettingSToggle(this.aboutSetting)
                            }}
                            disabled={this.state.changingSetting}
                        >
                            Change about
                        </Button>
                    </List.Item>
                </List>
                <header className="settings-subheader">Images</header>
                <hr/>
                <List>
                    <List.Item>
                        <List.Item.Meta
                            title={"Avatar"}
                            description={
                                <Avatar
                                    className="settings-avatar"
                                    src={this.state.avatar}
                                    size={200}
                                />
                            }
                        />
                    <Upload
                        name="avatar"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={this.handleAvatarChange}
                    >
                        <Button disabled={this.state.changingSetting}>
                            Change Avatar
                        </Button>
                    </Upload>
                    </List.Item>
                </List>

            </Form>
        )
    }
}

export default withRouter(SettingsForm);