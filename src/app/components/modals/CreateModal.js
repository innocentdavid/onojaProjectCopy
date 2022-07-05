/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import toast from 'react-hot-toast';
import Web3 from 'web3';


import confirm from '../../../assets/data/21052-checking.json';
import spinner from '../../../assets/data/28434-fc-spinner.json';

import CompaniesTypes from '../../../assets/data/companies-types';
import LottieConf from './lottie-animation';
import { toastSuccessParams, toastErrorParams } from '../../../assets/data/toast-params';
import { getCoinbase, balanceOf, getAllowance, approve } from '../../../functions/Utility/cityInvestTokenContract';
import { createFranchise } from '../../../functions/Utility/metaFranchisesContract';

export const CreateModal = ({ dis, companyId
 }) => {
  const [show, setShow] = useState(false);
  const [types, setTypes] = useState(
    CompaniesTypes.filter((element) => {
      if (element.locations.includes(0)) return element;
    })
  );
  const [continent, setContinent] = useState(0);
  const [type, setType] = useState(
    CompaniesTypes.filter((element) => {
      if (element.locations.includes(0)) return element;
    })[0]
  );
  const [isOpen, setIsOpen] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [tx, setTx] = useState('');
  const [allowance, setAllowance] = useState(0);
  const [walletAddress, setWalletAddress] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  getCoinbase().then(address => {
    setWalletAddress(address)
  })

  useEffect(() => {
    if (walletAddress !== '') {
      getAllowance(walletAddress).then(
        balance2 => {
          setAllowance(Web3.utils.fromWei(
            balance2,
            'ether'
          ));
        }
      );
    }
  }, [walletAddress])

  const onClickApprove = () => {
    approve(walletAddress).then(
      () => {
        toast.success(
          'Congratulations! Approve spend successfully.',
          toastSuccessParams
        );
        setAllowance(1)
      }
    )
  }

  const handleSubmit = () => {
    if (continent !== '' && type !== '') {
      setIsOpen(true);
      setShow(true);
      createFranchise(walletAddress, companyId, continent, parseInt(type) + 1).then(r => {
        setShowSpinner(false);
        setShowConfirm(true);
        setTx(r.blockHash);
        toast.success(
          'Congratulations! Franchise created successfully.',
          toastSuccessParams
        );
        setShowConfirm(false)
        setIsOpen(false);
        setShow(false);
      }).catch((error) => {
        console.log(error)
        setIsOpen(false);
        setShowConfirm(false);
        toast.error('Unable to create your franchise.', toastErrorParams);
      });
    } else {
      toast.error('Unable to create your franchise.', toastErrorParams);
    }
  };

  const onChangeContinent = (target) => {
    const comp = CompaniesTypes.filter((element) => {
      if (element.locations.includes(parseInt(target.value))) return element;
    });
    setContinent(target.value);
    setTypes(comp);
  };

  const addToMetamask = () => {
    // try {
    //    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    //    const wasAdded = await window.ethereum.request({
    //       method: 'wallet_watchAsset',
    //       params: {
    //          type: 'ERC20', // Initially only supports ERC20, but eventually more!
    //          options: {
    //             address: tokenInfo.address, // The address that the token is at.
    //             symbol: tokenInfo.symbol, // A ticker symbol or shorthand, up to 5 chars.
    //             decimals: tokenInfo.decimals, // The number of decimals in the token
    //             image: tokenInfo.image, // A string url of the token logo
    //          },
    //       },
    //    });
    //    if (wasAdded) {
    //       console.log('Thanks for your interest!');
    //    } else {
    //       console.log('Your loss!');
    //    }
    // } catch (error) {
    //    console.log(error);
    // }
  };

  return (
    <>
      <button
        disabled={dis}
        type='button'
        className='btn btn-inverse-success mr-3'
        onClick={handleShow}
      >
        Create Franchise
      </button>

      <Modal dialogClassName='create' show={show} onHide={handleClose} animation={true} centered>

        <Modal.Body>
          <div className='card'>
            <div className='card-body'>
              <button className='close btn-icon p-2' onClick={handleClose}>
                <span>x</span>
              </button>
              <form className='forms-sample'>
                <Form.Group>
                  <label htmlFor='continent'>Continent</label>
                  <select
                    className='form-control'
                    onChange={({ target }) => onChangeContinent(target)}
                    id='continent'
                    required
                  >
                    <option value='0'>NORTH AMERICA</option>
                    <option value='1'>SOUTH AMERICA</option>
                    <option value='2'>CENTRAL AMERICA</option>
                    <option value='3'>EUROPA</option>
                    <option value='4'>ASIA</option>
                    <option value='5'>AFRICA</option>
                    <option value='6'>OCEANIA</option>
                  </select>
                </Form.Group>
                <Form.Group>
                  <label htmlFor='type'>Company Type</label>
                  <select
                    className='form-control'
                    onChange={({ target }) => setType(target.value)}
                    id='type'
                    required
                  >
                    {types.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                </Form.Group>
              </form>

              <div className='row'>
                <div className='col-sm-6 text-center'>
                  <button
                    type='button'
                    onClick={handleClose}
                    className='btn btn-inverse-danger pl-5 pr-5'
                  >
                    Cancel
                  </button>
                </div>
                <div className='col-sm-6 text-center'>
                  {allowance > 0 ?
                    (<button
                      type='button'
                      className='btn btn-inverse-success mr-5'
                      onClick={handleSubmit}
                    >
                      Create Franchise
                    </button>)
                    :
                    (<button
                      type='button'
                      className='btn btn-inverse-success mr-5'
                      onClick={onClickApprove}
                    >
                      Approve
                    </button>)}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

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
                    href={`https://testnet.bscscan.com/tx/${tx}`}
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

export default CreateModal;
