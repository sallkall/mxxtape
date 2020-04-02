import React from "react";
import {BrowserRouter as Router, withRouter} from "react-router-dom";
import "./index.css";
import LoginForm from "./LoginForm/LoginForm.js";
import {Button, Form} from "antd";
import {login, readCookie} from "../../actions/user";


class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        console.log("Construct Login Page", props);
        this.app = this.props.app;//this.props.app;
        // this.handleLogin = this.handleLogin.bind(this.app)
    }

    state = {
        username: "",
        password: ""
    };

    handleLogin = (username, password) => {
        console.log(this.app);
        this.setState(
            {"username": username, "password": password},
            () => {
                login(this, this.app);
                this.props.history.push("/");
            })
    };

    render() {
        const NormalLoginForm = Form.create({ name: "normal_login"})(
            LoginForm
        );

        return (
            <Router>
                <div className="Login">
                    <div className="login-form">
                        <div className="form-box login-form">
                            <h2>WELCOME to mxxtape</h2>

                            Please login to continue

                            <NormalLoginForm
                                handleLogin={this.handleLogin}
                            />
                            <div>
                                <Button
                                    className="login-form-register"
                                    type="link"
                                    onClick={() => {
                                        this.props.history.push('/'+this.app.state.register);
                                    }}
                                >
                                    Register now!
                                </Button>
                                <Button
                                    className="login-form-forgot"
                                    type="link"
                                    onClick={() => {
                                        this.props.history.push('/'+this.app.state.forgot_password)
                                    }}
                                >
                                    Forgot password
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}
export default withRouter(LoginPage);
