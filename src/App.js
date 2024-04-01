import './App.css'
import Button from 'react-bootstrap/Button'
import { NFTContext } from './Context/NFTContext'
import { useContext } from 'react'

function App() {
  const {
    connectWallet,
    bnbMint
  } = useContext(NFTContext)

  return (
    <>
      <div className="container my-3">
        <Button variant="primary" type="submit" onClick={connectWallet}>
          metamask
        </Button>
      </div>
      <div className="container my-3">
        <Button variant="primary" onClick={bnbMint}>
          Mint
        </Button>
      </div>
    </>
  )
}

export default App