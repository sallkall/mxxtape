import React from "react";

import "./index.css";
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
            <div className="forgot-password">
                <div className="forgot-password-form">
                    <header className="form-header">
                        Forgot Password
                    </header>
                    <ForgotPasswordPageForm />
                </div>
            </div>
        )
    }
}
export default ForgotPassword;