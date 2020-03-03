import React from "react";

import "./index.css";
import 'antd/dist/antd.css';
import {Avatar, Button, List, Skeleton} from "antd";
import {getUserInfo, getUserNotices} from "../../Navigation/NotificationBadge";

class NotificationsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: this.props.loggedIn ? this.props.loggedIn : -1,
            initLoading: true,
            loading: false,
            data: []
        }
    }

    componentDidMount() {
        if (this.state.loggedIn && this.state.loggedIn !== -1) {
            getUserInfo(this.state.loggedIn, userInfo => {
                this.setState(
                {
                        userInfo: userInfo,
                    },
                    () => {
                        console.log("componentDidMount getUserInfo:", this.state.userInfo)
                    }
                );
            });
            getUserNotices(this.state.loggedIn, notices => {
                console.log("componentDidMount getUserNotices",notices);
                this.setState({
                    data: notices,
                }, () => {
                    console.log("state.data:", this.state.data)
                })
            })
        }
    }

    redirect = (notice) => {
        if (notice) {console.log("go to community", notice.replace(/\s/g, ""));}
        else {console.log("nowhere to redirect")}
    };

    render() {
        const { data } = this.state;
        // const {loggedIn} = this.state.loggedIn ? this.state.loggedIn : -1;

        return (
            <List
                className="demo-loadmore-list"
                // loading={initLoading}
                itemLayout="horizontal"
                // loadMore={loadMore}
                dataSource={data}
                renderItem={item => (
                    <List.Item key={item.postId}
                        actions={[
                            <Button
                                key="list-loadmore-goto"
                                onClick={this.redirect(item.community)}
                            >
                                Go to community
                            </Button>]}
                    >
                        {/*<Skeleton avatar title={false} loading={item.loading} active>*/}
                            <List.Item.Meta
                                avatar={
                                    <Avatar src={item.avatar} />
                                }
                                title={<a href="https://ant.design">{item.name}</a>}
                                description={item.content}
                            />
                        {/*</Skeleton>*/}
                    </List.Item>
                )}
            />
        )
    }
}
export default NotificationsList;