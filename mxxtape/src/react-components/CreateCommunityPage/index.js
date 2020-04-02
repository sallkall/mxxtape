import React from "react";

import "./styles.css";
import 'antd/dist/antd.css';
import Nav from "../Navigation";
import {Form} from "antd";
import CreateCommunityForm from "./CreateCommunityForm";

class CreateCommunityPage extends React.Component {
    render() {
        const CreateACommunityForm = Form.create({name: 'create_a_community'})(
            CreateCommunityForm
        );
        return (
            <div>
                <Nav app={this.props.app} />
                <div className="create-community-form">
                    <header className="create-community-header">
                        Create a community!
                    </header>
                    <hr/>
                    <CreateACommunityForm/>
                </div>
            </div>
        )
    }
}
export default CreateCommunityPage;