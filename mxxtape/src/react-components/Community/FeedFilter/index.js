import React from "react";
import "./styles.css";
import 'antd/dist/antd.css';

import { Select } from 'antd';
// import {posts} from "../CommunityFeed";

const { Option } = Select;

function onChange() {
    // posts.reverse();
}

function onBlur() {
    console.log('filter status: blur');
}

function onFocus() {
    console.log('filter status: focus');
}

// function mySearch(val, state) {
//     if (val === 'newest') {
//         this.props.state.posts.reverse();
//         console.log()
//     }
// }

function onSearch(val) {
    // Sorts posts for now, should be making server calls to directly manipulate the posts for phase 2
    // if (val === 'oldest') {
    //     // posts.reverse();
    // }
    // console.log('search:', val);

    return val == 'newest';

}

class FeedFilter extends React.Component {
    render() {
        const {state} = this.props;
        console.log(state)
        console.log(state.state)
        console.log(state.state.posts)
        console.log(state.state.posts.reverse())

        return (
            <Select
                showSearch
                className='filter'
                placeholder="Sort"
                optionFilterProp="children"
                onChange={() => {
                    onChange();
                    // state.updateFeed()
                }}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={ (val) => {
                    if (onSearch(val)) {
                        this.props.state.state.posts.reverse();
                    }
                }
                }
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