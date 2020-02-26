import React from "react";
import "./styles.css";
import 'antd/dist/antd.css';

import {Button, Modal, Form, Input, Icon, Upload, Rate, Layout} from 'antd';

const {Sider, Content} = Layout;

const {TextArea} = Input;

const CollectionCreateForm = Form.create({name: 'form_in_modal'})(
    // eslint-disable-next-line
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
                            <Content className="music_display" >
                                <div><h1>Track: Untitled</h1></div>
                                <Form.Item label="">
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
                                <Form.Item
                                    label=""
                                    help="Character remaining: 140"
                                >
                                    {getFieldDecorator('post_content', {
                                        // initialValue: 'public',
                                        // getFieldValue:
                                    })(
                                        <TextArea rows={4} placeholder="What's on your mind?"/>
                                    )}
                                    {/*{getFieldDecorator('post_content', {*/}
                                    {/*    // rules: [{ required: false, message: 'Please input the title of your post!' }],*/}
                                    {/*})(<TextArea rows={4} placeholder="What's on your mind?" />)}*/}
                                    <div>
                                        <Rate className="ratings" character={<Icon type="thunderbolt" theme="filled"/>}
                                              allowHalf/>
                                        <br/>
                                    </div>
                                </Form.Item>
                                {/*<Form.Item label="Description">*/}
                                {/*    {getFieldDecorator('description', {*/}
                                {/*        rules: [{ required: true, message: 'Please input the title of your post!' }]*/}
                                {/*    })(<Input type="textarea" />)}*/}
                                {/*</Form.Item>*/}
                                {/*<Form.Item className="collection-create-form_last-form-item">*/}
                                {/*    {getFieldDecorator('modifier', {*/}
                                {/*        initialValue: 'public',*/}
                                {/*    })(*/}
                                {/*        <Radio.Group>*/}
                                {/*            <Radio value="public">Public</Radio>*/}
                                {/*            <Radio value="private">Private</Radio>*/}
                                {/*        </Radio.Group>,*/}
                                {/*    )}*/}
                                {/*</Form.Item>*/}
                            </Sider>
                        </Layout>
                    </Form>
                </Modal>
            );
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