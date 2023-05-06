"use client"; // this is a client component 👈🏽

import './App.global.css';
import { useEffect } from 'react';
import Web3 from 'web3';

export default function Home() {

  // const connectMetamaskMobile = () => {
  //   const dappUrl = window.location.href.split('//')[1].split('/')[0];
  //   const metamaskAppDeepLink = 'https://metamask.app.link/dapp/' + 'opensea.io';
  //   window.open(metamaskAppDeepLink, '_self');
  // };

  useEffect(() => {
    if (!window) {
      return;
    }

    console.log(123);
    const init = async () => {
      const web3 = new Web3(window.ethereum);

// Get the current account
      const accounts = await web3.eth.getAccounts();
      const currentAccount = accounts[0];

// Sign the message using the personal_sign method
      const message = 'Hello, world!'; // Replace this with your own message
      const signature = await web3.eth.personal.sign(message, currentAccount);

      const res = await fetch('/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ signature, message, address: '0xb10Ad8a88818d1E46461C86711069141b1AC4769' })
      });

      const data = await res.json();

      console.log(data);
    };
    init().finally();
  }, [window]);

  return (
    <></>
    // <MetaMaskContextProvider>
    //   <div className={styles.appContainer}>
    //     <Navigation />
    //     <Display />
    //     <MetaMaskError />
    //     <button onClick={connectMetamaskMobile}>TEST</button>
    //   </div>
    // </MetaMaskContextProvider>
  );
}
