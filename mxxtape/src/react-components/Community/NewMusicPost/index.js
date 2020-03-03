import React from "react";
import "./styles.css";
import 'antd/dist/antd.css';

// import { Button, Modal, Form, Input, Radio, Icon, Layout } from 'antd';
import {Button, Modal, Form, Icon, Upload, Rate, Layout, Mentions} from 'antd';

import MusicLinkUpload from "../MusicLinkUpload";

const {Sider, Content} = Layout;
const {Option} = Mentions;

const NewMusicCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="New Music Post"
                    okText="Post"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="horizontal">
                        <Layout className="form_layout">
                            <Content className="music_display">
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
                                    <Form.Item name="musicUrl" >
                                        {getFieldDecorator('musicUrl', {})(
                                            <MusicLinkUpload/>
                                        )}
                                    </Form.Item>
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

            console.log('Received values of form: ', values);
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
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

export default NewMusicPost;