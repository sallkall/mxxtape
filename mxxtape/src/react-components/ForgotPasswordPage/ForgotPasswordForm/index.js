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
import PasswordValidator from "../PasswordValidator";

class ForgotPasswordForm extends React.Component {

    constructor(props) {
        super(props);
        console.log("Construct Forgot Password Form", props);
    }

    state = {
        confirmDirty: false,
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                // will eventually need to make server calls to make change the user password
                // will need to have callback that the user exists
                console.log(values.user);
                // on success send password data to server
                console.log('changing password', values.password);
                // for now nothing happens
                message.success('Password Change Successful! Please login to continue');
                this.props.history.push('/login');
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
        const { getFieldDecorator } = this.props.form;
        const ForgotPasswordValidator = Form.create({name:'password validator'})(
            PasswordValidator
        );

        return (
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
                <ForgotPasswordValidator handleSubmit={this.handleSubmit}/>
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
        );
    }
}
export default withRouter(ForgotPasswordForm);