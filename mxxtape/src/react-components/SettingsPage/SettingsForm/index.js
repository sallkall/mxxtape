import React from "react";
import './index.css'
import {List, Button, Form, Input, message, Upload, Avatar, Icon} from 'antd'
import {withRouter} from 'react-router-dom'
import {
    changeAbout,
    changeDisplayName,
    changeEmail,
    changePassword,
    checkValidEmail,
    getUserSettings
} from "../../../actions/settings";

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


class SettingsForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            changingSetting: false,
            changeEmail: false,
            changePassword: false,
            changeDisplayName: false,
            changeAbout: false,
            changeAvatar: false,
            uploadingAvatar: false
        };
        //don't change these variables,
        // needed to maintain changingSettingSToggle
        this.emailSetting = "email";
        this.passwordSetting = "password";
        this.displayNameSetting = "displayName";
        this.aboutSetting = "about";

        // temp variable for current user
        // only for phase 1, eventually will user information will include whether or not they are an admin
        this.isAdmin = this.props.isAdmin;
    }

    // reset the buttons
    resetDesc = () => {
        // console.log("resetting fields");
        this.setState(
            {
                changingSetting: false,
                changeEmail: false,
                changePassword: false,
                changeDisplayName: false,
                changeAbout: false,
                changeAvatar: false
            }
        )
    };

    componentDidMount() {
        //make server call with state.username passed from parent component
        this.updateStateFromServer()
    }

    //get user info from server
    updateStateFromServer = () => {
        getUserSettings(this.state.username, this, () => {
            const errorInput = "Something went wrong";
            const user = this.state.user;
            if (user){
                this.setState(
                    {
                        email: user.email ? user.email : errorInput,
                        password: user.password ? user.password : errorInput,
                        displayName: user.displayName ? user.displayName : user.username,
                        about: user.about ? user.about : "Change your about here!",
                        avatar: user.avatar ? user.avatar : "Change your avatar!",
                        isAdmin: user.type === 2
                    }
                );
            }
        });
    };

    redirect = addr => {
        console.log(addr);
        this.props.history.push(addr);
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err) {
                console.log("Received values of form: ", values);
                if (values.email && checkValidEmail(values.email)) {
                    changeEmail(this.state.username, values.email, this, this.updateStateFromServer);
                }
                if (values.password && values.confirm) {
                    changePassword(this.state.username, values.password, values.confirm);
                }
                if (values.displayName){
                    changeDisplayName(this.state.username, values.displayName, this, this.updateStateFromServer);
                }
                if (values.about){
                    changeAbout(this.state.username, values.about, this, this.updateStateFromServer)
                }
                //update avatar from server
                //reset the form with new values from server
                this.resetDesc();
            }
        })
    };

    updateServerInfo = (values) => {
        //make call to server to update user info from values
        console.log("Updated Server Info", values);
        fetch("/users/"+this.props.username+"/avatar", {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(values)})
            .catch(
                error => {
                    console.log(error);
                }
            );
        //message.success("Updated Info!")
    };

    // toggle for the buttons
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

    //****** validating passwords*****//
    handleConfirmBlur = e => {
        // using sample code from antd
        // https://3x.ant.design/components/form/
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        // using sample code from antd
        // https://3x.ant.design/components/form/
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('The passwords don\'t match!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        // using sample code from antd
        // https://3x.ant.design/components/form/
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };
    // *** end password functions ***//

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
                                    {/*<SettingsPasswordValidator handleSubmit={this.handleSubmit}/>*/}
                                    <Form.Item hasFeedback>
                                        {getFieldDecorator('password', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input your password!',
                                                },
                                                {
                                                    validator: this.validateToNextPassword,
                                                },
                                            ],
                                        })(<Input.Password
                                            className="input"
                                            prefix={<Icon type="lock" className="input-icon"/>}
                                            placeholder="New password"/>)}
                                    </Form.Item>
                                    <Form.Item hasFeedback>
                                        {getFieldDecorator('confirm', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please confirm your password!',
                                                },
                                                {
                                                    validator: this.compareToFirstPassword,
                                                },
                                            ],
                                        })(
                                            <Input.Password
                                                className="input"
                                                prefix={<Icon type="lock" className="input-icon"/>}
                                                placeholder="Confirm password"
                                                onBlur={this.handleConfirmBlur}
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
                        accept=".jpg, .jpeg, .png"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={this.handleAvatarChange}
                    >
                        {/*this feature made with help from antd*/}
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