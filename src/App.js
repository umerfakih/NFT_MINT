import './App.css'
import Button from 'react-bootstrap/Button'
import { NFTContext } from './Context/NFTContext'
import { useContext } from 'react'

function App() {
  const {
    connectWallet,
    onsubmit,
    inputfieldchange,
    changeininputfield,
    claimToken,
    bnbMint,
    tokenMint
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
          Bnb Mint
        </Button>{' '}
      </div>
      <div className="form-group">
        <input placeholder="input the eth amount" value={inputfieldchange} onChange={changeininputfield}/>
        <button className="btn btn-primary" onClick={onsubmit}>
          charge
        </button>
      </div>
      <div className='container my-3'>
        <h1>claim test token here</h1>
        <Button variant="primary" type="submit"onClick={claimToken}>
          claim
        </Button>
      </div>
      <div className='container my-3'>
      <Button variant="primary" type="submit"onClick={tokenMint}>
          Token mint
        </Button>
      </div>
    </>
  )
}

export default App