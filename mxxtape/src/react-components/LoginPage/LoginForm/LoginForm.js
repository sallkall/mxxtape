import React from "react";
import './LoginForm.css'

import {Form, Icon, Input, Button, Checkbox, message} from "antd";

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
                if (values.username === 'user' && values.password === 'user') {
                    this.setState(
                        {loggedIn: 1},
                        () => {
                            console.log("user loggedIn", this.state.loggedIn);
                        }
                    );
                    message.success('Login Successful! Welcome ' + values.username);
                } else if (values.username === 'admin' && values.password === 'admin') {
                    this.setState(
                        {loggedIn: 2},
                        () => console.log("admin loggedIn", this.state.loggedIn)
                    );
                    message.success('Login Successful! Welcome ' + values.username);
                }else {
                    console.log("incorrect username and password", this.state.loggedIn);
                    message.error('Incorrect username or password');
                }
            }
        });
    };

    handleRegister = () => {
        this.props.history.push("/register");
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const { handleLoggedIn } = this.props;
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator("username", {
                            rules: [{required: true, message: "Please input your username!"}]
                        })(
                            <Input
                                prefix={<Icon type="user" style={{color: "rgba(0,0,0,.25)"}}/>}
                                placeholder="Username"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("password", {
                            rules: [{required: true, message: "Please input your password!"}]
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{color: "rgba(0,0,0,.25)"}}/>}
                                type="password"
                                placeholder="Password"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("remember", {
                            valuePropName: "checked",
                            initialValue: true
                        })(<Checkbox>Remember me</Checkbox>)}
                        <a className="login-form-forgot">
                            Forgot password
                        </a>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            onClick={ () => setTimeout(handleLoggedIn(this.state.loggedIn), 100)
                                }
                        >
                            Log In
                        </Button>
                        Or <a>Register now!</a>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default LoginForm;
