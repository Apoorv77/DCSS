import React, { Component } from 'react';
import '../Uploader/forms.css';
import { Navigate,useNavigate} from 'react-router-dom';
import { ThreeSixty } from '@material-ui/icons';

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
      
    
    uploadAd = (title,dep_amt,cb) => {
      this.setState({ uploading: true });
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
                
                this.props.dcss.methods.uploadAdvertisement(vidResult[0].hash, title,imgResult[0].hash)
                .send({ from: this.props.account }).on('transactionHash', (hash) => {
                  this.setState({ uploading: false })
                  console.log('on the blockchain! ' + hash);
                }).then(() =>{
                    this.props.dcss.methods.deposit().send({from:this.props.account, value:dep_amt})
                 }).then(()=>{cb();})
            })

        })
      }
      redirect = () =>{
        this.props.navigate('/ads');
      }
      constructor(props) {
        super(props)
        this.state = {
          vidBuf: null,
          imgBuf:null,
          uploading:false,
          err:null
        }
        this.capturePic = this.capturePic.bind(this)
        this.captureVideo = this.captureVideo.bind(this)
        this.uploadAd = this.uploadAd.bind(this)
        this.redirect = this.redirect.bind(this);
      }
    render(){
  return (
<form className="form" 
 onSubmit={(event) => {
                  event.preventDefault();
                  const title = this.videoTitle.value;
                  const dep_amt = this.dep_amt.value;
                  this.uploadAd(title,dep_amt,this.redirect);
              
                }}>
            <div className="form-control">
                <label for="video">Ad</label>
                <input 
                   type="file"
                    accept=".mp4, .mov, .mkv .ogg .wmv"
                    onChange={this.captureVideo}
                    
                    />
            </div>
            <div className="form-control">
                <label for="image">Thumbnail</label>
                <input 
                     type="file"
                     accept = "image/*"
                     onChange={this.capturePic}
                  />   
            </div>
            <div className="form-control">
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
            <div className="form-control">
                <label for="dep_amt">Deposit Amount</label>
                <input 
                   id="dep_amt"
                   type="number"
                   step="any"
                   min="0"

                   ref={(input) => {
                      this.dep_amt = input;
                      }}
                    placeholder="(in wei)"
                    required
                    />
            </div>
            {this.state.uploading?
            <div style={{marginLeft:'25%',marginTop:'10%'}}>
              <div className="loader"></div>
              <p className='upload'>Uploading ...</p>
            </div>
            
            :<button className="btn" style={{marginTop:'30px'}} type="submit">Upload</button>}
            
            
        </form>
  );
}
}

function Uploader(props) {
  let navigate = useNavigate();
  return <Form {...props} navigate={navigate} />
}
export default Uploader; 