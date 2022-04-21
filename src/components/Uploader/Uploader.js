import React, { Component } from 'react';
import "./forms.css";


//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class Form extends Component {
    captureVideo = event => {
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
    
        reader.onloadend = () => {
            this.setState({ vidBuf: Buffer(reader.result)},()=>{
                console.log('buffer', this.state.vidBuf)
            })
        }
      }
      capturePic = event => {
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
    
        reader.onloadend = () => {
            this.setState({imgBuf: Buffer(reader.result)},()=>{
                console.log('buffer', this.state.imgBuf)
            })
        }
      }
      
    
    uploadVideo = (title,description,fee) => {
        console.log("Submitting file to IPFS...")
        //adding file to the IPFS
        ipfs.add(this.state.vidBuf, (error, vidResult) => {
          if(error) {
            console.error(error);
            this.setState({err:error});
            return;
            }  
          console.log('IPFS result', vidResult)

            ipfs.add(this.state.imgBuf,(err,imgResult)=>{
              if(err) {
                console.error(err);
                this.setState({err:err});
                return;
                }
                console.log(imgResult);
                this.setState({ loading: true });
                this.props.dcss.methods.uploadVideo(vidResult[0].hash, title,description,imgResult[0].hash,fee)
                .send({ from: this.props.account }).on('transactionHash', (hash) => {
                  this.setState({ loading: false })
                  console.log('on the blockchain! ' + hash);
                })
            })
        })
      }

      constructor(props) {
        super(props)
        this.state = {
          vidBuf: null,
          imgBuf:null,
          loading:true,
          err:null
        }
        this.capturePic = this.capturePic.bind(this)
        this.captureVideo = this.captureVideo.bind(this)
        this.uploadVideo = this.uploadVideo.bind(this)
      }
    render(){
  return (
<form class="form" 
 onSubmit={(event) => {
                  event.preventDefault();
                  const title = this.videoTitle.value;
                  const description = this.videoDesc.value;
                  const fee = this.fee.value;
                  this.uploadVideo(title,description,fee);
                }}>
            <div class="form-control">
                <label for="video">Video</label>
                <input 
                   type="file"
                    accept=".mp4, .mov, .mkv .ogg .wmv"
                    onChange={this.captureVideo}
                    
                    />
            </div>
            <div class="form-control">
                <label for="image">Thumbnail</label>
                <input 
                     type="file"
                     accept = "image/*"
                     onChange={this.capturePic}
                  />   
            </div>
            <div class="form-control">
                <label for="title">Title</label>
                <input 
                   id="videoTitle"
                   type="text"
                   ref={(input) => {
                      this.videoTitle = input;
                      }}
                    placeholder="title..."
                    required
                    />
            </div>
            <div class="form-control">
                <label for="description">Description</label>
                <textarea 
                    id = "videoDesc"
                    rows = "4"
                    cols="50"
                    ref = {(input)=>{
                        this.videoDesc = input;
                        }}
                    required></textarea>
            </div>
            <div class="form-control">
                <label for="title">Fee</label>
                <input 
                   id="fee"
                   type="number"
                   step="any"
                   min="0"

                   ref={(input) => {
                      this.fee = input;
                      }}
                    placeholder="(in gwei)"
                    required
                    />
            </div>
            <button className="btn" type="submit">Upload</button>
            
        </form>
  );
}
}

export default Form; 