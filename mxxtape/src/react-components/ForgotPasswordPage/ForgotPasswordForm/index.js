import React from "react";

import "./index.css";
import 'antd/dist/antd.css';
import {Button, Form, Icon, Input, message} from "antd";
import {withRouter} from "react-router-dom";

class ForgotPasswordForm extends React.Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                // if (checkValidEmail(values.email)) {
                    // will eventually need to make server calls to make new users
                    // for now nothing happens
                    message.success('Password Change Successful! Please login to continue');
                    this.props.history.push("login");
                // }
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form
                onSubmit={this.handleSubmit}
                className="forgot-password-form"
            >
                <Form.Item>
                    {getFieldDecorator("username", {
                        rules: [{required: true, message: "Please input your username!"}]
                    })(
                        <Input
                            className="input"
                            prefix={<Icon type="user"  className="input-icon"/>}
                            placeholder="Username"
                        />
                    )}
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password
                        className="input"
                        prefix={<Icon type="lock" className="input-icon"/>}
                        placeholder="New password"/>
                </Form.Item>

                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        className="input"
                        prefix={<Icon type="lock" className="input-icon"/>}
                        placeholder="Confirm password"/>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="forgot-password-form-button"
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
export default withRouter(ForgotPasswordForm);