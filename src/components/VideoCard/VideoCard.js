import React from 'react';
import './VideoCard.css';

const VideoCard = ({image, title, channel,pubDate}) => {
    return (
        <div className='videocard'>
          <img className='videocard__image' src={image} alt='' />
          <div className="videocard__info">
            <div className="videocard__text">
              <h4>{title}</h4>
              <p>{channel}</p>
              <p>{pubDate}</p>
            </div> 
          </div>
        </div>
    )
}

export default VideoCard;