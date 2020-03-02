import React from "react";
import "./styles.css";
import 'antd/dist/antd.css';
import ReactPlayer from 'react-player'

import {Comment, Icon, Tooltip, Rate, List} from 'antd';
import moment from 'moment';

// All the actions for a comment (like, dislike, reply)
//  array of post objects:
export const posts = [
    {
        actions: null,
        author: 'Sally Kang',
        avatar: 'https://scontent.fyto1-1.fna.fbcdn.net/v/t1.0-9/83337570_3515329088508799_4523582417981669376_n.jpg?_nc_cat=104&_nc_sid=85a577&_nc_ohc=6unpVlo76lgAX_kJl9K&_nc_ht=scontent.fyto1-1.fna&oh=b515f36742c04f5c702bf2426e9f0739&oe=5EF63A44',
        musicUrl: null,
        content: (
            <div>
                <p>
                    Hey guys! Welcome to the 'Jazz it Up' community. We are a group of jazz enthusiast here to talk,
                    share, and spread love for jazz music! Feel free to share your favorite tunes and
                    thoughts on music. Can't wait to get to know you through music :)
                </p>

            </div>
        ),
        datetime: (
            <Tooltip
                title={moment()
                    .format('YYYY-MM-DD HH:mm:ss')}
            >
        <span>
          {moment()
              .fromNow()}
        </span>
            </Tooltip>
        ),
    },
    {
        actions: null,
        rating: 2,
        author: 'Janet wang',
        avatar: 'https://scontent.fyto1-2.fna.fbcdn.net/v/t1.0-9/15871890_1178229362264200_2730942226162743028_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=GhhoJ0IXttIAX_Xql-z&_nc_ht=scontent.fyto1-2.fna&oh=65c60f89ab0c02ffb8961f4f69acf7ab&oe=5EFD122F',
        musicUrl: 'https://soundcloud.com/qu-nh-kh/louis-armstrong-la-vie-en-rose',
        content: (
            <div>
                <p>
                    “And I like large parties. They’re so intimate. At small parties there isn’t any privacy.”
                     -- F. Scott Fitzgerald, The Great Gatsby
                </p>
                {/* a demo hard-coded music player using the react player api, this is just temporary for phase 1*/}
                <ReactPlayer width='auto' height={120} url={'https://soundcloud.com/bryanferry/young-beautiful-lana-del-rey'}/>
            </div>

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
        musicUrl: null,
        content: (
            <div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dui dui, elementum non risus
                    volutpat, varius lacinia lectus. Vivamus ac mi pharetra, tincidunt nibh nec, posuere nisi.
                    Aliquam mollis accumsan pharetra. Vestibulum pretium ut nisl eu tincidunt. Nunc hendrerit
                    augue nec efficitur ultricies. Integer non vehicula lacus. Donec et dolor non purus fringilla
                    tristique eget quis justo. Vivamus ullamcorper congue justo a aliquam.
                </p>
            </div>
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

class TextPosts extends React.Component {
    state = {
        likes: 0,
        dislikes: 0,
        action: null,
        // rating: posts[1].rating, //just testing with the music post
    };

    like = () => {
        this.setState({
            likes: 1,
            // likes: this.state.likes += 1,
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

    // rating = () => {
    //     this.setState({
    //         likes: this.state.likes,
    //         dislikes: this.state.dislikes,
    //         action: 'rate',
    //         rating: 5,
    //     });
    // };

    populatePosts = (action_list) => {
        for (let i = 0; i < posts.length; i++) {
            // console.log(posts[i].content.props);
            posts[i].actions = action_list;
            // posts[i].content.props.children.push(
            //     <ReactPlayer width='auto' height={120} url={posts[i].musicUrl}/>
            // );
            // console.log(posts[i].musicUrl)
            // const newProp = React.cloneElement(posts[i].content.props.children,
            //     { content: <ReactPlayer width='auto' height={120} url={posts[i].musicUrl}/>})
            // console.log(newProp)

            // posts[i].content = newProp.content;

            // React.Children.map(this.props.children, child =>
            //     React.cloneElement(child, { newProp: 'value', existingProp: 'value' }));
        }

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
            // <span key="rating">
            // <Rate disabled
            //       defaultValue={this.state.rating}
            //       character={<Icon type="thunderbolt" theme="filled"/>}
            //       allowHalf/>
            //       </span>,
        ];

        this.populatePosts(all_actions);

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
                            rating={item.rating}
                        />
                    </li>
                )}
            />
        );
    }
}

export default TextPosts;