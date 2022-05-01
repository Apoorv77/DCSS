import React from 'react';

// import SideBarRow from '../SideBarRow/SideBarRow';

import './VideoInfo.css';

const VideoInfo = ({title, description, pubDate, channelTitle ,fee,tipVideo,id,account,isAd,reward}) => {
    return (
        <div className='videoinfo'>
            <div className='videoinfo__headline'>
                <h1 style={{display:'inline'}}><b>{title}</b></h1>
                {isAd?null
                :<button 
                style={{position:'absolute',right:'28%',width:'8%'}} 
                onClick={(event) => {
                    console.log('Tipping the creator' ,fee);
                    //this.setState({ loading: true })
                    tipVideo(id).send({ from: account, value: fee  })
                    .on('transactionHash', (hash) => {
                            //this.setState({ loading: false })
                    })
                  }}
                className='btn btn-lg'>Tip {fee * 10 ** -18} eth</button>
                }
            </div>
            <div className='videoinfo__stats'>
                <p>Apr 21 , 2022 | {isAd?"Advertiser":"Creator"}: {channelTitle} </p>
            </div>
            <hr />
            {/* <div className="videoinfo__channel">
                    <div className='videoinfo__channelinfo'>
                        <h3 className='videoinfo__channeltitle'></h3>
                    </div>
            </div> */}
            {isAd ?
            <h3>Thank you for viewing this advertisement,{reward} will be deposited in your account !</h3>:
            <div>
            <p style={{ marginTop:'-2%' }}>Description</p>
            <div className='videoinfo__channeldesc'>
                <p style={{color:'#303030'}}>{description}</p>
            </div>
            </div>
            }
        </div>
    )
}

export default VideoInfo;