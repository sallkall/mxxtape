import React from "react";
import './LoginForm.css'

// import {Form, Icon, Input, Button, Checkbox, message} from "antd";
import {Form, Icon, Input, Button, message} from "antd";
import {withRouter} from "react-router-dom";

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        console.log("Construct Login Form", props);
        this.state = {
            loggedIn: this.props
        };

    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                //Code below requires server calls to check if values.username is a valid username
                //and if values.password is a valid password for this user
                if (values.username === 'user' && values.password === 'user') {
                    this.setState(
                        //Server call needed: loggedIn will eventually require user's information instead of 1 or 2
                        {loggedIn: 1},
                        () => {
                            console.log("user loggedIn", this.state.loggedIn);
                        }
                    );
                    message.success('Login Successful! Welcome ' + values.username);
                } else if (values.username === 'admin' && values.password === 'admin') {
                    this.setState(
                        {loggedIn: 2},
                        () => {
                            console.log("admin loggedIn", this.state.loggedIn);
                        }
                    );
                    message.success('Login Successful! Welcome ' + values.username);
                }else {
                    console.log("incorrect username and password", this.state.loggedIn);
                    message.error('Incorrect username or password');
                }
            }
        });
    };

    handleRedirect = (addr) => {
        console.log("/" + addr);
        this.props.history.push("/" + addr);
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const { handleLoggedIn, state } = this.props;
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator("username", {
                            rules: [{required: true, message: "Please input your username!"}]
                        })(
                            <Input
                                prefix={<Icon type="user" className="input-icon"/>}
                                placeholder="Username"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("password", {
                            rules: [{required: true, message: "Please input your password!"}]
                        })(
                            <Input
                                prefix={<Icon type="lock" className="input-icon"/>}
                                type="password"
                                placeholder="Password"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            onSubmit={ setTimeout(handleLoggedIn(this.state.loggedIn), 2000) }
                        >
                            Log In
                        </Button>
                        <Button
                            className="login-form-register"
                            type = "link"
                            onClick={() => {
                                this.handleRedirect(state.register);
                            }
                            }
                        >
                            Register now!
                        </Button>
                        <Button
                            className="login-form-forgot"
                            type="link"
                            onClick={() => {
                                this.handleRedirect(state.forgot_password)}
                            }
                        >
                            Forgot password
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default withRouter(LoginForm);