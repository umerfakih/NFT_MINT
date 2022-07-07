const { ethers } = require("hardhat");

async function main() {

  
  const Token = await ethers.getContractFactory("TestToken")
  const token = await Token.deploy()

  const NFT = await ethers.getContractFactory("MintNFT")
  const nft = await NFT.deploy(token.address,"100000000000000000000")

  const Claim = await ethers.getContractFactory("Claimmechanism")
  const claim = await Claim.deploy(token.address,"1000000000000000000000")

  console.log("NFT ADDRESS:",token.address)
  saveFrontendFiles(claim,"Claimmechanism")
  saveFrontendFiles(token,"TestToken")
  saveFrontendFiles(nft,"MintNFT")
}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../src/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });