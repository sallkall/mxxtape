import React from "react";

// import "./index.css";
import "../LoginPage/index.css"
import 'antd/dist/antd.css';
import ForgotPasswordForm from "./ForgotPasswordForm";
import {Form} from "antd";

class ForgotPassword extends React.Component {
    render() {
        const {state} = this.props;

        const ForgotPasswordPageForm = Form.create({name: 'forgot-password'}) (
            ForgotPasswordForm
        );

        return (
            <div className="Login">
                <div className="form">
                    <div className="form-box form">
                        <h2 className="dark">
                            Forgot Password
                        </h2>
                        <ForgotPasswordPageForm />
                    </div>
                </div>
            </div>
        )
    }
}
export default ForgotPassword;