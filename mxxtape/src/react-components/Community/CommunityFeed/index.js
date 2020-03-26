import React from "react";
import "./styles.css";
import 'antd/dist/antd.css';

import TextPost from "../Post";

 // THIS IS THE TESTING CODE: A sample post object array, this stores all of community's posts made by users
// Will get this data from serve using JSON format in phase 2
export let posts = [
    {
        key: 0,
        actions: null,
        author: 'Sally Kang',
        rating: null,
        avatar: 'https://scontent.fyto1-1.fna.fbcdn.net/v/t1.0-9/83337570_3515329088508799_4523582417981669376_n.jpg?_nc_cat=104&_nc_sid=85a577&_nc_ohc=6unpVlo76lgAX_kJl9K&_nc_ht=scontent.fyto1-1.fna&oh=b515f36742c04f5c702bf2426e9f0739&oe=5EF63A44',
        musicUrl: null,
        content: 'Hey guys! Welcome to the Jazz it Up community. We are a group of jazz enthusiast here to talk, ' +
            'share, and spread love for jazz music! Feel free to share your favorite tunes and' +
            'thoughts on music. Can\'t wait to get to know you through music :)'
        ,
        tags: '#welcome',
    },
    {
        key: 1,
        actions: null,
        author: 'Janet wang',
        rating: 4,
        avatar: 'https://scontent.fyto1-2.fna.fbcdn.net/v/t1.0-9/15871890_1178229362264200_2730942226162743028_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=GhhoJ0IXttIAX_Xql-z&_nc_ht=scontent.fyto1-2.fna&oh=65c60f89ab0c02ffb8961f4f69acf7ab&oe=5EFD122F',
        musicUrl: 'https://soundcloud.com/qu-nh-kh/louis-armstrong-la-vie-en-rose',
        content: '"And I like large parties. They’re so intimate. At small parties there isn’t any privacy. "' +
            ' -- F. Scott Fitzgerald, The Great Gatsby',
        tags: '#music',
    },
    {
        key: 2,
        actions: null,
        author: 'Connor Ferwerda',
        rating: null,
        avatar: 'https://scontent-yyz1-1.xx.fbcdn.net/v/t1.0-9/17796794_111333216080695_8382139360744649163_n.jpg?_nc_cat=111&_nc_sid=85a577&_nc_ohc=Gf4HcH4bUcQAX_g6YG3&_nc_ht=scontent-yyz1-1.xx&oh=f5c0629f62f78998651c403538c80b3e&oe=5EEE926E',
        musicUrl: null,
        content: 'Hello hello!!! ',
        tags: null,
    },
];

class CommunityFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {posts: posts}
    }


    render() {
        return (
            <div>
                {
                    this.state.posts.map(item => (
                        <TextPost className="single_post" musicUrl={item.musicUrl} key={item.key} rating={item.rating} author={item.author}
                                  avatar={item.avatar} content={item.content} tags={item.tags}/>
                    ))
                }
            </div>
        );
    }
}

export default CommunityFeed;