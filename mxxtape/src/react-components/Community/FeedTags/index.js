import React from "react";
import "./styles.css";
import 'antd/dist/antd.css';

import {List, Tag} from 'antd';

const data = [
    {
        title: '#80s',
        color: 'magenta',
    },
    {
        title: '#pure_vocals',
        color: 'geekblue',
    },
    {
        title: '#pianobar',
        color: 'cyan',
    },
    {
        title: '#cocktail_hour',
        color: 'blue',
    },
    {
        title: '#hard_bop',
        color: 'purple',
    },
    {
        title: '#longggggggtag',
        color: 'orange',
    },
];

class FeedTags extends React.Component {
    render() {
        return (
            <div>
                <h3 style={{marginBottom: 16}}>Popular Tags: </h3>
                <List
                    className="tags_container"
                    itemLayout='vertical'
                    grid={{ gutter:100, column: 3 }}
                    dataSource={data}
                    renderItem={item => (
                        <List.Item className='list_items'>
                            <Tag className="tag" color={item.color}>{item.title}</Tag>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default FeedTags;
