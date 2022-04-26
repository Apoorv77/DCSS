import React, { useState, useEffect, Component } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import VideoCard from '../VideoCard/VideoCard';
import './creator.css';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';


class Card extends React.Component {
	render() {
		return(
			<div className="card" style={{backgroundColor:this.props.bgc}}>
				<h2>{this.props.title}</h2>
				{/* <div className="line" style={{backgroundColor: this.props.bgc, minHeight:'2px'}}></div> */}
				<p>{this.props.content}</p>
			</div>
		)
	}
}

class Creator extends Component{
    // async componentDidUpdate() {
        
    //   }

    async getData(){
        const loadedVideos =[];
        let revenue =0;
        console.log('running');
        if(this.props.dcss && this.props.account){
        const no = await this.props.dcss.methods.numVideosofCreator(this.props.account).call()
        for(var vidNo = 0;vidNo<no;vidNo++){
            console.log(vidNo);
            const vidId = await this.props.dcss.methods.videosOfCreator(this.props.account,vidNo).call()
            const video = await this.props.dcss.methods.videos(vidId).call()
            loadedVideos.push(video);
            revenue = revenue + video.timesTipped * video.fee;
        }
        loadedVideos.sort(function(v1, v2) {
            if (v1.timesTipped * v1.fee > v2.timesTipped * v2.fee) {
                return -1;
            }else if (v1.timesTipped * v1.fee < v2.timesTipped * v2.fee) {
                    return 1;
            }
            return v2.timesTippd-v1.timesTipped ;
        });
        console.log(loadedVideos);
        this.setState({videos:loadedVideos});
        this.setState({revenue:revenue});
        this.setState({isLoadingUpContent:false});
        console.log('finished');

    }else{
        console.log('not running');
     }
   }

   constructor(props) {
    super(props)
    this.state = {
      videos: [],
      revenue:0,
      isLoadingUpContent:true,
      error:null,
    }
  }
        
   render(){ 
    this.getData();
      return (
              <div className='creator'>
                  <div className="container">
                  <div className='card' style={{backgroundColor:'#FF6363'}}>
                  <img 
                  src={'data:image/jpeg;base64,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'}
                  style= {{marginLeft:'85px',height:'150px',width:'150px',  borderRadius:'50%'}}

                  />
                  <h1 className="text" style={{paddingTop:'5%'}}>Hello,Apoorv !</h1>
                  
                 </div>
                 <div className="card" style={{backgroundColor:'#51C2D5'}}>
				    <h2 className="text">Videos Uploaded</h2>
				    <h1 className="text" style={{paddingTop:'17%',fontSize:'3rem'}}>{this.state.isLoadingUpContent?"loading...":this.state.videos.length}</h1>
			    </div>
                
                <div className="card" style={{backgroundColor:'#4AA96C'}}>
				    <h2 className="text">Revenue</h2>
				    <h1 className="text" style={{paddingTop:'17%',fontSize:'3rem'}}>{this.state.isLoadingUpContent?"loading...":this.state.revenue * 10 ** -18} eth</h1>
			    </div>

                <div className='card' style={{backgroundColor:'#949CDF'}}>
                    <h2 className="text">{this.isLoadingUpContent?'loading...':this.props.videos.length > 4 ?'Last 5 videos':'Last '+this.props.videos.length+' videos'}</h2>
                    
                    <PieChart width={350} height={350} style={{marginTop:'-65px',marginLeft:'-15px'}}>
                        <Pie 
                        data={[{name: 'Geeksforgeeks', students: 400},{name: 'Technical scripter', students: 700},{name: 'Geek-i-knack', students: 200},{name: 'Geek-o-mania', students: 1000}]} 
                        dataKey="students" 
                        outerRadius={90} fill="orange" />
                    </PieChart>
                 </div>
			    
            </div>
                <h1 style={{marginLeft:'40px'}}>Your content:</h1>
                <MDBTable style={{marginLeft:'40px'}}borderless>
                <MDBTableHead>
                    <tr>
                        <th>#</th>
                        <th>Video</th>
                        <th>Title</th>
                        <th>Fee</th>
                        <th>Times tipped</th>
                        <th>Revenue</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                {this.state.isLoadingUpContent?null:
                 this.state.videos.map((item,id) => {
                    return (
                            <tr>
                            <td style={{width: "10%"}}>{id+1}</td>
                            <td style={{width: "25%"}}>
                            <Link key={item.id} to={`/video/${item.id}`} style={{textDecoration: 'none'}}>
                              <VideoCard 
                                image={item.image}
                                pubDate={item.pubDate}
                              />
                            </Link>
                            </td>
                            <td className='table' style={{width: "15%"}}>{item.title}</td>
                            <td className='table' style={{width: "15%"}}>{item.fee * 10 **-18 } eth</td>
                            <td className='table' style={{width: "15%"}}>{item.timesTipped}</td>
                            <td className='table' style={{width: "15%"}}>{item.fee * item.timesTipped * (10 ** -18)} eth</td>
                            </tr>
                    )
                  })
                }
                </MDBTableBody>
                </MDBTable>
                
                
              
              </div>
             
      );
    }
}     


export default Creator;