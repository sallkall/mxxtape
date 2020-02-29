import React from "react";
import './index.css'
import {Icon, List, Button, Form, Input} from 'antd'

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
        // needed to maintain switchDescToInput
        this.email = "email";
        this.password = "password";
        this.spotifyAccount = "spotifyAccount";
        this.deactivateAccount = "deactivateAccount";
        this.displayName = "displayName";
        this.about = "about";
        this.avatar = "avatar";
    }

    componentDidMount() {
        //make server call with state.username
        //populate email. displayName, about, spotifyConnected, links to avatar
        const user = {
            email: "user@user.com",
            password: "user",
            displayName: "user-display-name",
            about: "Lorem Ipsum...?",
            spotifyConnected: "user-spotify-account",
            avatar: "https://yt3.ggpht.com/a/AGF-l7-11--_67EpTJhLCO6c4xBXPLHhC0C4GXaoQg=s900-c-k-c0xffffffff-no-rj-mo"
        };
        //callback
        this.updateStateFromServer(user)
    }

    updateStateFromServer = (user) => {
        console.log("Getting user info from server");
        this.setState(
            {
                email: user.email,
                password: user.password,
                displayName: user.displayName,
                about: user.about,
                spotifyConnected: user.spotifyConnected,
                avatar: user.avatar
            }
        );
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err) {
                console.log("Received values of form: ", values);
                this.updateServerInfo(values);
            }
        })
    };

    updateServerInfo = (values) => {
        //make call to server to update user info from values
        console.log("Updated Server Info");
        //get user info again
        let user = {
            email: values.email ? values.email : this.state.email,
            password: this.state.password,
            displayName: this.state.displayName,
            about: this.state.about,
            spotifyConnected: this.state.spotifyConnected,
            avatar: this.state.avatar
        };
        //need to update user info from server
        this.updateStateFromServer(user);
    };

    switchDescToInput = (d) => {
        this.setState({changingSetting: !this.state.changingSetting});

        if (d === this.email) {
            console.log("change email", !this.state.changeEmail);
            this.setState({
                changeEmail: !this.state.changeEmail
            });
        } else if (d === this.password) {
            console.log("change Password", !this.state.changePassword);
            this.setState({
                changePassword: !this.state.changePassword
            })
        } else if (d === this.deactivateAccount) {
            console.log("deactivate Account", !this.state.deactivateAccount);
            this.setState({
                deactivateAccount: !this.state.deactivateAccount
            })
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
                            title={"Email Address"}
                            description={this.state.changeEmail ?
                                <Form.Item>
                                    {getFieldDecorator("email", {
                                        initialValue: this.state.email,
                                        rules: [{required: true, message: "Please input your email!"}]
                                    })(
                                        <Input className="settings-field" />
                                    )}
                                </Form.Item>
                                : this.state.email
                            }
                        />
                        <Button
                            onClick={() => {
                                this.switchDescToInput(this.email)
                            }}
                            htmlType={!this.state.changeEmail ? "submit" : "button"}
                            disabled={this.state.changingSetting === !this.state.changeEmail}
                        >
                            {this.state.changeEmail ? "Save New": "Change" } Email
                        </Button>
                    </List.Item>
                    <List.Item>
                        <List.Item.Meta
                            title={"Change Password"}
                            // description={"Password must be at least 6 characters long"}
                            description={this.state.changePassword ?
                                <Form.Item>

                                    {getFieldDecorator("password", {
                                        initialValue: this.state.password,
                                        rules: [{required: true, message: "Please input a password!"}]
                                    })(
                                        <Input className="settings-field" type="password"/>
                                    )}
                                </Form.Item>
                                : "Password must be at least 6 characters long"
                            }
                        />
                        <Button
                            onClick={() => {
                                this.switchDescToInput(this.password)
                            }}
                            htmlType={!this.state.changePassword ? "submit" : "button"}
                            disabled={this.state.changingSetting === !this.state.changePassword}
                        >
                            Change Password
                        </Button>
                    </List.Item>
                    <List.Item>
                        <List.Item.Meta
                            title={"Spotify Account"}
                            description={ this.state.spotifyConnected ? this.state.spotifyConnected : "Not Connected :("}
                        />
                        <Button
                            disabled={this.state.changingSetting === !this.state.changeSpotifyAccount}
                            htmlType={!this.state.changeSpotifyAccount ? "submit" : "button"}
                        >
                            Change Spotify account
                        </Button>
                    </List.Item>
                    <List.Item>
                        <List.Item.Meta
                            title={"Deactivate Account"}
                        />
                        <Button
                            className="red"
                            onclick={()=>{this.switchDescToInput(this.deactivateAccount)}}
                            htmlType={!this.state.deactivateAccount ? "submit" : "button"}
                            disabled={this.state.changingSetting === !this.state.deactivateAccount}
                        >
                            <Icon type="delete"/>Deactivate Account
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

export default UserSettingsForm;