pragma solidity ^0.5.0;

contract DCSS {
  uint public numVideos = 0;
  string public name = "DCSS";
  mapping(uint => Video) public videos;
  mapping (address => uint[]) public videosOfCreator;
  mapping (address => uint)public numVideosofCreator;
  struct Video {
    uint id;
    string hash;//IPFS Hash
    string description;
    string title;
    string image;
    uint256 fee;
    uint256 timesTipped;
    address payable creator;
  }

  event VideoUploaded(
    uint id,
    string hash,
    string description,
    string title,
    string image,
    uint256 fee,
    address payable creator
  );

  event VideoTipped(
    uint id,
    string hash,
    uint256 fee,
    address payable creator
  );


  constructor() public {
  }

  function uploadVideo(string memory _videoHash, string memory _title,string memory _description,string memory _imageHash,uint256 _fee) public {
    // Make sure the video hash exists
    require(bytes(_videoHash).length > 0,'Empty videoHash');
    // Make sure video title exists
    require(bytes(_title).length > 0,'Empty Title');
    //Make sure description exists 
    require(bytes(_description).length > 0,'Empty Description');
    // Make sure uploader address exists
    require(msg.sender != address(0), 'Empty Address');

    // Increment video id
    numVideos = numVideos + 1;

    // Add video to the contract
    videos[numVideos] = Video(numVideos, _videoHash,_description, _title,_imageHash,_fee,0,(msg.sender));
    videosOfCreator[msg.sender].push(numVideos);
    numVideosofCreator[msg.sender] = numVideosofCreator[msg.sender] + 1;
    // Trigger an event
    emit VideoUploaded(numVideos, _videoHash,_description, _title,_imageHash,_fee,(msg.sender));
  }


  function tipVideo(uint _id) public payable{

      require(_id > 0 && _id <= numVideos, 'Invalid videoId');
      Video memory _Video = videos[_id];
      uint _fee = _Video.fee;
      require(msg.value == _fee,'Payment not equal to fee');

       address payable _creator = _Video.creator;
      _creator.transfer(msg.value);
      videos[_id].timesTipped = videos[_id].timesTipped + 1;
      emit VideoTipped(_id,_Video.hash,_fee,_creator);
  }

  function getCreatorData(address _address) public view returns(uint [] memory){
    //Make sure address is valid
    require(_address != address(0),'Empty Address');

    return videosOfCreator[_address];
  }
}