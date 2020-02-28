import React from "react";
import './LoginForm.css'

import {Form, Icon, Input, Button, Checkbox, message} from "antd";
import ReactDOM from 'react-dom';
import { Redirect } from "react-router-dom";
// import { Redirect } from "react-router-dom";

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        console.log("Construct Login Form", props);
        this.state = {
            loggedIn: -1
        };

    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                if (values.username === 'user' && values.password === 'user') {
                    this.setState({loggedIn: 1}, () => console.log("user loggedIn", this.state.loggedIn) );
                    message.success('Login Successful! Welcome ' + values.username);
                } else if (values.username === 'admin' && values.password === 'admin') {
                    this.setState({loggedIn: 2}, () => console.log("admin loggedIn", this.state.loggedIn) );
                    message.success('Login Successful! Welcome ' + values.username);
                }else {
                    console.log("incorrect username and password", this.state.loggedIn);
                    message.error('Incorrect username or password');
                }
            }
        });
    };

    render() {
        //TODO: Remove after this
        // console.log("LoginForm", this.props.state);
        //TODO: Remove before this

        const {getFieldDecorator} = this.props.form;

        if (this.state.loggedIn !== -1) {
            return (<Redirect to='/'/>)
        } else {
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
                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                // onclick={this.redirect('/')}
                            >
                                Log In
                            </Button>
                            Or <a href="">Register now!</a>
                        </Form.Item>
                    </Form>
                </div>
            );
        }
    }
}

const NormalLoginForm = Form.create({name: "normal_login"})(
    LoginForm
);

ReactDOM.render(<NormalLoginForm/>, document.getElementById('root'));

export default NormalLoginForm;
