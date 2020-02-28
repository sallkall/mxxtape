import React from "react";
import "./index.css";
import LoginForm from "./LoginForm/LoginForm.js";
import { Form } from "antd";
import { Redirect } from "react-router-dom";


class LoginPage extends React.Component {

    renderLogin = () => {
    }

    render() {
        const {state, handleLoggedIn} = this.props;

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
                        <h3>
                            Login
                        </h3>
                        <NormalLoginForm
                            handleLoggedIn={handleLoggedIn}
                            loggedIn={state.loggedIn}
                        />
                    </div>
                </div>
            )
        }

        // return (
        //     setTimeout(this.renderLogin(), 1000)
        // );
    }
}
export default LoginPage;
