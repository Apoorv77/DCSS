import React, { Component } from 'react';
import "./form.css";
import "./util.css";


//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class Form extends Component {
    captureFile = event => {
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()
         reader.readAsArrayBuffer(file)
    
        reader.onloadend = () => {
            this.setState({ buffer: Buffer(reader.result)},()=>{
                console.log('buffer', this.state.buffer)
            })
        }
      }
    
    uploadVideo = title => {
        console.log("Submitting file to IPFS...")
        //adding file to the IPFS
        ipfs.add(this.state.buffer, (error, result) => {
          console.log('IPFS result', result)
          if(error) {
            console.error(error)
            return
          }
          console.log(this.props.account+' '+title+' '+result[0].hash);
          this.setState({ loading: true })
          this.props.dcss.methods.uploadVideo(result[0].hash, title).send({ from: this.props.account }).on('transactionHash', (hash) => {
            this.setState({ loading: false })
            console.log('on the blockchain!' + hash)
          })
        })
      }

      constructor(props) {
        super(props)
        this.state = {
          buffer: null,
          loading:true
        }
        this.captureFile = this.captureFile.bind(this)
        this.uploadVideo = this.uploadVideo.bind(this)
      }
    render(){
  return (
     <div className="container-contact100" style={{paddingTop:'4%'}}>
        <div className="wrap-contact100">
            <form className="contact100-form validate-form"
            onSubmit={(event) => {
                event.preventDefault();
                const title = this.videoTitle.value;
                this.uploadVideo(title);
              }}>
                <span className="contact100-form-title">
                {this.props.account}, upload a new video !
                </span>

            <div className="wrap-input100 validate-input" >
                <span className="label-input100">Add Video</span>
                <input className="input100" 
               type="file"
               accept=".mp4, .mov, .mkv .ogg .wmv"
               onChange={this.captureFile}
               style={{ width: "250px" }}
                 />
                <span className="focus-input100"></span>
            </div>

            <div className="wrap-input100 validate-input">
                <span className="label-input100">Add Thumbnail</span>
                <input className="input100" 
                 type="file"
                 accept = "image/*"
                 onChange={this.capturePic}
                 style={{width:"250px"}}
                />
                <span className="focus-input100"></span>
            </div>

            <div className="wrap-input100 validate-input">
                <span className="label-input100">Title</span>
                <input className="input100" 
                  id="videoTitle"
                  type="text"
                  ref={(input) => {
                    this.videoTitle = input;
                  }}
                  placeholder="enter title here"
                  required
                />
                <span className="focus-input100"></span>
            </div>

            
            <div className="wrap-input100 validate-input">
                <span className="label-input100">Description</span>
                <textarea className="input100" 
                   id = "videoDesc"
                   rows = "4"
                   cols="50"
                   ref = {(input)=>{
                       this.videoDesc = input;
                   }}
                   required
                />
                <span className="focus-input100"></span>
            </div>
            <div className="container-contact100-form-btn">
					<div className="wrap-contact100-form-btn">
						<div className="contact100-form-bgbtn"></div>
						<button className="contact100-form-btn" type="submit">
							<span>
								Submit
								<i className="fa fa-long-arrow-right m-l-7" aria-hidden="true"></i>
							</span>
						</button>
					</div>
				</div>
        </form>
    </div>
</div>
  );
}
}

export default Form; 