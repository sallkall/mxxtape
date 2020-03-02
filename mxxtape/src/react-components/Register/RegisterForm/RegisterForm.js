import React from "react";
import './RegisterForm.css'
import {Button, Form, Icon, Input, message} from "antd";
import {withRouter} from "react-router-dom";

function checkValidEmail(email) {
    // regex for email taken from https://emailregex.com
    const isEmailAddress = email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    if (!isEmailAddress){
        message.error('You must enter a valid email address!')
    }
    return isEmailAddress;
}

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        console.log("Construct Register Form", props);
    }

    state = {
        confirmDirty: false,
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                if (checkValidEmail(values.email)) {
                    // will eventually need to make server calls to make new users
                    // for now nothing happens
                    message.success('Registration Successful! Please login to continue');
                    this.props.history.push("login");
                }
            }
        });
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

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form
                    onSubmit={this.handleSubmit}
                    className="register-form"
                >
                    <Form.Item>
                        {getFieldDecorator("email", {
                            rules: [{required: true, message: "Please input a valid email!", type: 'email'}]
                        })(
                            <Input
                                className="input"
                                prefix={<Icon type="mail" className="input-icon"/>}
                                placeholder="Email"
                            />
                        )}
                    </Form.Item>
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
                            className="register-form-button"
                        >
                            Register Now!
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default withRouter(RegisterForm);