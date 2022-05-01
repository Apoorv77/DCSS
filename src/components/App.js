import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Web3 from 'web3';
import DCSS from '../abis/DCSS.json';

import AdUploader from "./AdUploader/AdUploader";
import Navbar from './Navbar/Navbar';
import Main from './Main';
import Home from './Home/Home';
import User from './User/User';
import Creator from './Creator/Creator';
import Account from "./Account/Account";
import './App.css';
import Uploader from './Uploader/Uploader';

import SideBar from './SideBar/Sidebar';
import SearchPage from './SearchPage/SearchPage';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import Explore from './Explore/Explore';
class App extends Component {

  async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = DCSS.networks[networkId]
    if(networkData) {
      const dcss = new web3.eth.Contract(DCSS.abi, networkData.address)
      this.setState({ dcss })
      const numVideos = await dcss.methods.numVideos().call()
      this.setState({ numVideos })
      // Load videos, sort by newest
      for (var i=numVideos; i>=1; i--) {
        const video = await dcss.methods.videos(i).call()
        this.setState({
          videos: [...this.state.videos, video]
        })
      }

      const numAds = await dcss.methods.numAds().call()
      this.setState({numAds});
      for(var i=numAds;i>=1 ;i--){
        const ad = await dcss.methods.ads(i).call()
        this.setState({
          ads:[...this.state.ads,ad]
        })
      }

      //Set latest video with title to view as default 
      const latest = await dcss.methods.videos(numVideos).call()
      this.setState({
        currentHash: latest.hash,
        currentTitle: latest.title
      })
      this.setState({ loading: false})
    } else {
      window.alert('DCSS contract not deployed to detected network.')
    }
  }


  

  changeVideo = (hash, title) => {
    this.setState({'currentHash': hash});
    this.setState({'currentTitle': title});
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      dcss: null,
      videos: [],
      ads:[],
      numAds:0,
      numVideos:0,
      loading: true,
      error:false,
      currentHash: null,
      currentTitle: null
    }
    this.changeVideo = this.changeVideo.bind(this)
  }

  render() {
    return (
            // <Router>
            // <Navbar account={this.state.account} />
            // <Routes>
            //     <Route exact path='/' element={
            //       <Home />
            //     } />
            //     <Route exact path='/explore' element={
            //     <Main 
            //     loading={this.state.loading}
            //     videos={this.state.videos}
            //     changeVideo={this.changeVideo}
            //     currentHash={this.state.currentHash}
            //     currentTitle={this.state.currentTitle}
            //   />
            //   } />
            // </Routes>
            // </Router>
   <div className="App">
     <React.StrictMode>
      <BrowserRouter>
        <Navbar account={this.state.account} />
        <Routes>
          <Route exact path='/video/:id' element={<div className="app__mainpage">
              <VideoPlayer isLoading={this.state.loading} videos={this.state.videos} dcss={this.state.dcss} 
              isAd={false}
              account={this.state.account}/>
            </div>} />
            <Route exact path='/ad/:id' element={<div className="app__mainpage">
              <VideoPlayer isLoading={this.state.loading} videos={this.state.ads} dcss={this.state.dcss}
              isAd={true}
              account={this.state.account}/>
            </div>} />
          
          <Route exact path='/search/:searchQuery' element={
            <div className="app__mainpage">
              <SearchPage />
            </div>
          } />
          
          <Route exact path='/' element={
                // <div className="app__mainpage">
                //   <SideBar />
                  <Home />
                //  </div>
                 
          }/>
          <Route exact path='/explore' element={
                <div className="app__mainpage">
                  <SideBar />
                  <Explore isError = {this.state.error} isLoading = {this.state.loading} videos = {this.state.videos} isAd={false}  />
                 </div>
          }/>

    <Route exact path='/ads' element={
                <div className="app__mainpage">
                  <Explore 
                  isError = {this.state.error}
                   isLoading = {this.state.loading} 
                   videos = {this.state.ads}
                   isAd={true}
                   />
                 </div>
          }/>
          
          <Route exact path='/uploadAd' element={
                <AdUploader
                account={this.state.account}
                dcss={this.state.dcss}
                />
              } />
          
          <Route exact path='/user' element={
                <User
                account={this.state.account}
                dcss={this.state.dcss}
                />
              } />
          
          <Route exact path='/account' element={
                <Account
                />
              } />
           
          <Route exact path='/creator/upload' element={
                <Uploader 
                account={this.state.account}
                dcss={this.state.dcss}
                />
              } />
          <Route exact path = '/creator' element={
              <Creator account = {this.state.account} dcss = {this.state.dcss} videos={this.state.videos}/>
              }/>
          
        </Routes>
      </BrowserRouter>
      </React.StrictMode>

      
    </div>
    );
  }
}

export default App;