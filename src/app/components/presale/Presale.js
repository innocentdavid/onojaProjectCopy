/* eslint-disable react/style-prop-object */
/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Web3 from 'web3';

import Modal from 'react-bootstrap/Modal';
import toast from 'react-hot-toast';
import confirm from '../../../assets/data/21052-checking.json';
import spinner from '../../../assets/data/28434-fc-spinner.json';
import contractAddress from '../../blockchain/contractAddress';
import { getCoinbase, balanceOf, balance } from '../../../functions/Utility/cityInvestTokenContract';
import { buyPresale } from '../../../functions/Utility/presaleContract';
import wallet_model from '../../../functions/Utility/web3Modal';

import Params from '../../blockchain/chainParams';
import LottieConf from '../modals/lottie-animation';
import { toastSuccessParams, toastErrorParams } from '../../../assets/data/toast-params';

const { getweb3, disconnect } = wallet_model();

export const Presale = () => {
  const [walletAddress, setWalletAddress] = useState('');
  // to display our token balance in input
  const [tokenBalance, setTokenBalance] = useState(0);
  // to display native token balance in input
  const [nativeBalance, setNativeBalance] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fromTokenAmount, setFromTokenAmount] = useState(0.0);
  const [toTokenAmount, setToTokenAmount] = useState(0.0);
  const [tx, setTx] = useState('');
  const [showSelectTokenDlg, setShowSelectTokenDlg] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState(localStorage.getItem('account'));

  getCoinbase().then(address => {
    setWalletAddress(address)
    if (walletAddress !== '') {
      try {
        balanceOf(walletAddress).then(
          balance => {
            setTokenBalance(Web3.utils.fromWei(
              balance.toString(),
              'ether'
            ));
          }
        );
        balance(walletAddress).then(
          balance2 => {
            setNativeBalance(Web3.utils.fromWei(
              balance2.toString(),
              'ether'
            ));
          }
        );
      }
      catch (e) {
        console.log('error', e);
      }
    }
  })

  const connectWallet = async _ => {
    try {
      if (connectedAddress) {
        const res = await disconnect();
        localStorage.clear();
      }
      await getweb3().then((response) => {
        response.eth.getAccounts().then((result) => {
          setConnectedAddress(result[0])
          if (window.ethereum.chainId !== '97') { //bsctestnet
            setChainIdToBSC('0x61');//bsctestnet
          }
        });
      });
    }
    catch (e) {
      toast.error('Unable to connect with metamask', toastErrorParams);
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

  const onClickSwap = () => {
    setIsOpen(true);
    buyPresale(walletAddress, Web3.utils.toWei(fromTokenAmount.toString(), 'ether')).then(
      res => {
        console.log(res)
        setTx(res.transactionHash);
        toast.success(
          'Congratulations! Tokens swap successfully.',
          toastSuccessParams
        );
        setShowSpinner(false);
        setShowConfirm(true);
      }).catch((error) => {
        console.log(error)
        setIsOpen(false);
        toast.error('Unable to swap tokens.', toastErrorParams);
      });
  }

  const getAmountsFrom = (val) => {
    if (val > 0.0) {
      setFromTokenAmount(val)
      setToTokenAmount(Number(val / 0.05).toFixed(4))
    }
  }

  
  const getAmountsTo = (val) => {
    if (val > 0.0) {
      setFromTokenAmount(Number(val * 0.05).toFixed(4))
      setToTokenAmount(val)
    }
  }

  const addToMetamask = async _ => {
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: contractAddress, // The address that the token is at.
            symbol: 'MST', // A ticker symbol or shorthand, up to 5 chars.
            decimals: 18, // The number of decimals in the token
          },
        },
      });
      if (wasAdded) {
        console.log('Thanks for your interest!');
      } else {
        console.log('Your loss!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          flexDirection: 'column'
        }}
      >
        <div className='card presale'
          style={{ maxWidth: '420px', width: '100%' }}>
          <div className='card-body'>
            <form className='forms-sample'>
              <Form.Group>
                <label htmlFor='from' style={{ fontSize: '20px' }}>From</label>
                <div className="d-flex justify-content-between align-items-center">
                  <button  type="button" className="open-currency-select-button">
                    <span>
                      <img className="mr-1 mb-2" alt="bnb logo" width={30} height={30} src="https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png" />
                      <span className="token-symbol-container">BNB</span>
                      <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE"></path>
                      </svg>
                    </span>
                  </button>
                  <span>{nativeBalance > 0 ? Number(nativeBalance).toFixed(4) : '-'}</span>
                </div>
                <Form.Control
                  type='number'
                  id='from'
                  placeholder='0.0'
                  value={fromTokenAmount}
                  onChange={({ target }) => getAmountsFrom(target.value)}
                  required
                />
              </Form.Group>
              <div className='col-12 col-sm-24 col-xl-7 text-center text-xl-right'>
                <i className='icon-md mdi mdi-arrow-down text-primary ml-auto'></i>
              </div>
              <Form.Group>
                <label htmlFor='from' style={{ fontSize: '20px' }}>To</label>
                <div className="d-flex justify-content-between align-items-center">
                  <button  type="button" className="open-currency-select-button">
                    <span>
                      <img className="mr-1 mb-2" alt="bnb logo" width={30} height={30} src="https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png" />
                      <span className="token-symbol-container">BNB</span>
                      <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE"></path>
                      </svg>
                    </span>
                  </button>
                  <span>{tokenBalance > 0 ? Number(tokenBalance).toFixed(4) : '-'}</span>
                </div>
                <Form.Control
                  type='number'
                  id='to'
                  placeholder='0.0'
                  value={toTokenAmount}
                  onChange={({ target }) => getAmountsTo(target.value)}
                  required
                />
              </Form.Group>
            </form>

            <div>
              {walletAddress !== '' ?
                fromTokenAmount > 0.0 && toTokenAmount > 0.0 ? (
                  <button
                    type='button'
                    className='btn btn-inverse-primary btn-connect-wallet'
                    onClick={onClickSwap}
                    style={{ fontSize: '20px', textAlign: 'center', width: '100%', padding: '10px', marginTop: '10px' }}
                  >
                    Swap
                  </button>
                ) : (<button
                  type='button'
                  className='btn btn-inverse-primary btn-connect-wallet'
                  style={{ fontSize: '20px', textAlign: 'center', width: '100%', padding: '10px', marginTop: '10px' }}
                >
                  Enter a valid amount
                </button>)
                :
                (
                  <button
                    type='button'
                    className='btn btn-inverse-primary btn-connect-wallet'
                    onClick={connectWallet}
                    style={{ fontSize: '20px', textAlign: 'center', width: '100%', padding: '10px', marginTop: '10px' }}
                  >
                    Connect Wallet
                  </button>
                )
              }
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={isOpen}
        onHide={() => setIsOpen(false)}
        animation={true}
        centered
      >
        <Modal.Body>
          <div className='card confirm'>
            <div className='card-body'>
              {showSpinner && (
                <>
                  <LottieConf loopEnable={true} confirmAnimation={spinner} />
                  <p>Swap {fromTokenAmount} tokens for {toTokenAmount} </p>
                  <p>Confirm this transaction in your wallet </p>
                </>
              )}
              {showConfirm && (
                <>
                  <LottieConf loopEnable={false} confirmAnimation={confirm} />
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href={`https://testnet.snowtrace.io/tx/${tx}`}
                  >
                    View on BscScan
                  </a>
                  <button
                    onClick={addToMetamask}
                    type='button'
                    className='btn btn-inverse-info mt-3'
                  >
                    Add to metamask
                  </button>
                </>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className='justify-content-around'>
          <button
            type='button'
            onClick={() => setIsOpen(false)}
            className='btn btn-inverse-light'
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showSelectTokenDlg}
        onHide={() => setShowSelectTokenDlg(false)}
        animation={true}
        centered
      >
        <Modal.Body>
          <div className='card confirm' style={{ alignItems: 'flex-start' }}>
            <div className='card-body'>
              <div >
                <div style={{ display: 'flex' }}>
                  <img className="sc-jifHHV cuzZL" alt="ABR logo" width={50} height={50} src="https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_ABR.png" />
                  <div className="sc-bdfBQB bJEyil">
                    <div title="Allbridge" className="css-8mokm4">ABR</div>
                    <div className="sc-giImIA gNvAIq css-165qfk5">Allbridge </div>
                  </div>
                  <span />
                  <div className="sc-ezredP sc-jNMcJZ sc-Azgjq iZzQJe TyukH kzyFfL" />
                </div>
                <div style={{ display: 'flex', marginTop: '5px' }}>
                  <img className="sc-jifHHV cuzZL" alt="ABR logo" width={50} height={50} src="https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_ABR.png" />
                  <div className="sc-bdfBQB bJEyil">
                    <div title="Allbridge" className="css-8mokm4">ABR</div>
                    <div className="sc-giImIA gNvAIq css-165qfk5">Allbridge </div>
                  </div>
                  <span />
                  <div className="sc-ezredP sc-jNMcJZ sc-Azgjq iZzQJe TyukH kzyFfL" />
                </div>
              </div>

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className='justify-content-around'>
          <button
            type='button'
            onClick={() => setShowSelectTokenDlg(false)}
            className='btn btn-inverse-light'
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Presale;