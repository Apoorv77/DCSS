import './VideoItem.css'
import React from 'react';

const VideoItem = ({ video,changeVideo,rule}) => {
  return (
    <div>
    { rule === true ? <hr/> :null}
    <div onClick={() => changeVideo(video.hash, video.title)} className="video-item item" style={{width:'300px',marginRight:'18px'}}>
      {/* <img
        className="ui image"
        alt={video.snippet.description}
        src={video.snippet.thumbnails.medium.url}
      /> */}
      <video className="ui image"
        src={`https://ipfs.infura.io/ipfs/${video.hash}`}
        style={{ width: "180px" ,marginRight:"20px"}}
        />
       <small className="text-dark"><b>{video.title}</b></small>
    </div>
    </div>
  )
}

export default VideoItem