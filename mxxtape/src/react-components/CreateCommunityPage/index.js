import React from "react";

import "./styles.css";
import 'antd/dist/antd.css';
import Nav from "../Navigation";

class CreateCommunityPage extends React.Component {
    render() {
        const {state} = this.props;
        return (
            <div><Nav state={state} /> Create Community</div>
        )
    }
}
export default CreateCommunityPage;