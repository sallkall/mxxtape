import React from "react";
import './index.css'
import {Icon, List, Button, Form, Input, message} from 'antd'
import {withRouter} from 'react-router-dom'

class UserSettingsForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: this.props,
            changingSetting: false,
            changeEmail: false,
            changePassword: false,
            changeSpotifyAccount: false,
            deactivateAccount: false,
            changeDisplayName: false,
            changeAbout: false,
            changeAvatar: false
        };
        //don't change these variables,
        // needed to maintain changingSettingSToggle
        this.emailSetting = "email";
        this.passwordSetting = "password";
        this.spotifyAccountSetting = "spotifyAccount";
        this.deactivateAccountSetting = "deactivateAccount";
        this.displayNameSetting = "displayName";
        this.aboutSetting = "about";
        this.avatarSetting = "avatar";
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
        //make server call with state.username
        //populate email. displayName, about, spotifyAccount, links to avatar
        const user = {
            email: "user@user.com",
            password: "user",
            displayName: "user-display-name",
            about: "Welcome to CSC309H! This course teaches the basics of web programming, and aims to give context around the programming that we do in the course. By the end of the course, you should be able to explain the architecture behind a web application, and understand which technologies you can use to create web applications yourself.",
            spotifyAccount: "user-spotify-account",
            avatar: "https://yt3.ggpht.com/a/AGF-l7-11--_67EpTJhLCO6c4xBXPLHhC0C4GXaoQg=s900-c-k-c0xffffffff-no-rj-mo"
        };
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
                avatar: user.avatar ? user.avatar : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
            },
            () => {
                console.log(this.state);
            }
        );
    };

    redirect = addr => {
        console.log(addr);
        this.props.history.push(addr);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err) {
                console.log("Received values of form: ", values);
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
        }
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {state} = this.props;

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
                <header className="settings-subheader">PROFILE INFORMATION</header>
                <hr/>
                <List>
                    <List.Item>
                        <List.Item.Meta
                            title={"Display Name"}
                            description={this.state.displayName}
                        />
                        <Button
                            htmlType={!this.state.changeDisplayName ? "submit" : "button"}
                            disabled={this.state.changingSetting === !this.state.changeDisplayName}
                        >
                            Change display name
                        </Button>
                    </List.Item>
                    <List.Item>
                        <List.Item.Meta
                            title={"About"}
                            description={this.state.about}
                        />
                        <Button
                            htmlType={!this.state.changeAbout ? "submit" : "button"}
                            disabled={this.state.changingSetting === !this.state.changeAbout}
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
                                <img
                                    className="settings-avatar"
                                    src={this.state.avatar}
                                    alt="avatar"
                                />
                            }
                        />
                        <Button
                            htmlType={!this.state.changeAvatar ? "submit" : "button"}
                            disabled={this.state.changingSetting === !this.state.changeAvatar}
                        >
                            Change Avatar
                        </Button>
                    </List.Item>
                </List>

            </Form>
        )
    }
}

export default withRouter(UserSettingsForm);