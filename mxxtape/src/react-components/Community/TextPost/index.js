import React from "react";
import "./styles.css";
import 'antd/dist/antd.css';

import {Comment, Icon, Tooltip, Avatar, List} from 'antd';
import moment from 'moment';

// All the actions for a comment (like, dislike, reply)
//  array of post objects:
export const posts = [
    {
        actions: null,
        author: 'Sally Kang',
        avatar: 'https://scontent.fyto1-1.fna.fbcdn.net/v/t1.0-9/83337570_3515329088508799_4523582417981669376_n.jpg?_nc_cat=104&_nc_sid=85a577&_nc_ohc=6unpVlo76lgAX_kJl9K&_nc_ht=scontent.fyto1-1.fna&oh=b515f36742c04f5c702bf2426e9f0739&oe=5EF63A44',
        content: (
            <p>
                Hey guys! Welcome to the 'Jazz it Up' community. We are a group of jazz enthusiast here to talk
                , share, and spread love for jazz music! Feel free to share your favorite tunes and
                thoughts on music. Can't wait to get to know you through music :)
            </p>
        ),
        datetime: (
            <Tooltip
                title={moment()
                    // .subtract(1, 'days')
                    .format('YYYY-MM-DD HH:mm:ss')}
            >
        <span>
          {moment()
              // .subtract(1, 'days')
              .fromNow()}
        </span>
            </Tooltip>
        ),
    },
    {
        actions: null,
        author: 'Janet wang',
        avatar: 'https://scontent.fyto1-2.fna.fbcdn.net/v/t1.0-9/15871890_1178229362264200_2730942226162743028_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=GhhoJ0IXttIAX_Xql-z&_nc_ht=scontent.fyto1-2.fna&oh=65c60f89ab0c02ffb8961f4f69acf7ab&oe=5EFD122F',
        content: (
            <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully and
                efficiently.
            </p>
        ),
        datetime: (
            <Tooltip
                title={moment()
                    .subtract(2, 'days')
                    .format('YYYY-MM-DD HH:mm:ss')}
            >
        <span>
          {moment()
              .subtract(2, 'days')
              .fromNow()}
        </span>
            </Tooltip>
        ),
    },
    {
        actions: null,
        author: 'Connor Ferwerda',
        avatar: 'https://scontent-yyz1-1.xx.fbcdn.net/v/t1.0-9/17796794_111333216080695_8382139360744649163_n.jpg?_nc_cat=111&_nc_sid=85a577&_nc_ohc=Gf4HcH4bUcQAX_g6YG3&_nc_ht=scontent-yyz1-1.xx&oh=f5c0629f62f78998651c403538c80b3e&oe=5EEE926E',
        content: (
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dui dui, elementum non risus
                volutpat, varius lacinia lectus. Vivamus ac mi pharetra, tincidunt nibh nec, posuere nisi.
                Aliquam mollis accumsan pharetra. Vestibulum pretium ut nisl eu tincidunt. Nunc hendrerit
                augue nec efficitur ultricies. Integer non vehicula lacus. Donec et dolor non purus fringilla
                tristique eget quis justo. Vivamus ullamcorper congue justo a aliquam.
            </p>
        ),
        datetime: (
            <Tooltip
                title={moment()
                    .subtract(1, 'days')
                    .format('YYYY-MM-DD HH:mm:ss')}
            >
        <span>
          {moment()
              .subtract(1, 'days')
              .fromNow()}
        </span>
            </Tooltip>
        ),
    },
];

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
        const {likes, dislikes, action} = this.state;
        const all_actions = [
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
            <span key="comment-basic-reply-to">Reply to</span>,
        ];

        {
            for (let i = 0; i < posts.length; i ++) {
                console.log(posts[i]);
                posts[i].actions = all_actions;
            }
        }
        return (
            <List
                className="comment-list"
                header={`${posts.length} posts`}
                itemLayout="vertical"
                dataSource={posts}
                renderItem={item => (
                    <li className="single_post">
                        <Comment
                            actions={item.actions}
                            author={item.author}
                            avatar={item.avatar}
                            content={item.content}
                            datetime={item.datetime}
                        />
                    </li>
                )}
            />
        );
    }
}
export default TextPost;