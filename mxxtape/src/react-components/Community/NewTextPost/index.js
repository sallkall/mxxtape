import React from "react";
import "./styles.css";
import 'antd/dist/antd.css';
import NewPostTags from "../NewPostTags";

import {Button, Modal, Form, Input, Icon, Upload, Rate, Layout, Mentions, Tooltip} from 'antd';

import {posts} from "../TextPost";
import moment from "moment";
import MusicLinkUpload from "../MusicLinkUpload";

const {Option} = Mentions;
const {Sider, Content} = Layout;


const NewTextPostCreateForm = Form.create({name: 'textpost_form'})(
    class extends React.Component {

        validateContentInput = (rule, value, callback) => {
            const { form } = this.props;
            if (value) {
                form.validateFields(['confirm'], { force: true });
                if (value.length > 140) {
                    callback('Exceeded maximum characters');
                } else {
                    callback();
                }
            }
            callback();
        };

        render() {
            const {visible, onCancel, onCreate, form} = this.props;
            // console.log("my props:", this.props);
            const {getFieldDecorator} = form;


            return (
                <Modal
                    visible={visible}
                    title="New Text Post"
                    okText="Post"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="horizontal">
                        <Layout className="form_layout">
                            <Content className="newtextpost_content">
                                <h1>What's on your mind?</h1>
                                    <Form.Item name="content">
                                        {getFieldDecorator('content', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'content cannot be blank',
                                                },
                                                {
                                                    validator: this.validateContentInput,
                                                },
                                                // {
                                                //     required: true,
                                                //     message: 'Text posts must be less than 140 characters',
                                                // },
                                                // {
                                                //     validator: this.validateInputLength,
                                                // },
                                            ],
                                        })(
                                            <Mentions rows="5"
                                                      placeholder="Use @ to reference users here.">
                                                <Option value="sallyk">sallyk</Option>
                                                <Option value="janetw">janetw</Option>
                                                <Option value="connorf">connorf</Option>
                                            </Mentions>
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('tags', {})(
                                            <NewPostTags/>
                                        )}
                                    </Form.Item>
                            </Content>

                        </Layout>
                    </Form>
                </Modal>
            );
        }
    },
);

class NewTextPost extends React.Component {
    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({visible: true});
    };

    handleCancel = () => {
        this.setState({visible: false});
    };

    handleCreate = () => {
        const {form} = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            // Create new post information to push to all feed posts in TextPost
            const post_information = {
                actions: null,
                author: "jazzy cat",
                avatar: "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/s150x150/83885851_189723372356264_5738621742125501341_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_ohc=ZPjpLIhE5OsAX8Eb7w9&oh=0b0c2559e5786cad55d35b9cc8003714&oe=5E849C44",
                content: values.content,
                rating: values.rating,
                datetime:
                    <Tooltip
                        title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment().fromNow()}</span>
                    </Tooltip>,
                musicUrl: values.musicUrl
            };
            console.log(values)
            posts.unshift(post_information);
            form.resetFields();
            this.setState({visible: false});
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        const {state} = this.props;
        return (
            <div>
                {
                    state.isMember ?
                        (<Button className="textbutton" type="primary" onClick={this.showModal}>
                            + Text <Icon type="form"/></Button>)
                        :
                        (<Button className="textbutton" type="primary" onClick={this.showModal} disabled>
                            + Text <Icon type="form"/></Button>)
                }

                <NewTextPostCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={() => {
                        this.handleCreate();
                        state.updateFeed()
                    }}
                />
            </div>
        );
    }
}

export default NewTextPost;