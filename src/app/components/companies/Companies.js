/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Web3 from 'web3';

import { toastSuccessParams, toastErrorParams } from '../../../assets/data/toast-params';
import { getCoinbase } from '../../../functions/Utility/cityInvestTokenContract';
import { getNumberOfFranchises, claimFranchise, getUnclaimedRewards, createFranchiseUsingBNB } from '../../../functions/Utility/metaFranchisesContract';
import { getCompanyId } from '../../../functions/Utility/metaStocksContract';
import InfoModal from '../modals/InfoModal';

import SampleCompanies from '../../../assets/data/companies'

export const Company = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [numberOfFranchises, setNumberOfFranchises] = useState(0);
  const [unclaimedRewards, setUnclaimedRewards] = useState(0);

  const handleMouseOver = _ => {
    setIsHovering(true);
  };

  const handleMouseOut = _ => {
    setIsHovering(false);
  };

  getCoinbase().then(address => {
    setWalletAddress(address)
    if (walletAddress !== '') {
      getCompanyId(walletAddress).then(id => {
        setCompanyId(id)
        getNumberOfFranchises(id).then(num => {
          setNumberOfFranchises(num)
        })
        getUnclaimedRewards(id).then(rewards => {
          setUnclaimedRewards(Web3.utils.fromWei(
            rewards.toString(),
            'ether'
          ))
        })
      })
    }
  })

  const onClickClaim = _ => {
    claimFranchise(companyId, walletAddress).then(_ => {
      toast.success(
        'Congratulations! Claim successfully!.',
        toastSuccessParams
      );
    }).catch(_ => {
      toast.error('Unable to claim your company.', toastErrorParams);
    })
  };

  return (
    <>
      <div className='row mt'>
        <div className='col-sm-4 grid-margin'>
          <div className='card'>
            <div className='card-body'>
              <h5>Number of franchises</h5>
              <div className='row'>
                <div className='col-8 col-sm-12 col-xl-8 my-auto'>
                  <div className='d-flex d-sm-block d-md-flex align-items-center'>
                    <h2 className='mb-0'>{numberOfFranchises}</h2>
                    <p className='text-success ml-2 mb-0 font-weight-medium'>+3.5%</p>
                  </div>
                  <h6 className='text-muted font-weight-normal'>11.38% Since last month</h6>
                </div>
                <div className='col-4 col-sm-12 col-xl-4 text-center text-xl-right'>
                  <i className='icon-lg mdi mdi-sitemap text-primary ml-auto'></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-sm-4 grid-margin'>
          <div className='card'>
            <div className='card-body'>
              <h5>Total generated</h5>
              <div className='row'>
                <div className='col-8 col-sm-12 col-xl-8 my-auto'>
                  <div className='d-flex d-sm-block d-md-flex align-items-center'>
                    <h2 className='mb-0'>${unclaimedRewards}</h2>
                    <p className='text-success ml-2 mb-0 font-weight-medium'>+8.3%</p>
                  </div>
                  <h6 className='text-muted font-weight-normal'> 9.61% Since last month</h6>
                </div>
                <div onClick={onClickClaim} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className='col-4 col-sm-12 col-xl-4 text-center text-xl-right claim'>
                  <i className='icon-lg mdi mdi-cash-usd text-success ml-auto'></i>
                  {isHovering && <p className='claim__btn'>Claim!</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-sm-4 grid-margin'>
          <div className='card'>
            <div className='card-body'>
              <h5>Total spent</h5>
              <div className='row'>
                <div className='col-8 col-sm-12 col-xl-8 my-auto'>
                  <div className='d-flex d-sm-block d-md-flex align-items-center'>
                    <h2 className='mb-0'>$2039</h2>
                    <p className='text-danger ml-2 mb-0 font-weight-medium'>-2.1% </p>
                  </div>
                  <h6 className='text-muted font-weight-normal'>2.27% Since last month</h6>
                </div>
                <div className='col-4 col-sm-12 col-xl-4 text-center text-xl-right'>
                  <i className='icon-lg mdi mdi-fire text-danger ml-auto'></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row mt-1'>
        <div className='col-12 grid-margin'>
          <div className='card'>
            <div className='card-body'>
              <h4 className='card-title'>My Franchises</h4>
              <div className='row'>
                {SampleCompanies.map((com) => (
                  <div className='col-md-3 col-xl-3 grid-margin stretch-card' key={com.id}>
                    <div className='card'>
                      <div className='card-body company container' style={{ backgroundImage: `url(${require('../../../assets/images/dashboard/Rectangle.jpg')})` }}>
                        <div></div>
                        <InfoModal company={com} walletAddress={walletAddress} />
                        <div className='row text-bottom'>
                          <div className='col-md-12 col-xl-12 d-flex align-items-center' >
                            <p>{com.name}</p>
                          </div>
                          <div className='col-md-12 col-xl-12 company-details'>
                            <div>
                              <p>ROI</p>
                            </div>
                            <div className='progress progress-md portfolio-progress'>
                              <div className='progress-bar-striped bg-success' role='progressbar' style={{ width: `${com.value}%` }} aria-valuenow={com.value} aria-valuemin='0' aria-valuemax='100'><span>{com.value}%</span></div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Company;