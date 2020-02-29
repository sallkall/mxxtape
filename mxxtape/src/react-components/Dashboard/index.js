import React from "react";

import "./styles.css";
import 'antd/dist/antd.css';
import Nav from "../Navigation";
import {Redirect} from "react-router-dom";

class Dashboard extends React.Component {
    render() {
        const {state} = this.props;
        if (state.loggedIn === -1) {
            return (<Redirect to='/login'/>)
        } else {
            return (
                <div><Nav state={state} /></div>
            )
        }
    }
}
export default Dashboard;