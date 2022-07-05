import Web3 from 'web3';
import web3Modal from './web3Modal';

const connectWallet = async () => {
  const configResponse = await fetch('/config/config.json', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const { ethereum } = window;

  if (!ethereum) {
    return {
      status: 'error',
      message: 'Install Metamask.',
    };
  }

  const CONFIG = await configResponse.json();
  await web3Modal.clearCachedProvider();
  try {
    const provider = await web3Modal.connect();
    const web3Object = new Web3(provider);
    window.web3Object = web3Object;
    const accounts = await web3Object.eth.getAccounts();
    const chainId = await web3Object.eth.net.getId();
    if (chainId == CONFIG.NETWORK.ID) {
      return {
        status: 'connect_success',
        account: accounts[0],
      }

    // Add listeners start
    //   provider.on('accountsChanged', (accounts) => {
    //     return {
    //       status: 'accounts_changed',
    //       account: accounts[0],
    //     };
    //   });
    //   provider.on('chainChanged', () => {
    //     window.location.reload();
    //   });
      // Add listeners end
    } else {
      return {
        status: 'changed_network',
        message: `Change network to ${CONFIG.NETWORK.NAME}.`,
      };
    }
  } catch (err) {
    return {
      status: 'error',
      message: err,
    };
  }
};

export default connectWallet;
