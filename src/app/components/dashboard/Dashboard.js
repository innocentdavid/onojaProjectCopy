/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { VectorMap } from 'react-jvectormap';
import { Stepper, Step } from 'react-form-stepper';
import { Line, Doughnut } from 'react-chartjs-2';
import { Spinner } from 'react-bootstrap';
import Web3 from 'web3';
import toast from 'react-hot-toast';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  tokenBalanceChartData,
  areaData,
  areaOptions,
  doughnutPieData,
  doughnutPieOptions,
} from '../../../assets/data/charts-data';
import { getCoinbase, balanceOf, getTokenValue } from '../../../functions/Utility/cityInvestTokenContract';
import { isCeo, getCompanyId } from '../../../functions/Utility/metaStocksContract';
import { getContract, getFranchisesContinet } from '../../../functions/Utility/metaFranchisesContract';
import CreateCompanyForm from '../modals/CreateCompanyForm';
import CreateFranchiseForm from '../modals/CreateFranchiseForm';
import { toastSuccessParams, toastErrorParams } from '../../../assets/data/toast-params';


const mapData = {
  BZ: 75.0,
  US: 56.25,
  AU: 15.45,
  GB: 25.0,
  RO: 10.25,
  GE: 33.25,
};

const stepPages = [CreateCompanyForm, CreateCompanyForm];


export const Dashboard = () => {

  const [tokenBalance, setTokenBalance] = useState(0);
  const [walletAddress, setWalletAddress] = useState('');
  const [franchisesContinet, setFranchisesContinet] = useState(false);
  const [isCeoCompany, setIsCeoCompany] = useState(false);
  const [companyId, setCompanyId] = useState(false);
  const [step, setStep] = useState(0);
  const [tokenValue, setTokenValue] = useState(0);
  const [pieSpinner, setPieSpinner] = useState(false);

  getFranchisesContinet().then(res => {
    doughnutPieData.datasets[0].data = res;
    setFranchisesContinet(true)
    setPieSpinner(true)
  })

  getCoinbase().then(address => {
    setWalletAddress(address)
    if (walletAddress !== '') {
      balanceOf(walletAddress).then(balance => {
        setTokenBalance(Web3.utils.fromWei(
          balance.toString(),
          'ether'
        ));
      });
      isCeo(walletAddress).then(ceo => {
        setIsCeoCompany(ceo)
        setStep(ceo ? 1 : 0)
      })
      getCompanyId(walletAddress).then(id => {
        setCompanyId(id)
      })
    }
  })

  return (
    <div>
      <div className='row'>
        <div className='col-12 grid-margin'>
          <div className='card dashboardMainBackground'>
            <div className='card-body'>
              <div className='row'>
                <div className="col-md-12 col-sm-12 col-xs-12 mx-auto">
                  <Slider
                    dots={false}
                    infinite={true}
                    arrows={false}
                    // nextArrow={<CustomArrow type={'next'}/>}
                    // prevArrow={<CustomArrow type={'prev'} />}
                    autoplay={true}
                    speed={500}
                    slidesToShow={10}
                    slidesToScroll={1}
                    responsive={[
                      {
                        breakpoint: 1400,
                        settings: {
                          slidesToShow: 8,
                          slidesToScroll: 1,
                        },
                      },
                      {
                        breakpoint: 1200,
                        settings: {
                          slidesToShow: 6,
                          slidesToScroll: 1,
                        },
                      },
                      {
                        breakpoint: 1000,
                        settings: {
                          slidesToShow: 6,
                          slidesToScroll: 1,
                        },
                      },
                      {
                        breakpoint: 768,
                        settings: {
                          slidesToShow: 5,
                          slidesToScroll: 1,
                        },
                      },
                      {
                        breakpoint: 500,
                        settings: {
                          slidesToShow: 3,
                          slidesToScroll: 1,
                        },
                      },
                      {
                        breakpoint: 200,
                        settings: {
                          slidesToShow: 1,
                          slidesToScroll: 1,
                        },
                      }
                    ]}
                  >
                    <div className="text-center">
                      <div className="ceo-slider-item">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <div className='glow-on-hover-img'>
                            <img
                              className="border-r24"
                              loading="lazy"
                              width={100}
                              height={100}
                              src={require('../../../assets/images/faces/face1.jpg')}
                              alt="dev"
                            />
                          </div>
                          <div>Seo 1</div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="ceo-slider-item">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <div className='glow-on-hover-img'>
                            <img
                              className="border-r24"
                              loading="lazy"
                              width={100}
                              height={100}
                              src={require('../../../assets/images/faces/face1.jpg')}
                              alt="dev"
                            />
                          </div>
                          <div>Seo 1</div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="ceo-slider-item">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <div className='glow-on-hover-img'>
                            <img
                              className="border-r24"
                              loading="lazy"
                              width={100}
                              height={100}
                              src={require('../../../assets/images/faces/face1.jpg')}
                              alt="dev"
                            />
                          </div>
                          <div>Seo 1</div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="ceo-slider-item">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <div className='glow-on-hover-img'>
                            <img
                              className="border-r24"
                              loading="lazy"
                              width={100}
                              height={100}
                              src={require('../../../assets/images/faces/face1.jpg')}
                              alt="dev"
                            />
                          </div>
                          <div>Seo 1</div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="ceo-slider-item">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <div className='glow-on-hover-img'>
                            <img
                              className="border-r24"
                              loading="lazy"
                              width={100}
                              height={100}
                              src={require('../../../assets/images/faces/face1.jpg')}
                              alt="dev"
                            />
                          </div>
                          <div>Seo 1</div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="ceo-slider-item">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <div className='glow-on-hover-img'>
                            <img
                              className="border-r24"
                              loading="lazy"
                              width={100}
                              height={100}
                              src={require('../../../assets/images/faces/face1.jpg')}
                              alt="dev"
                            />
                          </div>
                          <div>Seo 1</div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="ceo-slider-item">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <div className='glow-on-hover-img'>
                            <img
                              className="border-r24"
                              loading="lazy"
                              width={100}
                              height={100}
                              src={require('../../../assets/images/faces/face1.jpg')}
                              alt="dev"
                            />
                          </div>
                          <div>Seo 1</div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="ceo-slider-item">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <div className='glow-on-hover-img'>
                            <img
                              className="border-r24"
                              loading="lazy"
                              width={100}
                              height={100}
                              src={require('../../../assets/images/faces/face1.jpg')}
                              alt="dev"
                            />
                          </div>
                          <div>Seo 1</div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="ceo-slider-item">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <div className='glow-on-hover-img'>
                            <img
                              className="border-r24"
                              loading="lazy"
                              width={100}
                              height={100}
                              src={require('../../../assets/images/faces/face1.jpg')}
                              alt="dev"
                            />
                          </div>
                          <div>Seo 1</div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="ceo-slider-item">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <div className='glow-on-hover-img'>
                            <img
                              className="border-r24"
                              loading="lazy"
                              width={100}
                              height={100}
                              src={require('../../../assets/images/faces/face1.jpg')}
                              alt="dev"
                            />
                          </div>
                          <div>Seo 1</div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="ceo-slider-item">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <div className='glow-on-hover-img'>
                            <img
                              className="border-r24"
                              loading="lazy"
                              width={100}
                              height={100}
                              src={require('../../../assets/images/faces/face1.jpg')}
                              alt="dev"
                            />
                          </div>
                          <div>Seo 1</div>
                        </div>
                      </div>
                    </div>
                  </Slider>
                </div>

                <div className='col-sm-4 mt-4 mx-auto glass'>
                  <p className='mt-4'>
                    In the MetaStocks metaverse, ceo's can create their companies in different parts of the world. With their companies they can generate income, companies have a creation cost, a maintenance cost and generate daily profits. and generate daily profits. When creating a company they receive receive a unique nft, with the company's properties, which assigns the company's ownership which assigns the ownership of the company to the nft holder. of the nft.
                  </p>
                  <p>Create Company Price: 10 $Token</p>
                  <p>Daily Company Earnings 0.1$ Token</p>
                  <p>Daily Company Expenses 0.01$ Token</p>
                  <p>Withdraw Company Earnings Fees 0.1$ Token</p>

                  <CreateCompanyForm setStep={setStep} />

                </div>







              </div>


            </div>

          </div>
          {/* <div className="col-md-12 col-sm-12 col-xs-12 mx-auto">
            <Slider
              dots={false}
              infinite={true}
              arrows={false}
              // nextArrow={<CustomArrow type={'next'}/>}
              // prevArrow={<CustomArrow type={'prev'} />}
              autoplay={true}
              speed={500}
              slidesToShow={4}
              slidesToScroll={1}
              responsive={[
                {
                  breakpoint: 1400,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 200,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                }
              ]}
            >
              <div className="text-center">
                <div className="ceo-slider-item">
                  <div className='glow-on-hover-card'>
                    <div className='card-body'>
                      <h5>Token Price</h5>
                      <div className='row'>
                        <div className='col-8 col-sm-12 col-xl-8 my-auto'>
                          <div className='d-flex d-sm-block d-md-flex align-items-center'>
                            <h2 className='mb-0'>{tokenValue} $</h2>
                            <p className='text-success ml-2 mb-0 font-weight-medium'>+3.5%</p>
                          </div>
                          <h6 className='text-muted font-weight-normal'>11.38% Since last month</h6>
                        </div>
                        <div className='col-4 col-sm-12 col-xl-4 text-center text-xl-right'>
                          <i className='icon-lg mdi mdi-cash-usd text-primary ml-auto'></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="ceo-slider-item">
                  <div className='glow-on-hover-card'>
                    <div className='card-body'>
                      <h5>Token Price</h5>
                      <div className='row'>
                        <div className='col-8 col-sm-12 col-xl-8 my-auto'>
                          <div className='d-flex d-sm-block d-md-flex align-items-center'>
                            <h2 className='mb-0'>{tokenValue} $</h2>
                            <p className='text-success ml-2 mb-0 font-weight-medium'>+3.5%</p>
                          </div>
                          <h6 className='text-muted font-weight-normal'>11.38% Since last month</h6>
                        </div>
                        <div className='col-4 col-sm-12 col-xl-4 text-center text-xl-right'>
                          <i className='icon-lg mdi mdi-cash-usd text-primary ml-auto'></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="ceo-slider-item">
                  <div className='glow-on-hover-card'>
                    <div className='card-body'>
                      <h5>Token Price</h5>
                      <div className='row'>
                        <div className='col-8 col-sm-12 col-xl-8 my-auto'>
                          <div className='d-flex d-sm-block d-md-flex align-items-center'>
                            <h2 className='mb-0'>{tokenValue} $</h2>
                            <p className='text-success ml-2 mb-0 font-weight-medium'>+3.5%</p>
                          </div>
                          <h6 className='text-muted font-weight-normal'>11.38% Since last month</h6>
                        </div>
                        <div className='col-4 col-sm-12 col-xl-4 text-center text-xl-right'>
                          <i className='icon-lg mdi mdi-cash-usd text-primary ml-auto'></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="ceo-slider-item">
                  <div className='glow-on-hover-card'>
                    <div className='card-body'>
                      <h5>Token Price</h5>
                      <div className='row'>
                        <div className='col-8 col-sm-12 col-xl-8 my-auto'>
                          <div className='d-flex d-sm-block d-md-flex align-items-center'>
                            <h2 className='mb-0'>{tokenValue} $</h2>
                            <p className='text-success ml-2 mb-0 font-weight-medium'>+3.5%</p>
                          </div>
                          <h6 className='text-muted font-weight-normal'>11.38% Since last month</h6>
                        </div>
                        <div className='col-4 col-sm-12 col-xl-4 text-center text-xl-right'>
                          <i className='icon-lg mdi mdi-cash-usd text-primary ml-auto'></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="ceo-slider-item">
                  <div className='glow-on-hover-card'>
                    <div className='card-body'>
                      <h5>Token Price</h5>
                      <div className='row'>
                        <div className='col-8 col-sm-12 col-xl-8 my-auto'>
                          <div className='d-flex d-sm-block d-md-flex align-items-center'>
                            <h2 className='mb-0'>{tokenValue} $</h2>
                            <p className='text-success ml-2 mb-0 font-weight-medium'>+3.5%</p>
                          </div>
                          <h6 className='text-muted font-weight-normal'>11.38% Since last month</h6>
                        </div>
                        <div className='col-4 col-sm-12 col-xl-4 text-center text-xl-right'>
                          <i className='icon-lg mdi mdi-cash-usd text-primary ml-auto'></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="ceo-slider-item">
                  <div className='glow-on-hover-card'>
                    <div className='card-body'>
                      <h5>Token Price</h5>
                      <div className='row'>
                        <div className='col-8 col-sm-12 col-xl-8 my-auto'>
                          <div className='d-flex d-sm-block d-md-flex align-items-center'>
                            <h2 className='mb-0'>{tokenValue} $</h2>
                            <p className='text-success ml-2 mb-0 font-weight-medium'>+3.5%</p>
                          </div>
                          <h6 className='text-muted font-weight-normal'>11.38% Since last month</h6>
                        </div>
                        <div className='col-4 col-sm-12 col-xl-4 text-center text-xl-right'>
                          <i className='icon-lg mdi mdi-cash-usd text-primary ml-auto'></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="ceo-slider-item">
                  <div className='glow-on-hover-card'>
                    <div className='card-body'>
                      <h5>Token Price</h5>
                      <div className='row'>
                        <div className='col-8 col-sm-12 col-xl-8 my-auto'>
                          <div className='d-flex d-sm-block d-md-flex align-items-center'>
                            <h2 className='mb-0'>{tokenValue} $</h2>
                            <p className='text-success ml-2 mb-0 font-weight-medium'>+3.5%</p>
                          </div>
                          <h6 className='text-muted font-weight-normal'>11.38% Since last month</h6>
                        </div>
                        <div className='col-4 col-sm-12 col-xl-4 text-center text-xl-right'>
                          <i className='icon-lg mdi mdi-cash-usd text-primary ml-auto'></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div> */}
        </div>

      </div>

      {/* <div className='row mt-3'>
        <div className='col-12 grid-margin'>
          <div className='card '>
            <div className='card-body'>
              <div className='row'>
                <div className='col-md-6 grid-margin '>
                  <div>
                    <div>
                      <div className='d-flex align-items-center align-self-start'>
                        <h3 className='mb-0'>$TOKEN {tokenBalance}</h3>
                        <p className='text-success ml-2 mb-0 font-weight-medium'>
                          +.5%
                        </p>
                        <div className='col-6'>
                          <div className='icon icon-box-success '>
                            <span className='mdi mdi-arrow-top-right icon-item'></span>
                          </div>
                        </div>
                      </div>
                      <Line data={areaData} options={areaOptions} />
                    </div>
                  </div>
                </div>

                <div className='col-lg-6 col-md-6 col-sm-6'>
                  <div className='d-flex align-items-center align-self-start'>
                    <h4 className='mb-2'>Companies by Countries</h4>
                  </div>
                  {!pieSpinner && (<div className='d-flex justify-content-center align-items-center pie-country'>
                    <Spinner className='spinner-country' animation="border" variant="success" />
                  </div>)}
                  {franchisesContinet && pieSpinner && (<Doughnut
                    data={doughnutPieData}
                    options={doughnutPieOptions}
                  />)}
                </div>
              </div>
            </div>
          </div>
          <div>
          </div>
        </div>
        <div className='col-12 grid-margin'>
          <div className='card '>
            <div className='card-body'>
              <div className='row'>
                <div id='audience-map' className='vector-map'></div>

                <VectorMap
                  map={'world_mill'}
                  backgroundColor='transparent' //change it to ocean blue: #0077be
                  panOnDrag={true}
                  containerClassName='dashboard-vector-map'
                  focusOn={{
                    x: 0.5,
                    y: 0.5,
                    scale: 1,
                    animate: true,
                  }}
                  series={{
                    regions: [
                      {
                        scale: ['#3d3c3c', '#f2f2f2'],
                        normalizeFunction: 'polynomial',
                        values: mapData,
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </div>
          <div>
          </div>
        </div>
      </div> */}




      <h4 className='card-title mt-3'>Companies Ranking</h4>
      <div className='row mt-1'>
        <div className='col-12 grid-margin'>
          <div className='card'>
            <div className='card-body'>
              <h4 className='card-title'>Best Companies</h4>
              <div className='table-responsive'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th> Client Name </th>
                      <th> Order No </th>
                      <th> Product Cost </th>
                      <th> Project </th>
                      <th> Payment Mode </th>
                      <th> Start Date </th>
                      <th> Payment Status </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className='d-flex'>
                          <img
                            src={require('../../../assets/images/faces/face1.jpg')}
                            alt='face'
                          />
                          <span className='pl-2'>Henry Klein</span>
                        </div>
                      </td>
                      <td> 02312 </td>
                      <td> $14,500 </td>
                      <td> Dashboard </td>
                      <td> Credit card </td>
                      <td> 04 Dec 2019 </td>
                      <td>
                        <div className='badge badge-outline-success'>
                          Approved
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className='d-flex'>
                          <img
                            src={require('../../../assets/images/faces/face2.jpg')}
                            alt='face'
                          />
                          <span className='pl-2'>Estella Bryan</span>
                        </div>
                      </td>
                      <td> 02312 </td>
                      <td> $14,500 </td>
                      <td> Website </td>
                      <td> Cash on delivered </td>
                      <td> 04 Dec 2019 </td>
                      <td>
                        <div className='badge badge-outline-warning'>
                          Pending
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className='d-flex'>
                          <img
                            src={require('../../../assets/images/faces/face5.jpg')}
                            alt='face'
                          />
                          <span className='pl-2'>Lucy Abbott</span>
                        </div>
                      </td>
                      <td> 02312 </td>
                      <td> $14,500 </td>
                      <td> App design </td>
                      <td> Credit card </td>
                      <td> 04 Dec 2019 </td>
                      <td>
                        <div className='badge badge-outline-danger'>
                          Rejected
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className='d-flex'>
                          <img
                            src={require('../../../assets/images/faces/face3.jpg')}
                            alt='face'
                          />
                          <span className='pl-2'>Peter Gill</span>
                        </div>
                      </td>
                      <td> 02312 </td>
                      <td> $14,500 </td>
                      <td> Development </td>
                      <td> Online Payment </td>
                      <td> 04 Dec 2019 </td>
                      <td>
                        <div className='badge badge-outline-success'>
                          Approved
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className='d-flex'>
                          <img
                            src={require('../../../assets/images/faces/face4.jpg')}
                            alt='face'
                          />
                          <span className='pl-2'>Sallie Reyes</span>
                        </div>
                      </td>
                      <td> 02312 </td>
                      <td> $14,500 </td>
                      <td> Website </td>
                      <td> Credit card </td>
                      <td> 04 Dec 2019 </td>
                      <td>
                        <div className='badge badge-outline-success'>
                          Approved
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;