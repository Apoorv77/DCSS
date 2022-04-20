pragma solidity ^0.8.0;

contract DCSS {
  uint public numVideos = 0;
  string public name = "DCSS";
  mapping(uint => Video) private videos;
  //mapping(address => uint256[]) private purchasedVideos;
  //mapping(uint256 => address[]) private purchasedBy;
  struct Video {
    uint id;
    string hash;//IPFS Hash
    //string hashPreview;//IPFS Hash to priview of video
    string description;
    string title;
    string image;
    uint256 fee;
    address payable creator;
  }

  event VideoUploaded(
    uint id,
    string hash,
    string hashPreview,
    string description,
    string title,
    string image,
    uint256 fee,
    address payable creator
  );

  event VideoPurchased(
    uint id,
    string hash,
    uint256 fee,
    address payable creator,
    address buyer
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
    require(payable(_msgSender()) != address(0), 'Empty Address');

    // Increment video id
    numVideos = numVideos + 1;

    // Add video to the contract
    videos[numVideos] = Video(numVideos, _videoHash,_description, _title,_imageHash,_fee,payable(_msgSender()));
    // Trigger an event
    emit VideoUploaded(numVideos, _videoHash,_description, _title,_imageHash,_fee,payable(_msgSender()));
  }


  function purchaseVideo(uint _id) public payable{
      require(_id > 0 && _id <= numVideos, 'Invalid videoId');
      Video memory _Video = videos[_id];
      uint _fee = _Video.fee;
      require(msg.value == _fee,'Payment not equal to fee');

       address payable _creator = _Video.creator;
      _creator.transfer(msg.value);

      purchasedVideos[_msgSender()].push(_id);
      purchasedBy[_id].push[_msgSender()];
      emit VideoPurchased(_id, _Video.hash,_fee,_creator,_msgSender());
    }
}