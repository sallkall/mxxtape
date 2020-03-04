import React from "react";
import "./styles.css";
import 'antd/dist/antd.css';

import {Button, Modal, Form, Input, Icon, Layout, Mentions, Tooltip} from 'antd';

import {posts} from "../CommunityFeed";

const {Option} = Mentions;
const {Content} = Layout;


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

        renderTags(tags) {
            tags = tags.replace(/\s/g, '');
            let tagList = tags.split(";");
            for (let i=0; i < tagList.length; i ++) {
                tagList[i] = ' #' +  tagList[i];
            }
            tagList.pop()
            this.props.form.setFieldsValue({
                tags: tagList,
            });
        }

        render() {
            const {visible, onCancel, onCreate, form} = this.props;
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
                                    <Form.Item
                                        help=' Separate tags with ";" enter to save'>
                                        {getFieldDecorator('tags', {})(
                                            <Input onPressEnter={ () => {
                                                this.renderTags(this.props.form.getFieldValue('tags'))
                                            }}
                                                   size="small"
                                                   suffix={
                                                       <Tooltip title="Tags will help us classify your post">
                                                           <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                                       </Tooltip>
                                                   }
                                            placeholder="Tags" prefix='#'/>
                                        )}
                                    </Form.Item>
                                {
                                }
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
            // should be making server calls to directly manipulate the posts for phase 2, pushed directly into the post
            // array for now...

            // Create new post information to push to all feed posts in CommunityFeed
            const post_information = {
                key: 4, //tempo key will fix later
                actions: null,
                author: "Texty cat",
                rating: null,
                avatar: "https://tinyurl.com/wy5zbp2",
                musicUrl: null,
                content: values.content,
                tags: values.tags,
            };
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