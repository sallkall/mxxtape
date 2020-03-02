import React from "react";
import "./styles.css";
import 'antd/dist/antd.css';

import { Select } from 'antd';

const { Option } = Select;

function onChange(value) {
    console.log(`selected ${value}`);
}

function onBlur() {
    console.log('filter status: blur');
}

function onFocus() {
    console.log('filter status: focus');
}

function onSearch(val) {
    console.log('search:', val);
}

class FeedFilter extends React.Component {
    render() {
        return (
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Filter"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option value="music">Music</Option>
                <Option value="text">Text Posts</Option>
                <Option value="recent">Most Recent</Option>
                <Option value="oldest">Oldest to Recent</Option>
            </Select>
        );
    }
}

export default FeedFilter;