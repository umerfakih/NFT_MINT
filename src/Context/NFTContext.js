import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'

import {
  NftContractAbi, NftContractAddress, TokenContractAbi,
  TokenContractAddress, ClaimContractAbi, ClaimContractAddress
} from '../Instance/ContractInstance'

export const NFTContext = React.createContext()

const { ethereum } = window

const loadNftContract = () => {
  const provder = new ethers.providers.Web3Provider(ethereum)
  const signer = provder.getSigner()
  const NftContractInstance = new ethers.Contract(NftContractAddress, NftContractAbi, signer)
  return (NftContractInstance)
}

const loadTokenContract = () => {
  const provder = new ethers.providers.Web3Provider(ethereum)
  const signer = provder.getSigner()
  const TokenContractInstance = new ethers.Contract(TokenContractAddress, TokenContractAbi, signer)
  return (TokenContractInstance)
}

const loadClaimContract = () => {
  const provder = new ethers.providers.Web3Provider(ethereum)
  const signer = provder.getSigner()
  const ClaimContractInstance = new ethers.Contract(ClaimContractAddress, ClaimContractAbi, signer)
  return (ClaimContractInstance)
}


export const NFTProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null)
  const [inputfieldchange, setinputfieldchange] = useState(0)

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('please install metamask')
      const chainId = await ethereum.request({ method: 'eth_chainId' });
      if (chainId !== '0x34a1') {
        return alert('Please switch to the immutable zkevm  testnet');
      }
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      setCurrentAccount(accounts[0])
      window.location.reload()
    } catch (error) {
      console.log(error)
      throw new Error('No ethereum object')
    }
  }

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask.')
      const chainId = await ethereum.request({ method: 'eth_chainId' });
      if (chainId !== '0x34a1') {
        return alert('Please switch to the immutable zkevm  testnet');
      }
      const accounts = await ethereum.request({ method: 'eth_accounts' })

      if (accounts.length) {
        setCurrentAccount(accounts[0])

      } else {
        console.log('No accounts found')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const changeininputfield = (e) => {
    console.log(e.target.value)
    setinputfieldchange(e.target.value)
  }

  const onsubmit = async () => {
    console.log(parseFloat(inputfieldchange))
    if (parseFloat(inputfieldchange) > 0) {
      await ChargeFromUser(inputfieldchange)
    } else {
      window.alert('null value not allowed')
    }
  }

  const ChargeFromUser = async (a) => {
    const NftContractInstance = loadNftContract()
    const ChargeAmount = { value: ethers.utils.parseEther(a) }
    await NftContractInstance.charge(ChargeAmount)
  }

  const claimToken = async () => {
    const ClaimContractInstance = loadClaimContract()
    await ClaimContractInstance.claim()
  }

  const bnbMint = async () => {
    const NftContractInstance = loadNftContract()
    await NftContractInstance.safeMint() 

  }

  const tokenMint = async () => {
    const TokenContractInstance = loadTokenContract()
    const NftContractInstance = loadNftContract()
    let uri = "umer"
    let tokenValue = new ethers.utils.parseEther("100".toString())
    await TokenContractInstance.approve(NftContractInstance.address, tokenValue)
    await (await NftContractInstance.Tokenmint(uri, currentAccount))
  }


  useEffect(() => {
    checkIfWalletIsConnect()
  }, [])

  return (
    <NFTContext.Provider value={{
      currentAccount,
      loadNftContract,
      connectWallet,
      inputfieldchange,
      changeininputfield,
      onsubmit,
      loadTokenContract,
      loadClaimContract,
      claimToken,
      bnbMint,
      tokenMint

    }}
    >
      {children}
    </NFTContext.Provider>
  )
}