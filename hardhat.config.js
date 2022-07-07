require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
const {private_key,url} = process.env


module.exports = {
  solidity: "0.8.4",
  networks:{
    bsctest:{
      url : url,
      accounts : [private_key],
    }
  }

};