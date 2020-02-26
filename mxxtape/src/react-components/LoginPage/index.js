import React from "react";
import "./index.css";
import LoginForm from "./LoginForm/LoginForm.js";
import { Form } from "antd";


class LoginPage extends React.Component {

  render() {
    const NormalLoginForm = Form.create({ name: "normal_login" })(
        LoginForm
    );
    return (
          <div className="Login">
              <div className="login-form">
                  <h3>
                      Login
                  </h3>
                  <NormalLoginForm />
              </div>
          </div>
      );
  }
}
export default LoginPage;
