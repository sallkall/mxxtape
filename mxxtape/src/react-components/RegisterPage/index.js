import React from "react";
import "./index.css";
import "../LoginPage/index.css"
import {Form} from "antd";
import RegisterForm from "./RegisterForm/RegisterForm";


class RegisterPage extends React.Component {

    render() {
        const RegisterPageRegisterForm = Form.create({ name: "register"})(
            RegisterForm
        );

        return (
            <div className="Login">
                <div className="form">
                    <div className="form-box form">
                        <h1 className={"header"}>First time here?</h1>
                        <h2 className={"header"}> Make an account!</h2>
                        <RegisterPageRegisterForm />
                    </div>
                </div>
            </div>
        )

    }
}
export default RegisterPage;
