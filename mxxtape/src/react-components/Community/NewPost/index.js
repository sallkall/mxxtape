import React from "react";
import "./styles.css";
import 'antd/dist/antd.css';

import {Button, Modal, Form, Input, Icon, Upload, Rate, Layout, Mentions, Tooltip} from 'antd';
import {posts} from "../TextPost";
import moment from "moment";

const {Option} = Mentions;
const {Sider, Content} = Layout;


const CollectionCreateForm = Form.create({name: 'form_in_modal'})(
    class extends React.Component {
        normFile = e => {
            console.log('Upload event:', e);
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
        };

        render() {
            const {visible, onCancel, onCreate, form} = this.props;
            console.log("my props:", this.props);
            const {getFieldDecorator} = form;
            return (
                <Modal
                    visible={visible}
                    title="Create Post"
                    okText="POST"
                    cancelText="CANCEL"
                    onCancel={onCancel}
                    onOk={onCreate}
                    width={750}
                >
                    <Form layout="horizontal">
                        <Layout className="form_layout">
                            <Content className="music_display">
                                <div><h1>Track: Untitled</h1></div>
                                <Form.Item label="Music Upload:">
                                    {getFieldDecorator('music', {
                                        valuePropName: 'fileList',
                                        getValueFromEvent: this.normFile,
                                    })(
                                        <Upload.Dragger name="files" action="/upload.do">
                                            <p className="ant-upload-drag-icon">
                                                <Icon type="inbox"/>
                                            </p>
                                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                                        </Upload.Dragger>,
                                    )}
                                </Form.Item>
                            </Content>
                            <Sider className="post_sider" width={400}>
                                <div id='right_side'>
                                    <Form.Item name="content">
                                        {getFieldDecorator('content', {})(
                                            <Mentions rows="5"
                                                      placeholder="What's on your mind? Use @ to ref user here.">
                                                <Option value="sallyk">sallyk</Option>
                                                <Option value="janetw">janetw</Option>
                                                <Option value="connorf">connorf</Option>
                                            </Mentions>
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('rating', {})(
                                            <Rate className="ratings"
                                                  character={<Icon type="thunderbolt" theme="filled"/>}
                                                  allowHalf/>
                                        )}
                                    </Form.Item>
                                </div>

                            </Sider>
                        </Layout>
                    </Form>
                </Modal>
            )
                ;
        }
    },
);

class NewPost extends React.Component {
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
                author: "jazzy cat", // FIXME: temporary
                avatar: "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/s150x150/83885851_189723372356264_5738621742125501341_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_ohc=ZPjpLIhE5OsAX8Eb7w9&oh=0b0c2559e5786cad55d35b9cc8003714&oe=5E849C44",
                content: values.content,
                datetime:
                    <Tooltip
                        title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment().fromNow()}</span>
                    </Tooltip>,
                // music: values.music
            };
            posts.unshift(post_information);
            form.resetFields();
            this.setState({visible: false});
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    // getCreatePostButton = () => {
    //     if(state.isMember) {
    //         return (
    //         <Button type="primary" onClick={this.showModal}>
    //             Create Post <Icon type="form"/>
    //         </Button>);
    //     }
    //     return (<Button type="primary" onClick={this.showModal} disabled>
    //         Create Post <Icon type="form"/>
    //     </Button>);
    // };

    render() {
        const {state} = this.props;
        return (
            <div>
                {
                    state.isMember ?
                        (<Button type="primary" onClick={this.showModal}>
                            Create Post <Icon type="form"/></Button>)
                            :
                        (<Button type="primary" onClick={this.showModal} disabled>
                            Create Post <Icon type="form"/></Button>)
                }

                <CollectionCreateForm
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

export default NewPost;