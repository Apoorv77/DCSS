import React from 'react';
import ReactPlayer from 'react-player';

const Video = ({hash}) =>{
    return (
            // <div
            //   className="embed-responsive embed-responsive-21by9"
            //   style={{ maxHeight: "720px" ,marginLeft:"3%"}}
            // >
            //   <video
            //     src={`https://ipfs.infura.io/ipfs/${hash}`}
            //      height= '630px'
            //     // width='600px'
            //     controls
            //   ></video>
            // </div>
            <div paddingLeft ='-20 px'>
              <ReactPlayer 
                // Disable download button
              config={{ file: { attributes: { controlsList: 'nodownload' } } }}

              // Disable right click
              onContextMenu={e => e.preventDefault()}

              controls url = {`https://ipfs.infura.io/ipfs/${hash}`}
              width='1080x'
              height='720px'
              />
            </div>
    );
}

export default Video;