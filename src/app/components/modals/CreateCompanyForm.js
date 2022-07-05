/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { Form, Spinner, Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';

import confirm from '../../../assets/data/21052-checking.json';
import spinner from '../../../assets/data/28434-fc-spinner.json';

import LottieConf from './lottie-animation';
import { toastSuccessParams, toastErrorParams } from '../../../assets/data/toast-params';
import { getCoinbase } from '../../../functions/Utility/cityInvestTokenContract';
import { createCompany } from '../../../functions/Utility/metaStocksContract';
import CompanyContract from '../../blockchain/companyManagerContract';

export const CreateCompanyForm = ({ setStep }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [name, setName] = useState('');
  const [notName, setNotName] = useState(false);
  const [tx, setTx] = useState('');
  const [spinnerCreate, setSpinnerCreate] = useState(false);

  const handleSubmit = () => {
    if (name === '') {
      setIsOpen(true);
      setSpinnerCreate(true);
      setNotName(false);
      createCompany(walletAddress).then(r => {
        setTx(r.transactionHash);
        toast.success(
          'Congratulations! Company created successfully.',
          toastSuccessParams
        );
        setShowSpinner(false);
        setShowConfirm(true);
        setStep(1);
        setSpinnerCreate(false);
      }).catch((error) => {
        setSpinnerCreate(false);
        setIsOpen(false);
        toast.error('Unable to create your company.', toastErrorParams);
      })
    } else {
      setNotName(true);
    }

  };

  getCoinbase().then(address => {
    setWalletAddress(address)
  })


  const addToMetamask = async _ => {
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: CompanyContract, // The address that the token is at.
            symbol: 'MSC', // A ticker symbol or shorthand, up to 5 chars.
            decimals: 0, // The number of decimals in the token
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
  // setName(target.value)
  return (
    <>
      <div className='create-form'>
        <div className='row'>
          <div className='col-sm-12 text-center'>
            <button
              type='button'
              className='btn btn-inverse-success'
              onClick={handleSubmit}
            >
              {spinnerCreate && (<Spinner animation="border" variant="success" />)}
              <i className="mdi mdi-plus"></i>  Create Company
            </button>
          </div>
          <div className='col-sm-12 text-center mt-2'>
            <p>You don't have the funds? <b>Check lending section</b></p>
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
                  <p>Creating the company</p>
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
    </>
  );
}

export default CreateCompanyForm;
