import React, { Component } from "react";
import "./App.css";

class Main extends Component {

  render() {
    return (
      <div>
      { this.props.loading
      ?<div id="loader" className="text-center mt-5"><p>Loading...</p></div>
      :<div className="container-fluid text-monospace main">
        <br></br>
        &nbsp;
        <br></br>
        <div className="row">
          <div className="col-md-10">
            <div
              className="embed-responsive embed-responsive-21by9"
              style={{ maxHeight: "720px" ,marginLeft:"3%"}}
            >
              <video
                src={`https://ipfs.infura.io/ipfs/${this.props.currentHash}`}
                 height= '630px'
                // width='600px'
                controls
              ></video>
            </div>
            <h3 className="mt-3" style={{marginLeft:"2.11%"}}>
              <b>
                <i className="video-title">{this.props.currentTitle}</i>
              </b>
            </h3>
            
          </div>
          {/* <div
            className="vide-feed col-md-2 overflow-auto text-center"
      // style={{ maxHeight: "4000px", minWidth: "175px" }} */}
            <div className="vide-feed col-md-2 overflow-auto text-center" style={{marginTop:'2%',marginLeft:'-4%'}}>            
            <h5 className="feed-title"><b>Video Feed 📺</b></h5>
            {/* <form onSubmit={(event) => {
              event.preventDefault()
              const title = this.videoTitle.value
              this.props.uploadVideo(title)
            }} >
              &nbsp;
              <input type='file' accept=".mp4, .mov, .mkv .ogg .wmv" onChange={this.props.captureFile} style={{ width: '250px' }} />
                <div className="form-group mr-sm-2">
                  <input
                    id="videoTitle"
                    type="text"
                    ref={(input) => { this.videoTitle = input }}
                    className="form-control-sm mt-3 mr-3"
                    placeholder="Title.."
                    required />
                </div>
              <button type="submit" className="btn border border-dark btn-primary btn-block btn-sm">Upload</button>
              &nbsp;
            </form> */}
            {/* <VideoList videos = {this.props.videos} changeVideo={this.props.changeVideo}/> */}
            </div>
            
        </div>
      </div>
    }
      </div>
    );
  }
}

export default Main;