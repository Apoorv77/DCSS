import React from 'react';

// import SideBarRow from '../SideBarRow/SideBarRow';

import './VideoInfo.css';
import { Avatar, Button } from '@material-ui/core';

const VideoInfo = ({title, description, pubDate, channelTitle}) => {
    return (
        <div className='videoinfo'>
            <div className='videoinfo__headline'>
                <h1>{title}</h1>
            </div>
            <div className='videoinfo__stats'>
                <p>{pubDate}</p>
            </div>
            <hr />
            <div className="videoinfo__channel">
                    <div className='videoinfo__channelinfo'>
                        <h3 className='videoinfo__channeltitle'>{channelTitle}</h3>
                    </div>
            </div>
            <div className='videoinfo__channeldesc'>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default VideoInfo;