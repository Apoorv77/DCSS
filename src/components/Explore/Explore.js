import React, {useEffect, useState} from 'react';
import VideoCard from '../VideoCard/VideoCard';
import './Explore.css';

import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';


const Explore = ({isError,isLoading,videos}) => {

    if(isError) {
      console.log(isError);
      return <Alert severity="error" className='loading'>No Results found!</Alert>
    }
    return (
        
        <div className='recommendedvideos' style={{paddingTop:'4%'}}>
            { isLoading ? <CircularProgress className='loading' color='secondary' /> :
               <div className="recommendedvideos__videos">
                {
                  videos.map(item => {
                    return (
                            <Link key={item.id} to={`/video/${item.id}`}>
                              <VideoCard 
                                title={item.title}
                                image={item.imageHash}
                                pubDate={item.pubDate}
                                channel={item.creator}
                              />
                            </Link>
                    )
                  })
                }
            </div> }
          
        </div>
    )
}

export default Explore;