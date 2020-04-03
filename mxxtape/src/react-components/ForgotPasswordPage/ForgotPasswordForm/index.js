import React from "react";

import "./index.css";
import 'antd/dist/antd.css';
import {
    Form,
    Input,
    Button,
    message,
    Icon
} from 'antd';
import {withRouter} from "react-router-dom";

class ForgotPasswordForm extends React.Component {

    constructor(props) {
        super(props);
        console.log("Construct Forgot Password Form", props);
    }

    state = {
        confirmDirty: false,
    };

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

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                // will eventually need to make server calls to make change the user password
                // will need to have callback that the user exists
                console.log(values.username);
                // on success send password data to server
                console.log('changing password', values.password);
                // for now nothing happens
                message.success('Password Change Successful! Please login to continue');
                this.props.history.push('/login');
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="forgot-password-form">
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
                            className="forgot-password-form-button"
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default withRouter(ForgotPasswordForm);