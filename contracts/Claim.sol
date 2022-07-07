// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


contract Claimmechanism {
    using SafeMath for uint256;
    IERC20 public token;
    uint256 public claimableToken;

    struct UserInfo{
        uint256 alreadyclaim;
        uint256 lastclaim;
    }
    
    mapping(address=>UserInfo) users;

    event Claim(address indexed users , uint256 claimableToken);

    constructor(address _token ,uint256 _claim){
        token = IERC20(_token);
        claimableToken = _claim;
    }

    function claim() public  {
        UserInfo storage user = users[msg.sender];
        require(token.balanceOf(address(this))>=claimableToken);
        require(user.lastclaim >= user.alreadyclaim,"wait for 24 hours");
        user.lastclaim = block.timestamp;
        user.alreadyclaim = block.timestamp.mul(24*60*60);
        require(token.transfer(msg.sender,claimableToken));
        emit Claim(msg.sender,claimableToken);
    }
}