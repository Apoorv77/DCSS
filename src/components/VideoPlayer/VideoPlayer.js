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
    //console.log(props.dcss);
    const {id}=  useParams();
    useEffect(() =>{
        if(props.dcss){
        if(props.isAd){
        props.dcss.methods.ads(id).call()
        .then(loadedVideo =>{
            setVideo(loadedVideo);
            setisLoadingUpVideo(false);
            console.log('finished');
        })
        .catch(err =>{
            console.log(err);
            setIsError(true);
        })
       }else{
        props.dcss.methods.videos(id).call()
        .then(loadedVideo =>{
            setVideo(loadedVideo);
            setisLoadingUpVideo(false);
            console.log('finished');
        })
        .catch(err =>{
            console.log(err);
            setIsError(true);
        })
       }
    }
    },[]);

        return (
            <div className='videoplayer'>
            <div className='videoplayer__videodetails'>
                <div className='videoplayer__video'>
                    {isLoadingUpVideo ? 
                    <CircularProgress className='loading' color='secondary'/> : 
                    <Video hash={video.hash} id={video.id} rewardAdView={props.dcss.methods.rewardAdView} isAd={props.isAd} account={props.account} /> }
                </div>
                <div className='videoplayer__videoinfo'>
                    {!isLoadingUpVideo ? <VideoInfo
                                    title={video.title}
                                    description={video.description}
                                    publishedDate={video.pubDate}
                                    channelTitle={video.creator}
                                    fee={video.fee}
                                    tipVideo={props.dcss.methods.tipVideo}
                                    id = {video.id}
                                    account={props.account}
                                    isAd={props.isAd}
                                    reward={video.reward}
                                  /> : null
                    }
                </div>
            </div>
            <div className='videoplayer__suggested'>
                <Explore isLoading={props.isLoading} isError={isError} videos={props.videos} isAd={props.isAd}/>
            </div>
        </div>
        );
}

export default VideoPlayer;
