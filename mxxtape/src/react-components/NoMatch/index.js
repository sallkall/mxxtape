import React from "react";

import "./index.css";
import 'antd/dist/antd.css';
import Nav from "../Navigation";
import {Icon} from "antd";

class NoMatch extends React.Component {
    render() {
        return (
            <div className="text-center">
                <Nav/>
                <header className="text-center no-match-header">
                    <Icon type={"frown"}/> <br/>
                    Sorry! this page doesn't exist
                </header>
            </div>
        )
    }
}
export default NoMatch;