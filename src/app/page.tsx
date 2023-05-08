'use client'; // this is a client component 👈🏽


import './App.global.css';
import React, { useEffect, useRef, useState } from 'react';
import Web3 from 'web3';
import WinterCheckout from '@usewinter/checkout/dist/components/WinterCheckout';
import { EndpointsEnum } from '@/app/typings/endpoints.enum';

const Checkout = function({ address }: { address: string }) {
  if (!address) {
    return <></>;
  }
  return <WinterCheckout
    showModal={true}
    projectId={'12585' as any}
    extraMintParams={{ '_amount': 1 }}
    priceFunctionParams={{ '_amount': 1 }}
    // optional
    walletAddress={address}
    // optional
    // email={customersEmail}
    contractAddress={'0x45F0ee3a420941ae88A29e08227A2612264Ade54'}
    tokenId={'1'}
    // This will be the domain of the marketplace you want to pull the orders from
    orderSource={'opensea.io'}
    // This will be the domain of the marketplace you want the order to be fulfilled on
    fillSource={'opensea.io'}
    production={false}

    // Language - supports spanish, chinese, chineseT (chinese traditional), japanese, korean, french
    language={'english'}
    // If you want to customize the css of the checkout widget
    appearance={{
      leftBackgroundColor: '#131317',
      rightBackgroundColor: '#22222d',
      buttonTextColor: 'black',
      buttonColor: '#f59e0c',
      primaryTextColor: 'white',
      secondaryTextColor: '#85868a',
      fontFamily: 'Montserrat,sans-serif',
      buttonAndInputBoxShadow: '0 3px 6px 1px rgba(217, 119, 6, 0.2)',
      buttonAndInputFocusBoxShadow: '0 3px 6px 1px rgba(217, 119, 6, 0.8)',
      quantityButtonPlusMinusSvgFilter: 'invert(100%) sepia(100%) saturate(1%) hue-rotate(135deg) brightness(105%) contrast(101%)',
      inputBackgroundColor: '#131317',
      mintingClipLoaderColor: 'white',
      borderColor: 'rgba(245,158,11)'
    }}
  />;
};

export default function Home() {
  const web3Ref = useRef<Web3>();

  const [address, setAddress] = useState(null);

  const connectMetamaskMobile = () => {
    const dappUrl = window.location.href.split('//')[1].split('/')[0];
    const metamaskAppDeepLink = 'https://metamask.app.link/dapp/' + dappUrl;
    window.open(metamaskAppDeepLink, '_self');
  };

  useEffect(() => {
    if (!window?.ethereum) {
      return;
    }
    const getAddress = async () => {
      const web3 = new Web3(window.ethereum);
      web3Ref.current = web3;
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const currentAccount = accounts[0];
      setAddress(currentAccount);

      const providerUrl = window.ethereum.chainId === '0x89' ? 'https://rpc-mainnet.matic.network' : 'https://rpc-mumbai.maticvigil.com';

      const res = await fetch(`/api/${EndpointsEnum.IS_TOKEN_HOLDERS}/0x45F0ee3a420941ae88A29e08227A2612264Ade54?providerUrl=${providerUrl}&address=${currentAccount}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    };
    getAddress().finally();
  }, [window]);

  useEffect(() => {
    const init = async () => {

// Sign the message using the personal_sign method
      const message = 'Hello, world!'; // Replace this with your own message
      const signature = await web3Ref.current.eth.personal.sign(message, address);

      const res = await fetch('/api/' + EndpointsEnum.VERIFY_ADDRESS_OWNERSHIP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ signature, message, address })
      });

      const data = await res.json();

      console.log(data);
    };
    // init().finally();
  }, [address]);

  console.log(address);

  return (
    <>
      <button onClick={connectMetamaskMobile}>ENTER</button>
      {address && <Checkout address={address} />}
    </>
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
