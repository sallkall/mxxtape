import React from "react";
import "./styles.css";
import 'antd/dist/antd.css';

import {Button, Modal, Form, Icon, Input, Rate, Layout, Tooltip} from 'antd';
import {addPost} from "../../../actions/post";

// import {posts} from "../CommunityFeed";

const { Content} = Layout;

const NewMusicCreateForm = Form.create({ name: 'musicpost_form' })(
    class extends React.Component {
        validateLink = (rule, value, callback) => {
            const { form } = this.props;
            if (value) {
                form.validateFields(['confirm'], { force: true });
                if (!value.includes("soundcloud")) {
                    callback('Must be a soundcloud link');
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
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="New Music Post"
                    okText="Post"
                    onCancel={onCancel}
                    onOk={() => {
                        onCreate();
                    }}
                >
                    <Form layout="horizontal">
                        <Layout className="form_layout">
                            <Content className="music_display">
                                <h1>Select a track:</h1>
                                <Form.Item name="content" >
                                    {getFieldDecorator('content', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'content cannot be blank',
                                            },
                                            {
                                                validator: this.validateLink,
                                            },
                                        ],
                                    })(
                                        <Input addonBefore="https://"
                                               placeholder="soundcloud.com/your_music"
                                        />
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
                                <Form.Item>
                                    {getFieldDecorator('rating', {})(
                                        <Rate/>
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

class NewMusicPost extends React.Component {
    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            const formInfo = {
                author_id: 1,   //get from user
                avatar: "https://tinyurl.com/wy5zbp2",
                community_id: 0, // get from community
                content: null,
                tags: form.getFieldValue('tags'),
                post_type: 'music',
                rating: form.getFieldValue('rating'),
                musicUrl: form.getFieldValue('content'),
                likes: 0,
                dislikes: 0,
            };
            addPost(formInfo, this);
            // const post_information = {
            //     key: 5,     //tempo key hardcoded in for now
            //     actions: null,
            //     author: "Jellicle Cat",
            //     rating: values.rating,
            //     avatar: "https://tinyurl.com/v43wzfn",
            //     content: "",
            //     musicUrl: values.content,
            //     tags: values.tags,
            // };
            // posts.unshift(post_information);
            form.resetFields();
            this.setState({ visible: false });
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
                        (<Button className="music_button" type="primary" onClick={this.showModal}>
                            + Music <Icon type="sound" /></Button>)
                        :
                        (<Button className="music_button" type="primary" onClick={this.showModal} disabled>
                            + Music <Icon type="sound"/></Button>)
                }

                <NewMusicCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={() => {
                        this.handleCreate();
                        state.updateFeed();
                    }}
                />
            </div>
        );
    }
}

export default NewMusicPost;