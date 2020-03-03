import React from "react";
import {BrowserRouter as Router, withRouter} from "react-router-dom";
import "./index.css";
import LoginForm from "./LoginForm/LoginForm.js";
import { Form} from "antd";
import { Redirect } from "react-router-dom";



class LoginPage extends React.Component {

    render() {
        const {state} = this.props;

        const NormalLoginForm = Form.create({ name: "normal_login"})(
            LoginForm
        );

        return (
            <Router>
                <div className="Login">
                    <div className="login-form">
                        <h2 className="form-header">
                            Login
                        </h2>
                        <NormalLoginForm
                            handleLoggedIn={state.handleLoggedIn}
                            loggedIn={state.loggedIn}
                            state={state}
                        />
                    </div>
                </div>
            </Router>
        )
    }
}
export default withRouter(LoginPage);
