import React from "react";

import "./index.css";
import 'antd/dist/antd.css';
import {Avatar, Badge, Button, List, Skeleton} from "antd";
import {
    getMoreNotice,
    getUserInfo,
    getUserNotices,
    setAllNoticeRead,
    setNoticeRead
} from "../../Navigation/NotificationBadge";
import {withRouter} from "react-router-dom";

class NotificationsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: this.props.loggedIn ? this.props.loggedIn : -1,
            initLoading: true,
            loading: false,
            data: [],
            markAllAsRead: false,
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
                    initLoading: !this.state.initLoading,
                }, () => {
                    console.log("state.data:", this.state.data)
                })
            })
        }
    }

    redirect = (community) => {
        if (community) {
            const cleaned = community.replace(/\s/g, "");
            console.log("go to community", cleaned);
            this.props.history.push("/community/" +cleaned);
        } else {console.log("nowhere to redirect")}
    };

    loadMore = () => {
        console.log("load more clicked");
        this.setState({initLoading: true});
        //server call for more notices
        getMoreNotice(this.state.loggedIn, notices => {
            console.log("loadMore getMoreNotice",notices);
            this.setState({
                data: this.state.data.concat(notices),
                initLoading: false,
            }, () => {
                console.log("state.data:", this.state)
            })
        });
    };

    render() {
        const {updateGlobal} = this.props;
        const { data, initLoading, loading } = this.state;

        const loadMore = !initLoading && !loading ? (
            <div className="load-more center margin-vert12">
                <Button onClick={this.loadMore} type="primary" ghost>Load More</Button>
            </div>
        ) : null;

        return (
            <div>
                <div className="right">
                    <Button
                        type="primary"
                        className="mark-read-button margin-vert12"
                        onClick={() => {
                            setAllNoticeRead();
                            this.setState({markAllAsRead: true});
                            if (updateGlobal) {
                                // refreshing
                                updateGlobal();
                            }
                        }}
                    >
                        Mark all as read
                    </Button>
                </div>
                <List
                    className="notification-list"
                    loading={initLoading}
                    itemLayout="horizontal"
                    loadMore={loadMore}
                    dataSource={data}
                    renderItem={item => (
                        <List.Item key={item.postId}
                            actions={[
                                <Button
                                    key="list-goto"
                                    onClick={() => {
                                        this.redirect(item.community);
                                        setNoticeRead(item.postId);
                                        if (updateGlobal) {updateGlobal()}
                                    }}
                                >
                                    Go to community
                                </Button>]}
                        >
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={
                                        <Badge dot={!item.read}>
                                            <Avatar src={item.avatar} />
                                        </Badge>
                                    }
                                    title={<span>{item.author} <span className="timestamp">{item.timestamp}</span></span>}
                                    description={item.content}
                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />
        </div>
        )
    }
}
export default withRouter(NotificationsList);