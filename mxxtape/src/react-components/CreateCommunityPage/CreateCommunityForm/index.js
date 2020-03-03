import {Form, Input, Tooltip, Icon, Mentions, Button} from "antd";
import React from "react";
import {withRouter} from "react-router-dom";
import './index.css'

const {Option} = Mentions;

class CreateCommunityForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        // tooltips
        this.tooltip = {
            name_tooltip: "Give your community a good name that doesn't overlap with existing communities! " +
                "Note that this can't be changed in the future.",
            genre_tooltip: "List as many genres as you like, but you need at least one.",
            description_tooltip: "Give an explanation of what you hope to see in your community. This will also be " +
                "how new members come to understand your community as well as explain what makes your community " +
                "unique!.",
            mods_tooltip: "Add some mods! You will be added automatically"
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err) {
                console.log("Received values of form: ", values);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item
                    label={
                        <span>
                            Name your community&nbsp;
                            <Tooltip title={this.tooltip.name_tooltip} >
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    }
                >
                    {getFieldDecorator("community-name", {
                        rules: [{required: true, message: "Need a name for a new community!"}]
                    })(
                        <Input
                            className="community-input-short"
                        />
                    )}
                </Form.Item>
                <Form.Item
                    label={
                        <span>
                            What genres of music will your community be interested in?&nbsp;
                            <Tooltip title={this.tooltip.genre_tooltip} >
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    }
                >
                    {getFieldDecorator("community-genre", {
                        rules: [{required: true, message: "Please enter a genre your community will be interested in"}]
                    })(
                        <Input
                            className="community-input"
                        />
                    )}
                </Form.Item>
                <Form.Item
                    label={
                        <span>
                            Description &nbsp;
                            <Tooltip title={this.tooltip.description_tooltip} >
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    }
                >
                    {getFieldDecorator("community-description", {
                        rules: [{required: true, message: "Explain why you think your community is unique."}]
                    })(
                        <Input.TextArea
                            className="community-input"
                            autoSize={{ minRows: 6, maxRows: 20 }}
                        />
                    )}
                </Form.Item>
                <Form.Item
                    label={
                        <span>
                            Add moderators to your community&nbsp;
                            <Tooltip title={this.tooltip.mods_tooltip} >
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    }
                >
                    {getFieldDecorator("community-mods", {
                        rules: [{required: false, message: "Add some mods! You will be added automatically"}]
                    })(
                        <Mentions
                            className="community-input"
                            placeholder="Add moderators! Use @ to reference users on this platform.">
                            <Option value="sallyk">sallyk</Option>
                            <Option value="janetw">janetw</Option>
                            <Option value="connorf">connorf</Option>
                        </Mentions>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="submit-button"
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default withRouter(CreateCommunityForm);