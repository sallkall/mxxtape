import React from "react";

import "./index.css";
import 'antd/dist/antd.css';
import {Button, Form, Icon, Input} from "antd";
import {withRouter} from "react-router-dom";

class ForgotPasswordForm extends React.Component {
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
                    <Input.Password placeholder="New password"/>
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
                    <Input.Password placeholder="Confirm password"/>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="button"
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
export default withRouter(ForgotPasswordForm);