import React from "react";
import './LoginForm.css'

// import {Form, Icon, Input, Button, Checkbox, message} from "antd";
import {Form, Icon, Input, Button, message} from "antd";
import {withRouter} from "react-router-dom";
import {login} from "../../../actions/user";

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        console.log("Construct Login Form", props);
        this.app = this.props
    }

    state = {
        username: "",
        password: ""
    };

    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("TODO: HANDLE LOGIN: ", values);
                this.setState(
                    {"username": values.username, "password": values.password},
                    () => {login(this, this.app); this.props.history.push("/");})
            }
        });
    };

    // handleRedirect = (addr) => {
    //     console.log("/" + addr);
    //     this.props.history.push("/" + addr);
    // };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {app} = this.props;

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
                        <Button
                            className="login-form-register"
                            type="link"
                            onClick={() => {
                                // this.handleRedirect(state.register);
                            }}
                        >
                            Register now!
                        </Button>
                        <Button
                            className="login-form-forgot"
                            type="link"
                            onClick={() => {
                                // this.handleRedirect(state.forgot_password)
                            }}
                        >
                            Forgot password
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default withRouter(LoginForm);