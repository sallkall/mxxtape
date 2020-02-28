import React from "react";
import "./index.css";
// import { Form } from "antd";
import { Redirect } from "react-router-dom";


class Register extends React.Component {

    render() {
        const {state} = this.props;

        // if (state.loggedIn !== -1) {
        //     return (<Redirect to='/'/>)
        // } else {
            return (
                <div className="Register">
                    <div className="register-form">
                        <br/><br/><br/><br/><br/>
                        <h2>
                            Register
                        </h2>
                    </div>
                </div>
            )
        // }
    }
}
export default Register;
