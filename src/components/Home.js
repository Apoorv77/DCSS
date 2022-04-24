import React, { Component } from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import back from './images.jpg';
import dcss from '../dcss.jpeg';
class Home extends Component{

    render(){
        return ( <div className='home' style={{paddingTop:'4%',backgroundImage: `url(${back})`,}}>
            <div className="blur">
            <h1 className="center brand" >DCSS</h1>
            <h2 className="center description" style={{paddingTop:'1%'}}>The Decentralized Platform for Content Creators.</h2>
            </div>
            <Link to ='/explore'>
            <button className="btn" style={{
                marginTop: '380px',
                marginLeft: '735px',
                backgroundColor:'red',
                width:'236px',
                height:'44px',
                color:'white',
                textAlign:'center',
                textDecoration: 'none' 
                }}>Explore!</button>
            </Link>
           
    </div>);
    }
}

export default Home;