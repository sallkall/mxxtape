// import React from "react";
//
// import "./styles.css";
// import 'antd/dist/antd.css';
// import Nav from "../Navigation";
//
// import {Layout, Menu, Breadcrumb, Icon, Avatar, Upload, message, Button} from 'antd';
//
// const {SubMenu} = Menu;
// const {Header, Content, Footer, Sider} = Layout;
//
//
// const props = {
//     name: 'file',
//     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//     headers: {
//         authorization: 'authorization-text',
//     },
//     onChange(info) {
//         if (info.file.status !== 'uploading') {
//             console.log(info.file, info.fileList);
//         }
//         if (info.file.status === 'done') {
//             message.success(`${info.file.name} file uploaded successfully`);
//         } else if (info.file.status === 'error') {
//             message.error(`${info.file.name} file upload failed.`);
//         }
//     },
// };
//
//
// class Community extends React.Component {
//     // constructor(props) {
//     //     super(props);
//     //     console.log(props);
//     // }
//
//     render() {
//         return (
//             <Layout>
//                 <Nav/>
//                 <Content style={{padding: '0 50px'}}>
//                     <div className="header"
//                          style={{
//                              background: 'AliceBlue',
//                              height: '200px',
//                              position: 'relative',
//                          }}>
//                         <div style={{
//                             marginBottom: '30px',
//                         }}><Avatar
//                             icon="meh"
//                             size={100}
//                             style={{
//                                 color: '#fff',
//                                 backgroundColor: '#90c9e8',
//                                 position: 'absolute',
//                                 bottom: '0',
//                                 marginBottom: '30px',
//                                 marginLeft: '80px',
//                             }}>
//                         </Avatar>
//                             <h1 style={{
//                                 position: 'absolute',
//                                 bottom: '0',
//                                 marginBottom: '30px',
//                                 marginLeft: '200px',
//                                 width: '10px'
//                             }}
//                             >Study Music</h1>
//                         </div>
//                         <Upload {...props}>
//                             <Button
//                                 style={{
//                                     position: 'absolute',
//                                     bottom: '0',
//                                     right: '0',
//                                     marginBottom: '30px',
//                                     marginRight: '30px',
//                                 }}
//                             >
//                                 <Icon type="upload"/> Upload Header
//                             </Button>
//                         </Upload>,
//                     </div>
//                 </Content>
//                 <Content style={{padding: '0 50px'}}>
//                     <Breadcrumb style={{margin: '16px 0'}}>
//                         <Breadcrumb.Item>Community</Breadcrumb.Item>
//                         <Breadcrumb.Item>Chopin</Breadcrumb.Item>
//                     </Breadcrumb>
//                     <Layout style={{padding: '24px 0', background: '#fff'}}>
//                         <Content style={{padding: '0 24px', minHeight: 280}}>Content</Content>
//                         <Sider width={200} style={{background: '#fff'}}>
//                             <Menu
//                                 mode="inline"
//                                 defaultSelectedKeys={['1']}
//                                 defaultOpenKeys={['sub1']}
//                                 style={{height: '100%'}}
//                             >
//                                 <SubMenu
//                                     key="sub1"
//                                     title={
//                                         <span>
//                   <Icon type="user"/>
//                   subnav 1
//                 </span>
//                                     }
//                                 >
//                                     <Menu.Item key="1">option1</Menu.Item>
//                                     <Menu.Item key="2">option2</Menu.Item>
//                                     <Menu.Item key="3">option3</Menu.Item>
//                                     <Menu.Item key="4">option4</Menu.Item>
//                                 </SubMenu>
//                             </Menu>
//                         </Sider>
//                     </Layout>
//                 </Content>
//                 <Footer style={{textAlign: 'center'}}>mxxtape ©2020 </Footer>
//             </Layout>
//         )
//     }
// }
//
// export default Community;