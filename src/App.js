import React, { useContext } from 'react';
import { render } from 'react-dom';
import TelegramLoginButton from 'telegram-login-button';
import Button from 'react-bootstrap/Button';
import { NFTContext } from './Context/NFTContext';

function App() {
  const { connectWallet, bnbMint } = useContext(NFTContext);

  const handleTelegramAuth = (user) => {
    console.log(user); // Handle Telegram user data
    // Perform actions with user data if needed
  };

  return (
    <>
      <div className="container my-3">
        <Button variant="primary" type="submit" onClick={connectWallet}>
          Connect Metamask
        </Button>
      </div>
      <div className="container my-3">
        <TelegramLoginButton
          botName="AstraNovaBot"
          dataOnauth={handleTelegramAuth}
          usePic={true}
          className="custom-class"
          cornerRadius={5}
          requestAccess={true}
          buttonSize="medium"
        />
      </div>
      <div className="container my-3">
        <Button variant="primary" onClick={bnbMint}>
          Mint NFT
        </Button>
      </div>
    </>
  );
}

export default App; // Exporting App as default
