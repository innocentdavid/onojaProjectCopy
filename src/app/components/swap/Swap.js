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
import { swapExactETHForTokens, getAmountsOut } from '../../../functions/Utility/routerContract';

import LottieConf from '../modals/lottie-animation';
import { toastSuccessParams, toastErrorParams } from '../../../assets/data/toast-params';

export const Swap = () => {
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

  getCoinbase().then(address => {
    setWalletAddress(address)
    if (walletAddress !== '') {
      try {
        balanceOf(walletAddress).then(
          balance => {
            console.log(balance)
            setTokenBalance(Web3.utils.fromWei(
              balance.toString(),
              'ether'
            ));
          }
        );
        balance(walletAddress).then(
          balance2 => {
            console.log(balance2)
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

  const onClickSwap = () => {
    setIsOpen(true);
    swapExactETHForTokens(walletAddress).then(
      res => {
        console.log(res)
        setTx(res.transactionHash);
        toast.success(
          'Congratulations! Tokens swap successfully.',
          toastSuccessParams
        );
        setShowSpinner(false);
        setShowConfirm(true);
      }).catch(() => {
        setIsOpen(false);
        toast.error('Unable to swap tokens.', toastErrorParams);
      });
  }

  const getAmountsOutContract = (value) => {
    console.log(Web3.utils.toWei(
      value.toString(),
      'ether'
    ))
    setFromTokenAmount(Web3.utils.toWei(
      value.toString(),
      'ether'
    ))
    getAmountsOut(Web3.utils.toWei(
      value.toString(),
      'ether'
    )).then(
      res => {
        console.log(res)
        setToTokenAmount(res[1])
      });
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
        <div className='card'
          style={{ maxWidth: '420px', width: '100%' }}>
          <div className='card-body'>
            <form className='forms-sample'>
              <Form.Group>
                <label htmlFor='from' style={{ fontSize: '20px' }}>From</label>
                <div className="sc-ezredP sc-jNMcJZ sc-dOSRxR iZzQJe TyukH lnuFxt">
                  <button className="sc-hlWxgi dtoCsd open-currency-select-button" onClick={() => { setShowSelectTokenDlg(true) }}>
                    <span className="sc-eUWgZB dlpCzR">
                      <img className="sc-jifHHV cuzZL" alt="cUSD logo" width={30} height={30} src="https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cUSD.png" />
                      <span className="sc-hcevZV iYuEdT token-symbol-container">cUSD</span>
                      <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg" className="sc-gATJxy gLgkXq">
                        <path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE"></path>
                      </svg>
                    </span>
                  </button>
                </div>
                <Form.Control
                  type='number'
                  id='from'
                  placeholder='0.0'
                  onChange={({ target }) => getAmountsOutContract(target.value)}
                  required
                />
              </Form.Group>
              <div className='col-12 col-sm-24 col-xl-7 text-center text-xl-right'>
                <i className='icon-md mdi mdi-arrow-down text-primary ml-auto'></i>
              </div>
              <Form.Group>
                <label htmlFor='to' style={{ fontSize: '20px' }}>To</label>
                <div className="sc-ezredP sc-jNMcJZ sc-dOSRxR iZzQJe TyukH lnuFxt">
                  <button className="sc-hlWxgi dtoCsd open-currency-select-button" onClick={() => { setShowSelectTokenDlg(true) }}>
                    <span className="sc-eUWgZB dlpCzR">
                      <img className="sc-jifHHV cuzZL" alt="cUSD logo" width={30} height={30} src="https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cUSD.png" />
                      <span className="sc-hcevZV iYuEdT token-symbol-container">cUSD</span>
                      <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg" className="sc-gATJxy gLgkXq">
                        <path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE"></path>
                      </svg>
                    </span>
                  </button>
                </div>
                <Form.Control
                  type='number'
                  id='to'
                  placeholder='0.0'
                  onChange={({ target }) => setToTokenAmount(target.value)}
                  required
                />
              </Form.Group>
            </form>

            <div>
              <button
                type='button'
                className='btn btn-inverse-primary btn-connect-wallet'
                onClick={onClickSwap}
                style={{ fontSize: '30px', textAlign: 'center', width: '100%', padding: '10px', marginTop: '10px' }}
              >
                Connect Wallet
              </button>
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

export default Swap;