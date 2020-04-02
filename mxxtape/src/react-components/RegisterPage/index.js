import React from "react";
import "./index.css";
import {Form} from "antd";
import RegisterForm from "./RegisterForm/RegisterForm";


class RegisterPage extends React.Component {

    render() {
        const RegisterPageRegisterForm = Form.create({ name: "register"})(
            RegisterForm
        );

        return (
            <div className="Register">
                <div className="register-form">
                    <h2 className="register-form-header">
                        RegisterPage
                    </h2>
                    <RegisterPageRegisterForm />
                </div>
            </div>
        )

    }
}
export default RegisterPage;
