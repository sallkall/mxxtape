import React from "react";
import "./styles.css";
import 'antd/dist/antd.css';

import { Comment, Icon, Tooltip, Avatar } from 'antd';
// import moment from 'moment';

class TextPost extends React.Component {
    state = {
        likes: 0,
        dislikes: 0,
        action: null,
    };

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

    render() {
        const { likes, dislikes, action } = this.state;

        const actions = [
            <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
              type="like"
              theme={action === 'liked' ? 'filled' : 'outlined'}
              onClick={this.like}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
      </span>,
            <span key=' key="comment-basic-dislike"'>
        <Tooltip title="Dislike">
          <Icon
              type="dislike"
              theme={action === 'disliked' ? 'filled' : 'outlined'}
              onClick={this.dislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
      </span>,
            <span key="comment-basic-reply-to">Reply to</span>,
        ];

        return (
            <Comment
                style={{

                }}
                actions={actions}
                author={<a>Sally Kang</a>}
                avatar={
                    <Avatar
                        icon="smile"
                        alt="Han Solo"
                    />
                }
                content={
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam cursus at lorem quis varius.
                        In at laoreet tellus, sed eleifend magna. Etiam orci odio, ultrices et est in, volutpat
                        fringilla nisl. In velit justo, sollicitudin ut aliquet et, porta ac mi.
                    </p>
                }
                // datetime={
                //     <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                //         <span>{moment().fromNow()}</span>
                //     </Tooltip>
                // }
            />
        );
    }
}

export default TextPost;