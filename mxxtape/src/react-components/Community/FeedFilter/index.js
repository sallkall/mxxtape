import React from "react";
import "./styles.css";
import 'antd/dist/antd.css';

import { Select } from 'antd';
// import {posts} from "../CommunityFeed";

const { Option } = Select;

// function onChange() {
//     // posts.reverse();
// }

// function onBlur() {
//     console.log('filter status: blur');
// }
//
// function onFocus() {
//     console.log('filter status: focus');
// }

// function mySearch(val, state) {
//     if (val === 'newest') {
//         this.props.state.posts.reverse();
//         console.log()
//     }
// }

// let swap = false;

// function onSearch(val) {
//     if (val == 'oldest') {
//         swap = true;
//     } else {
//         swap = false;
//     }
//     // console.log(val == 'oldest')
//     // return val == 'oldest';
//
// }

class FeedFilter extends React.Component {
    render() {
        const {state} = this.props;
        // console.log(state.state.posts.reverse())
        // const posts = this.props.state.state.posts;
        // console.log(state.state.posts.reverse());

        return (
            <Select
                className='filter'
                placeholder="Sort"
                optionFilterProp="children"
                onChange={val => {
                    console.log("filter onChange", val);
                    state.setState({sort: val})
                }}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // onSearch={(val) => {
                //     console.log("filter onsearch");
                //     if (val === 'recent') {
                //         posts.reverse();
                //         state.setState({posts: posts});
                //     }
                // }}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option value="recent">Most Recent</Option>
                <Option value="oldest">Oldest to Recent</Option>
            </Select>
        );
    }
}

export default FeedFilter;