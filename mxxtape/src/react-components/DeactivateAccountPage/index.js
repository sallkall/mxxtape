import React from "react";
import "./index.css";
import {Button, Form, Icon, List} from "antd";


class DeactivateAccountPage extends React.Component {

    render() {
        const {state} = this.props;

        return (
            <div className="deactivate">
                <div className="deactivate">
                    <br/><br/><br/><br/><br/>
                    <h2>
                        Deactivate Account
                    </h2>
                </div>
            </div>
        )

    }
}
export default DeactivateAccountPage;

//from account settings'
// <List.Item>
//     <List.Item.Meta
//         title={"Deactivate Account"}
//     />
//     <Button
//         className="red"
//         type="button"
//         // onclick={this.redirect("/deactivate")}
//         onClick={console.log("deactivate")}
//         disabled={this.state.changingSetting}
//     >
//         <Icon type="delete"/>Deactivate Account
//     </Button>
// </List.Item>