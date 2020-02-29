import React from "react";
import './index.css'
import {Icon, List, Button} from 'antd'

class UserSettingsForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: this.props,
            user: null,
        };
    }

    componentDidMount() {
        //make server call with state.username
        //populate email. displayName, about, spotifyConnected, links to avatar
        const user = {
            email: "user@user.com",
            displayName: "user-display-name",
            about: "Lorem Ipsum...?",
            spotifyConnected: "user-spotify-account",
            avatar: "https://yt3.ggpht.com/a/AGF-l7-11--_67EpTJhLCO6c4xBXPLHhC0C4GXaoQg=s900-c-k-c0xffffffff-no-rj-mo"
        };
        //callback
        this.updateStateFromServer(user)
    }

    updateStateFromServer = (user) => {
        this.setState(
            {
                email: user.email,
                displayName: user.displayName,
                about: user.about,
                spotifyConnected: user.spotifyConnected,
                avatar: user.avatar
            }
        );
    };

    changeEmail = () => {
        this.setState()
    }

    render() {
        return (
            <div>
                <header className="settings-header">
                    <Icon type="AiFillSetting" className="header-icon"/>
                    Account Settings
                </header>

                <header className="settings-subheader">ACCOUNT PREFERENCES</header>
                <hr/>
                <List>
                    <List.Item>
                        <List.Item.Meta
                            title={"Email Address"}
                            description={this.state.email}
                        />
                        <Button type="button">CHANGE</Button>
                    </List.Item>
                    <List.Item>
                        <List.Item.Meta
                            title={"Change Password"}
                            description={"Password must be at least 6 characters long"}
                        />
                        <Button type="button">CHANGE</Button>
                    </List.Item>
                    <List.Item>
                        <List.Item.Meta
                            title={"Spotify Account"}
                            description={ this.state.spotifyConnected ? this.state.spotifyConnected : "Not Connected :("}
                        />
                        <Button type="button">Change Spotify account</Button>
                    </List.Item>
                    <List.Item>
                        <List.Item.Meta
                            title={"Deactivate Account"}
                        />
                        <Button type="button" className="red"><Icon type="delete"/>Deactivate Account</Button>
                    </List.Item>
                </List>
                <header className="settings-header">
                    <Icon type="AiFillSetting" className="header-icon"/>
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
                        <Button type="button">Change display name</Button>
                    </List.Item>
                    <List.Item>
                        <List.Item.Meta
                            title={"About"}
                            description={this.state.about}
                        />
                        <Button type="button">Change about</Button>
                    </List.Item>
                </List>
                <header className="settings-subheader">Images</header>
                <hr/>
                <List>
                    <List.Item>
                        <List.Item.Meta
                            title={"Avatar"}
                            description={<img className="settings-avatar" src={this.state.avatar} /> }
                        />
                        <Button type="button">CHANGE</Button>
                    </List.Item>
                </List>

            </div>
        )
    }
}

export default UserSettingsForm;