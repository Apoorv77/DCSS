pragma solidity ^0.5.0;

contract Bank {
    uint8 private clientCount;
    struct account{
        uint balance;
        bool isValid;
    }
    mapping (address => account) internal accounts;
    address public owner;

    event DepositMade(address  accountAddress, uint amount);
    event WithdrawalMade(address accountAddress, uint amount);
    event PaymentMade(address senderAddress,address receiverAddress,uint amount);

    constructor() public payable {
        owner = msg.sender;
        clientCount = 0;
        accounts[msg.sender].isValid=true;
        accounts[msg.sender].balance=0;
    }

    function createAccount(address _client) internal {
        accounts[_client].isValid=true;
        accounts[_client].balance=0;
    }

    function deposit() public payable returns (uint) {
        if(accounts[msg.sender].isValid == false){
            //Setting up the account
            createAccount(msg.sender);
            clientCount++;
        }
        accounts[msg.sender].balance += msg.value;
        emit DepositMade(msg.sender, msg.value);
        return accounts[msg.sender].balance;
    }

    function withdraw(uint withdrawAmount) public returns (uint remainingBal) {
        require(accounts[msg.sender].isValid == true,"Account doesn't exist !");
        require(accounts[msg.sender].balance >= withdrawAmount, 'Insufficient balance in Bank account');
        
        address payable _client = msg.sender;
        accounts[msg.sender].balance -= withdrawAmount;
        _client.transfer(withdrawAmount);
        emit WithdrawalMade(msg.sender, withdrawAmount);

        return accounts[msg.sender].balance;
    }

    function pay(address payable _sender,address _receiver,uint amount) internal {
        require(accounts[_sender].isValid==true,"Sender account doesn't exist");
        require(accounts[_sender].balance >= amount,"Insufficient balance !");
        if(accounts[_receiver].isValid == false){
            createAccount(_receiver);
        }
        
        accounts[_sender].balance -= amount;
        accounts[_receiver].balance  += amount;
        emit PaymentMade(_sender,_receiver,amount);
  }
  
    function balance(address _client) public view returns (uint) {
        return accounts[_client].balance;
    }
}