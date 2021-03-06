import React from "react";
import {Form, Icon, Input} from "antd";
import '../ForgotPasswordForm/index.css'

class PasswordValidator extends React.Component {
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

    render() {
        const { getFieldDecorator } = this.props.form;
        const {handleSubmit} = this.props;

        return (
            <Form onSubmit={handleSubmit}>
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
            </Form>
        );
    }
}
export default PasswordValidator;