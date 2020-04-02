import React from "react";
import './LoginForm.css'

// import {Form, Icon, Input, Button, Checkbox, message} from "antd";
import {Form, Icon, Input, Button, message} from "antd";
import {withRouter} from "react-router-dom";

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        console.log("Construct Login Form", props);
        this.handleLogin = this.props.handleLogin;
    }

    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("TODO: HANDLE LOGIN: ", values);
                this.handleLogin(values.username, values.password)
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator("username", {
                            rules: [{required: true, message: "Please input your username!"}]
                        })(
                            <Input
                                className="input"
                                prefix={<Icon type="user" className="input-icon"/>}
                                placeholder="Username"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("password", {
                            rules: [{required: true, message: "Please input your password!"}]
                        })(
                            <Input.Password
                                className="input"
                                prefix={<Icon type="lock" className="input-icon"/>}
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
                            Log In
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default withRouter(LoginForm);