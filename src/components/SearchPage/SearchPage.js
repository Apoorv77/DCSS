import React, {useState, useEffect} from 'react';
import "./SearchPage.css";
import TuneIcon from '@material-ui/icons/Tune';
import VideoRow from './../VideoRow/VideoRow';
import {useParams} from 'react-router';

import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

const SearchPage = (isError,isLoading,videos,account) => {
    if (isError) {
      return <Alert severity="error" className='loading'>No Results found!</Alert>
    }
    return (
        <div className="searchpage" style={{paddingTop:'4%'}}>
            <div className="searchpage__filter">
                <TuneIcon />
                <h2>Filter</h2>
            </div>
            { isLoading ? <CircularProgress className='loading' color='secondary' /> : null }
            <hr />
            { !isLoading ? <p>{this.props.account}</p>: null
            }
            <hr />
            {
              videos.map(item => {
                return (
                        <Link key={item.id} to={`/video/${item.hash}`}>
                          <VideoRow
                            title={item.title}
                            image={item.imageHash}
                            pubDate={item.publishDate}
                            description={item.description}
                          />
                        </Link>
                )
              })
              
            }   
            
        </div>
    )
}

export default SearchPage;