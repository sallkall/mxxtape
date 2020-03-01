import React from "react";
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

        if (state.loggedIn !== -1) {
            return (<Redirect to='/'/>)
        } else {
            return (
                <div className="Login">
                    <div className="login-form">
                        <br/><br/><br/><br/><br/>
                        <h2>
                            Login
                        </h2>
                        <NormalLoginForm
                            handleLoggedIn={state.handleLoggedIn}
                            loggedIn={state.loggedIn}
                        />
                    </div>
                </div>
            )
        }
    }
}
export default LoginPage;
