import {Button, Form, Icon, Input, Mentions, message, Tooltip} from "antd";
import React from "react";
import {withRouter} from "react-router-dom";
import './index.css'
import {loadUsers, parseTaggedUsers, parseWords, registerNewCommunity} from "../../../actions/community";
import debounce from 'lodash/debounce';

const {Option} = Mentions;

class CreateCommunityForm extends React.Component {
    constructor(props){
        super(props);
        // tooltips
        this.tooltip = {
            name_tooltip: "Give your community a good name that doesn't overlap with existing communities! " +
                "Note that this can't be changed in the future.",
            genre_tooltip: "List as many genres as you like, but you need at least one.",
            description_tooltip: "Give an explanation of what you hope to see in your community. This will also be " +
                "how new members come to understand your community as well as explain what makes your community " +
                "unique!.",
            mods_tooltip: "Add some mods! You will be added automatically"
        };
        this.loadUsers = debounce(loadUsers, 500)
    }

    state = {
        validName: null,
        name: null,
        genres: null,
        description: null,
        moderators: null,
        users: [],
        loading: false,
        search: ''
    };

    onSearch = search => {
        this.setState({ search, loading: !!search, users: [] });
        console.log('onSearch:', search);
        this.loadUsers(search, this);
    };

    getExistingCommunityNames = () => {
        //will get this list of community names from server
        return {
            community_names: ["jazz it up"],
        }
    };

    checkCommunityName = (rule, value, callback) => {
        if (value){
            const cleanName = value.toLowerCase().replace(/\s/g, "");
            const communityNames = this.getExistingCommunityNames().community_names;

            for (let i = 0; i < communityNames.length; i++){
                if (cleanName === communityNames[i].toLowerCase().replace(/\s/g, "")) {
                    this.setState(
                        {validName: false},
                        () => {
                            console.log("community name invalid", value);
                            callback("This community exists already!")
                        }
                    )
                }
            }

            this.setState(
                {validName: false},
                () => {
                    console.log("community name accepted!", value);
                    callback()
                }
            );
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err) {
                console.log("CreateCommunityForm values", values);
                if(values) {
                    const mods = parseTaggedUsers(values.moderators);
                    console.log("mods", mods);
                    this.setState({
                        name: values.name,
                        genres: parseWords(values.genres),
                        description: values.description.toString(),
                        moderators: mods ? mods : []
                    }, () => registerNewCommunity(this, this.props.history))
                }
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
                    {getFieldDecorator("name", {
                        rules: [
                            {required: true, message: "Need a name for a new community!"},
                            {validator: this.checkCommunityName}
                        ]
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
                    {getFieldDecorator("genres", {
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
                    {getFieldDecorator("description", {
                        rules: [{required: true, message: "Explain why you think your community is unique."}]
                    })(
                        <Input.TextArea
                            className="community-input"
                            autoSize={{ minRows: 6, maxRows: 20 }}
                        />
                    )}
                </Form.Item>
                <Form.Item
                    id="control-mention"
                    label={
                        <span>
                            Add moderators to your community&nbsp;
                            <Tooltip title={this.tooltip.mods_tooltip} >
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    }
                >
                    {getFieldDecorator("moderators", {
                        rules: [{required: false, message: "Add some mods! You will be added automatically"}]
                    })(
                        <Mentions className="community-input" loading={this.state.loading} onSearch={this.onSearch}>
                            {this.state.users.map(({ username, avatar }) => (
                                <Option key={username} value={username} className="antd-demo-dynamic-option">
                                    <img src={avatar} alt={username} />
                                    <span>{username}</span>
                                </Option>
                            ))}
                        </Mentions>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="submit-button"
                    >
                        Submit for approval
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default withRouter(CreateCommunityForm);