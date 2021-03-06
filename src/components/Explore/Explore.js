import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import VideoCard from '../VideoCard/VideoCard';
import './Explore.css';

import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';


const Explore = ({isError,isLoading,videos,isAd}) => {
  const path = useLocation().pathname;
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
                            <Link key={item.id} to={isAd?`/ad/${item.id}`:`/video/${item.id}`} style={{textDecoration: 'none'}}>
                              <VideoCard 
                                title={item.title}
                                image={item.image}
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