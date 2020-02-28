import React from "react";
import "./index.css";
import LoginForm from "./LoginForm/LoginForm.js";
import { Form } from "antd";


class LoginPage extends React.Component {

  render() {
    const NormalLoginForm = Form.create({ name: "normal_login"})(
        LoginForm
    );
    //TODO: Remove after this
    console.log("LoginPage", this.props.state);
    //TODO: Remove before this
    return (
          <div className="Login">
              <div className="login-form">
                  <br/><br/><br/><br/><br/>
                  <h3>
                      Login
                  </h3>
                  <NormalLoginForm state={this.props.state}/>
              </div>
          </div>
      );
  }
}
export default LoginPage;
