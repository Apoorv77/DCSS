import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Web3 from 'web3';
import DCSS from '../abis/DCSS.json';
import Navbar from './Navbar/Navbar';
import Main from './Main';
import Home from './Home';
import User from './User';
import Creator from './Creator';
import './App.css';
import Uploader from './Uploader/Uploader';


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
      loading: true,
      currentHash: null,
      currentTitle: null
    }
    this.changeVideo = this.changeVideo.bind(this)
  }

  render() {
    return (
            <Router>
            <Navbar account={this.state.account} />
            <Routes>
                <Route exact path='/' element={
                  <Home />
                } />
                <Route exact path='/explore' element={
                <Main 
                loading={this.state.loading}
                videos={this.state.videos}
                changeVideo={this.changeVideo}
                currentHash={this.state.currentHash}
                currentTitle={this.state.currentTitle}
              />
              } />

              <Route exact path='/user'element={
                <User account={this.state.account} videos={this.state.videos}/>
              }/>


              <Route exact path='/creator/upload' element={
                <Uploader 
                account={this.state.account}
                dcss={this.state.dcss}
                />
              } />

              <Route exact path = '/creator' element={
              <Creator account = {this.state.account} dcss = {this.state.dcss} />
              }/>

            </Routes>
            </Router>
    );
  }
}

export default App;