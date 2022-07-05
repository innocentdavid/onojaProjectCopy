/* eslint-disable no-unused-vars */
import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Form } from 'react-bootstrap';

import Web3 from 'web3';


import CreateModal from '../modals/CreateModal';
import contractAddress from '../../blockchain/contractAddress';
import Params from '../../blockchain/chainParams';
import { toastErrorParams } from '../../../assets/data/toast-params';
import wallet_model from '../../../functions/Utility/web3Modal';
import { isCeo, getCompanyId, getMetaStocksFranchisesUnclaimedRewards } from '../../../functions/Utility/metaStocksContract';

const { getweb3, disconnect } = wallet_model();

export const Navbar = () => {

  const [myWeb3, setMyWeb3] = useState(null);
  const [isCeoCompany, setIsCeoCompany] = useState(false);
  const [companyId, setCompanyId] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState(localStorage.getItem('account'));
  const [rewards, setRewards] = useState(0)

  if (connectedAddress) {
    isCeo(connectedAddress).then(ceo => {
      setIsCeoCompany(ceo)
      if (isCeoCompany) {
        getCompanyId(connectedAddress).then(id => {
          setCompanyId(id)
        })
      }
    })
  }

  const claimreward = async _ => {
    if (contractAddress) {
      getMetaStocksFranchisesUnclaimedRewards().then(res => {
        setRewards(res)
      })
    }
  }


  const connectWallet = async _ => {
    try {
      if (connectedAddress) {
        const res = await disconnect();
        localStorage.clear();
      }
      await getweb3().then((response) => {
        setMyWeb3(response)
        response.eth.getAccounts().then((result) => {
          setConnectedAddress(result[0])
          localStorage.setItem('account', result[0])
          if (window.ethereum.chainId !== '97') { //bsctestnet
            setChainIdToBSC('0x61');//bsctestnet
          }
        });
      });
    }
    catch (e) {
      localStorage.clear();
      toast.error('Unable to connect with metamask', toastErrorParams);
    }
  }

  const onChangeNetwork = async (value) => {
    if (value === 1) {
      setChainIdToBSC()
    } else {
      setChainIdToBSC('0xa869');
    }
  }

  const setChainIdToBSC = async (id) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: id }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [Params],
          });
        } catch (addError) {
          toast.error('Unable to add bsc network to metamask', toastErrorParams);
        }
      }
    }
  }

  return (
    <nav className='navbar p-0 fixed-top d-flex flex-row'>
      <div className='navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center'>
        <Link className='navbar-brand brand-logo-mini' to='/'>
          <img
            src={require('../../../assets/images/logo-mini.svg')}
            alt='logo'
          />
        </Link>
      </div>
      
      <div className='navbar-menu-wrapper flex-grow d-flex align-items-stretch'>
        <button
          className='navbar-toggler align-self-center'
          type='button'
          onClick={() => document.body.classList.toggle('sidebar-icon-only')}
        >
          <span className='mdi mdi-menu'></span>
        </button>
        
        <ul className='navbar-nav navbar-nav-right'>
          <button
            type='button'
            className='btn btn-inverse-success mr-3'
            onClick={() => { window.open(`https://pancake.kiemtienonline360.com/#/swap?tokenOut=${contractAddress}`, 'name', 'noopener=yes'); }}
          >

            <i className="mdi mdi-cash-usd"></i> Buy Token
          </button>
          <button
            type='button'
            className='btn btn-inverse-success mr-3'
            onClick={() => { window.open(`https://testnet.bscscan.com/address/${contractAddress}#code`, 'name', 'noopener=yes'); }}
          >
            {/* <span className='menu-icon'>
              <i className='mdi mdi-plus'></i>
            </span>{' '} */}
            Contract Address
          </button>
          <button
            type='button'
            className='btn btn-inverse-success mr-3'
            onClick={() => { window.open(`https://testnet.bscscan.com/address/${contractAddress}#code`, 'name', 'noopener=yes'); }}
          >
            Try on Testnet
          </button>
          { connectedAddress && isCeoCompany ? (<button
            type='button'
            className='btn btn-inverse-success mr-3'
            onClick={claimreward}
          >
            Claim: {rewards}
          </button>) : '' }
          {connectedAddress && isCeoCompany ? (<CreateModal companyId={companyId} dis={false} />) : (<CreateModal companyId={companyId} dis={true} />)}
          <button
            type='button'
            className='btn btn-inverse-info'
            onClick={connectWallet}
          >
            <span className='menu-icon'><i className='mdi mdi-wallet'></i></span>
            {connectedAddress ? `${connectedAddress.slice(0, 5)}...${connectedAddress.slice(37)}` : 'Connect Wallet'}
          </button>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;