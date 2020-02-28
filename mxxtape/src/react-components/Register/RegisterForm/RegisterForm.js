import React from "react";
import './RegisterForm.css'
import {Button, Form, Icon, Input, message} from "antd";
import {withRouter} from "react-router-dom";

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        console.log("Construct Register Form", props);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                this.props.history.push("login");
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator("Email", {
                            rules: [{required: true, message: "Please input your email!"}]
                        })(
                            <Input
                                prefix={<Icon type="mail" style={{color: "rgba(0,0,0,.25)"}}/>}
                                placeholder="Email"
                            />
                        )}
                    </Form.Item>
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
                        >
                            Register Now
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default withRouter(RegisterForm);