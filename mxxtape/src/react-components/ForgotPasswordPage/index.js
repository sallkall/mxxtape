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
                    <h2 className="form-header">
                        Forgot Password
                    </h2>
                    <ForgotPasswordPageForm />
                </div>
            </div>
        )
    }
}
export default ForgotPassword;