import React from "react";
import "./index.css";
import {Form} from "antd";
import RegisterForm from "./RegisterForm/RegisterForm";


class Register extends React.Component {

    render() {
        const {state} = this.props;

        const RegisterPageRegisterForm = Form.create({ name: "register"})(
            RegisterForm
        );

        return (
            <div className="Register">
                <div className="register-form">
                    <h2 className="register-form-header">
                        Register
                    </h2>
                    <RegisterPageRegisterForm />
                </div>
            </div>
        )

    }
}
export default Register;
