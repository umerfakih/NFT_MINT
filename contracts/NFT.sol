// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";



contract MintNFT is ERC721, ERC721Enumerable, ERC721URIStorage {

    using SafeMath for uint256;
    using Counters for Counters.Counter;
    uint public constant mintPrice = 0;
    Counters.Counter private tokencount;
    IERC20 public token;
    uint256 public tokenmintprice;
    address payable public  owner;

    event TokenTransfer(address indexed user , address indexed Contractaddress , uint256 amount);

    
    constructor(address _token,uint256 _tokenmintprice) ERC721("flightnft.net", "FlightNFT"){
        token = IERC20(_token);
        tokenmintprice = _tokenmintprice;
        owner = payable(msg.sender);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable){
        super._beforeTokenTransfer(from,to,tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage){
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns(string memory){
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool){
        return super.supportsInterface(interfaceId);
    }

    function Bnbmint(string memory _uri, address recipient) public payable {
        tokencount.increment();
        uint256 newID = tokencount.current();
        _safeMint(recipient, newID);
        _setTokenURI(newID, _uri);
    }

    function Tokenmint(string memory _uri, address recipient) public {
        require(token.balanceOf(msg.sender)>= tokenmintprice);
        tokencount.increment();
        uint256 newID = tokencount.current();
        _safeMint(recipient, newID);
        _setTokenURI(newID, _uri);
        token.transferFrom(msg.sender,address(this),tokenmintprice);
        emit TokenTransfer(msg.sender,address(this),tokenmintprice);
    }

    function tokenCount() public view returns(uint256){
        return totalSupply();
    }

    function charge() payable public{
        owner.transfer(msg.value);
    }

    function withdrawAll()public OnlyOwner {
        uint256 remainingamount = token.balanceOf(address(this));
        token.transfer(msg.sender,remainingamount);
        owner.transfer(address(this).balance);


    }

    modifier OnlyOwner{
        require(msg.sender == owner);
        _;
    }

}