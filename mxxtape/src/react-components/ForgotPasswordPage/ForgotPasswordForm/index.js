import React from "react";

import "./index.css";
import 'antd/dist/antd.css';
import {Form} from "antd";
import {withRouter} from "react-router-dom";

class ForgotPasswordForm extends React.Component {
    render() {
        const {state} = this.props;
        return (
            <Form>Forgot Password</Form>
        )
    }
}
export default withRouter(ForgotPasswordForm);