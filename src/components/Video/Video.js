import React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import ReactPlayer from 'react-player';

const Video = ({hash,id,rewardAdView,isAd,account}) =>{
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
              onEnded={()=>{
                if(isAd){
                  try{
                    console.log('rewarding');
                    rewardAdView(id).send({from:account});
                  }catch(err){
                  console.log(err);
                  }
                }
              }}
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