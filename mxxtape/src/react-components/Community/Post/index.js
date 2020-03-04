import React from "react";
import "./styles.css";
import 'antd/dist/antd.css';
import ReactPlayer from 'react-player'

import {Comment, Icon, Tooltip, Rate, List, Avatar} from 'antd';
import moment from 'moment';

class TextPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: 0,
            dislikes: 0,
            actions: null,
            musicURL: null,
            datetime: (
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().fromNow()}</span></Tooltip>
            ),
        }
    }

    like = () => {
        this.setState({
            likes: 1,
            dislikes: 0,
            action: 'liked',
        });
    };

    dislike = () => {
        this.setState({
            likes: 0,
            dislikes: 1,
            action: 'disliked',
        });
    };

    setActions() {
        console.log("setting action");
        this.setState({
            actions: this.state.actions
        })
    }

    render() {
        const {likes, dislikes, action} = this.state;
        const actions = [
            <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
              type="like"
              theme={action === 'liked' ? 'filled' : 'outlined'}
              onClick={this.like}
          />
        </Tooltip>
        <span style={{paddingLeft: 8, cursor: 'auto'}}>{likes}</span>
      </span>,
            <span key=' key="comment-basic-dislike"'>
        <Tooltip title="Dislike">
          <Icon
              type="dislike"
              theme={action === 'disliked' ? 'filled' : 'outlined'}
              onClick={this.dislike}
          />
        </Tooltip>
        <span style={{paddingLeft: 8, cursor: 'auto'}}>{dislikes}</span>
      </span>,
        ];

        return (
            <Comment
                actions={actions}
                author={this.props.author}
                avatar={
                    <Avatar src={this.props.avatar}/>
                }
                content={
                    <div>
                        <p>{this.props.content}</p>
                        {
                            this.props.musicUrl ? (
                                <ReactPlayer width="auto" height='100px' url={this.props.musicUrl} />)
                                : null
                        }
                        {
                            this.props.rating ? (<Rate disabled defaultValue={this.props.rating} />)
                                : null
                        }
                        <p><b>{this.props.tags}</b></p>
                    </div>
                }
                datetime={
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment().fromNow()}</span>
                    </Tooltip>
                }
            />
        );
    }

}

export default TextPost;