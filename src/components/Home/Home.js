import React, { Component } from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Footer from "../footer/Footer";
import './Home.css';
import back from '../test.jpg';
class Home extends Component{

    render(){
        return ( <div className='home' style={{paddingTop:'4%',backgroundImage: `url(${back})`,width: '2020px','marginBottom':'-00px'}}>
            <h1 className="center brand" >DCSS</h1>
            <h2 className="center description" style={{paddingTop:'1%'}}>The Decentralized Platform for Content Creators.</h2>
            <Link to ='/explore' style={{textDecoration:'none'}}>
            <button className="btn" style={{
                marginTop: '380px',
                marginLeft: '735px',
                backgroundColor:'red',
                width:'236px',
                height:'44px',
                color:'white',
                textAlign:'center',
                }}>Explore!</button>
            </Link>
           <Footer/>
    </div>);
    }
}

export default Home;