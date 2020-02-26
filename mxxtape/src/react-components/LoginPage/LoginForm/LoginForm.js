import React from "react";
import './LoginForm.css'

import { Form, Icon, Input, Button, Checkbox } from "antd";
import ReactDOM from 'react-dom';
import {BrowserRouter, Link} from "react-router-dom";

class LoginForm extends React.Component {

    state = {
        validated: false
    };

    // handleClick = e =>{
    //     this.props.form.validateFields((err, values) => {
    //         if (!err) {
    //             console.log("Received values of form: ", values);
    //             if (values.username === 'user' && values.password ==='user'){
    //                 this.state.validated = true
    //                 console.log("user validated", this.state.validated)
    //             } else {
    //                 console.log("incorrect username and password", this.state.validated)
    //             }
    //         }
    //     });
    //     // setTimeout(window.location.reload(), 1000)
    // }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                if (values.username === 'user' && values.password ==='user'){
                    this.state.validated = true
                    console.log("user validated", this.state.validated)
                } else {
                    console.log("incorrect username and password", this.state.validated)
                }
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator("username", {
                            rules: [{ required: true, message: "Please input your username!" }]
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                                placeholder="Username"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("password", {
                            rules: [{ required: true, message: "Please input your password!" }]
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
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
                            onClick={this.handleClick}
                        >
                            <BrowserRouter><Link to={this.state.validated?"/":"/login"} >Log in</Link></BrowserRouter>
                            {/*Login*/}
                        </Button>
                        Or <a href="">Register now!</a>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const NormalLoginForm = Form.create({ name: "normal_login" })(
    LoginForm
);

ReactDOM.render(<NormalLoginForm/>, document.getElementById('root'));

export default NormalLoginForm;
