import React, { useEffect } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import { NFTContext } from './Context/NFTContext';
import { useContext } from 'react';

const App = () => {
  const { connectWallet, bnbMint } = useContext(NFTContext);

  useEffect(() => {
    // Load Telegram widget script
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    document.body.appendChild(script);

    // Define the callback function
    window.onTelegramAuth = function(user) {
      alert(
        'Logged in as ' +
          user.first_name +
          ' ' +
          user.last_name +
          ' (' +
          user.id +
          (user.username ? ', @' + user.username : '') +
          ')'
      );
    };

    return () => {
      // Cleanup function to remove the script when the component unmounts
      document.body.removeChild(script);
      delete window.onTelegramAuth;
    };
  }, []);

  return (
    <>
      <div className="container my-3">
        <Button variant="primary" type="submit" onClick={connectWallet}>
          Connect Wallet
        </Button>
      </div>
      <div className="container my-3">
        <Button variant="primary" onClick={bnbMint}>
          Mint
        </Button>
      </div>
      {/* Include the Telegram widget */}
      <div className="container my-3">
        <div
          className="telegram-widget"
          data-telegram-login="AstraNovaBot"
          data-size="large"
          data-onauth="onTelegramAuth(user)"
        ></div>
      </div>
    </>
  );
};

export default App;
