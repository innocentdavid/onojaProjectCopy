import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

import contractAddress from '../../app/blockchain/contractAddress';
import contractAbi from '../../app/blockchain/abi/MetaStocksToken.json';

export default function wallet_model() {
    return {
    async getweb3() {
      let web3Modal;
      let provider;
      let web3;
      let providerOptions;
      providerOptions = {
        metamask: {
          id: 'injected',
          name: 'MetaMask',
          type: 'injected',
          check: 'isMetaMask',
        },
        walletconnect: {
          package: WalletConnectProvider, // required
          options: {
            infuraId: 'a6f8437631884f188a87dd2f9c8da2a8', // Required
            // network: 'rinkeby',
            // qrcodeModalOptions: {
            //   mobileLinks: [
            //     'rainbow',
            //     'metamask',
            //     'argent',
            //     'trust',
            //     'imtoken',
            //     'pillar',
            //   ],
            // },
          },
        },
      };
      web3Modal = new Web3Modal({
        network: 'rinkeby',
        cacheProvider: false,
        providerOptions,
      });

      web3Modal.clearCachedProvider();
      provider = await web3Modal.connect();
      provider.on('error', (e) => console.error('WS Error', e));
      provider.on('end', (e) => console.error('WS End', e));

      provider.on('disconnect', (error) => {
        console.log(error);
      });
      provider.on('connect', (info) => {
        console.log(info);
      });
      web3 = new Web3(provider);
      
      return web3;
    },
    async disconnect() {
        let web3 = new Web3();
        web3.eth.currentProvider.disconnect();
    },
    async getTokenContract() {
      let web3Modal;
      let provider;
      let web3;
      let providerOptions;
      let tokenContract;
      providerOptions = {
        metamask: {
          id: 'injected',
          name: 'MetaMask',
          type: 'injected',
          check: 'isMetaMask',
        },
        walletconnect: {
          package: WalletConnectProvider, // required
          options: {
            infuraId: 'a6f8437631884f188a87dd2f9c8da2a8', // Required
            // network: 'rinkeby',
            // qrcodeModalOptions: {
            //   mobileLinks: [
            //     'rainbow',
            //     'metamask',
            //     'argent',
            //     'trust',
            //     'imtoken',
            //     'pillar',
            //   ],
            // },
          },
        },
      };
      web3Modal = new Web3Modal({
        // network: 'rinkeby',
        cacheProvider: false,
        providerOptions,
      });

      web3Modal.clearCachedProvider();
      provider = await web3Modal.connect();
      provider.on('error', (e) => console.error('WS Error', e));
      provider.on('end', (e) => console.error('WS End', e));

      provider.on('disconnect', (error) => {
        console.log(error);
      });
      provider.on('connect', (info) => {
        console.log(info);
      });
      web3 = new Web3(provider);
      tokenContract = new web3.eth.Contract(contractAbi,contractAddress);
      return tokenContract;
    }
  };
}
