import React from "react";
import {BrowserRouter as Router, withRouter} from "react-router-dom";
import "./index.css";
import LoginForm from "./LoginForm/LoginForm.js";
import { Form} from "antd";


class LoginPage extends React.Component {

    render() {
        const {state, app} = this.props;

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
                            app={app}
                        />
                    </div>
                </div>
            </Router>
        )
    }
}
export default withRouter(LoginPage);
