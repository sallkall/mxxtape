import React from "react";
import "./styles.css";
import 'antd/dist/antd.css';

import {Input} from 'antd';



class MusicLinkUpload extends React.Component {
    render() {
        return (
            <div>
                <h4>Temporary Soundcloud Uploader:</h4>
                <Input addonBefore="https://" addonAfter=".com"
                       placeholder="soundcloud.com/your_music"/>
            </div>
        );
    }
}

export default MusicLinkUpload;