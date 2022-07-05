/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { Form, Spinner, Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';
import confirm from '../../../assets/data/21052-checking.json';
import spinner from '../../../assets/data/28434-fc-spinner.json';
import Web3 from 'web3';

import CompaniesTypes from '../../../assets/data/companies-types';
import LottieConf from './lottie-animation';
import { toastSuccessParams } from '../../../assets/data/toast-params';
import { toastErrorParams } from '../../../assets/data/toast-params';
import { getCoinbase, getAllowance, approve } from '../../../functions/Utility/cityInvestTokenContract';
import { createFranchise } from '../../../functions/Utility/metaFranchisesContract';

export const CreateFranchiseForm = ({ balance, companyId }) => {
  const [types, setTypes] = useState(
    CompaniesTypes.filter((element) => {
      if (element.locations.includes(0)) return element;
    })
  );
  const [continent, setContinent] = useState(0);
  const [type, setType] = useState(
    CompaniesTypes.filter((element) => {
      if (element.locations.includes(0)) return element;
    })[0].id
  );
  const [isOpen, setIsOpen] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [tx, setTx] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [allowance, setAllowance] = useState(0);
  const [spinnerApprove, setSpinnerApprove] = useState(false);
  const [spinnerCreate, setSpinnerCreate] = useState(false);



  getCoinbase().then(address => {
    setWalletAddress(address)
    if (walletAddress !== '') {
      getAllowance(walletAddress).then(
        balance2 => {
          setAllowance(Web3.utils.fromWei(
            balance2.toString(),
            'ether'
          ));
        }
      );
    }
  })

  const onClickApprove = _ => {
    setSpinnerApprove(true);
    approve(walletAddress).then(
      () => {
        toast.success(
          'Congratulations! Approve spend successfully.',
          toastSuccessParams
        );
        setAllowance(1)
        setSpinnerApprove(false)
      }
    )
  }

  const handleSubmit = _ => {
    if (balance > 10) {
      if (continent !== '' && type !== '') {
        setSpinnerCreate(true)
        setIsOpen(true);
        createFranchise(walletAddress, companyId, continent, parseInt(type) + 1).then(r => {
          setShowSpinner(false);
          setShowConfirm(true);
          setTx(r.blockHash);
          toast.success(
            'Congratulations! Franchise created successfully.',
            toastSuccessParams
          );
          setSpinnerCreate(false)
        }).catch((error) => {
          console.log(error)
          setIsOpen(false);
          setSpinnerCreate(false);
          toast.error('Unable to create your franchise.', toastErrorParams);
        });
      } else {
        toast.error('Unable to create your franchise.', toastErrorParams);
      }
    } else {
      toast.error('Insufficient amount of tokens, do you need 10 $TOKENS.', toastErrorParams);
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
      <div className='card'>
        <div className='card-body create-form'>
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
              <label htmlFor='type'>Franchise Type</label>
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
              {allowance == 0 &&
                (<button
                  // disabled={dis}
                  type='button'
                  className='btn btn-inverse-success mr-5'
                  onClick={onClickApprove}
                  disabled={spinnerApprove}
                >
                  {spinnerApprove && (<Spinner className="mr-1" animation="border" variant="success" />)}
                  Approve
                </button>)}
            </div>
            <div className='col-sm-6 text-center'>
              {allowance > 0 ?
                (<button
                  type='button'
                  className='btn btn-inverse-success mr-5'
                  onClick={handleSubmit}
                >
                  {spinnerCreate && (<Spinner className="mr-1" animation="border" variant="success" />)}
                  Create Franchise
                </button>)
                :
                (<button
                  // disabled={dis}
                  type='button'
                  className='btn btn-inverse-success mr-5'
                  disabled
                >
                  Create Franchise
                </button>)}
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
                  <p>Creating the franchise</p>
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

export default CreateFranchiseForm;
