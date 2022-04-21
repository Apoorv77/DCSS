import React, { useState, useEffect, Component } from 'react';
import { useParams } from 'react-router-dom';

import Explore from '../Explore/Explore';
import Video from '../Video/Video'
import './VideoPlayer.css';
import VideoInfo from '../VideoInfo/VideoInfo';
import CircularProgress from '@material-ui/core/CircularProgress';



//Add ChangeVideo function
function VideoPlayer(props) {
    const [video,setVideo] = useState(null);
    const [isLoadingUpVideo,setisLoadingUpVideo] = useState(true);
    const [isError, setIsError] = useState(false);
    console.log(props.dcss);
    const {id}=  useParams();
    useEffect(() =>{
        if(props.dcss){
        props.dcss.methods.videos(id).call()
        .then(loadedVideo =>{
            setVideo(loadedVideo);
            setisLoadingUpVideo(false);
        })
        .catch(err =>{
            console.log(err);
            setIsError(true);
        })
    }
    });

        return (
            <div className='videoplayer'>
            <div className='videoplayer__videodetails'>
                <div className='videoplayer__video'>
                    {isLoadingUpVideo ? 
                    <CircularProgress className='loading' color='secondary'/> : 
                    <Video hash={video.hash} /> }
                </div>
                <div className='videoplayer__videoinfo'>
                    {!isLoadingUpVideo ? <VideoInfo
                                    title={video.title}
                                    description={video.description}
                                    publishedDate={video.pubDate}
                                    channelTitle={video.creator}
                                  /> : null
                    }
                </div>
            </div>
            <div className='videoplayer__suggested'>
                <Explore isLoading={props.isLoading} isError={isError} videos={props.videos}/>
            </div>
        </div>
        );
}

export default VideoPlayer;
