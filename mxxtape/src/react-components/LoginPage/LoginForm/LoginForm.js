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
                                this.handleRedirect("register");
                                }
                            }
                        >
                            Register now!
                        </Button>
                        <Button
                            className="login-form-forgot"
                            type="link"
                            onClick={() => {
                                this.handleRedirect("password")}
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
