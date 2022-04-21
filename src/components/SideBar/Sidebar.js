
import React from 'react';
import SideBarRow from '../SidebarRow/SideBarRow';
import './SideBar.css';

import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import AccountBoxIcon from'@material-ui/icons/AccountBox';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';


const SideBar = () => {
    return (
        <div className='sidebar'>
            <SideBarRow Icon={SubscriptionsIcon} title='Premium Content' />
            <SideBarRow Icon={VideoLibraryIcon} title='Library' />
            <hr />
            <SideBarRow Icon={OndemandVideoIcon} title='Your videos' />
            <SideBarRow Icon={AccountBoxIcon} title='Your account' />
        </div>
    )
}

export default SideBar;