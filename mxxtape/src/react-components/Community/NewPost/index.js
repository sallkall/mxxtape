import React from "react";
import "./styles.css";
import 'antd/dist/antd.css';

import {Button, Modal, Form, Input, Icon, Upload, Rate, Layout, Mentions} from 'antd';

const {Option} = Mentions;
const {Sider, Content} = Layout;

// const {TextArea} = Input;

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
                                    {getFieldDecorator('dragger', {
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
                                <Form.Item
                                    help="Character remaining: 140"
                                    name="textbox"
                                >
                                        {getFieldDecorator('new_message', {})(
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
                                        <Rate className="ratings" character={<Icon type="thunderbolt" theme="filled"/>}
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

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({visible: false});
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Create Post <Icon type="form"/>
                </Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

export default NewPost;