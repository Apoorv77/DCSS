import React from 'react';
import VideoItem from './VideoItem';
const VideoList = ({ videos,changeVideo}) => {
  const renderedList = videos.map((video,key) => {
    return (
      <VideoItem
        key={key}
        video={video}
        changeVideo={changeVideo}
        rule={key !== 0}
      />
    )
  })

  return (
  <div>
    {/* <h5 className="feed-title" style={{marginLeft:'15%'}}><b>Video Feed 📺</b></h5> */}
   <div className="ui relaxed divided list">{renderedList}</div> 
    </div>
    );
}

export default VideoList;