import React, { useState } from 'react';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Form, Modal } from 'react-bootstrap';
import Web3 from 'web3';

import { Line, Polar, Bar } from 'react-chartjs-2';

import { data, options, areaData, areaOptions, PolarAreaData, doughnutPieOptions } from '../../../assets/data/charts-data';
import { hireWorker, sellShare, burnShare, getFranchiseValue, createFranchiseUsingBNB } from '../../../functions/Utility/metaFranchisesContract';

function InfoModal({ company, walletAddress }) {
   const [show, setShow] = useState(false);
   const [showWorker, setShowWorker] = useState(false);
   const [workerCount, setWorkerCount] = useState(1);
   const [value, setValue] = useState(0);
   const [shares, setShares] = useState(100);
   const [worker, setWorker] = useState(0);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const renderTooltip = (props) => (
      <Tooltip id='button-tooltip' {...props}>
         Simple tooltip
      </Tooltip>
   );

   getFranchiseValue().then(res => {
      setValue(Web3.utils.fromWei(
         res.toString(),
         'ether'
       ))
   })

   const subCount = () => {
      if (workerCount !== 1) setWorkerCount(workerCount - 1)
   }

   const onClickClaim = () => {
      createFranchiseUsingBNB(walletAddress);
   }

   const burnShares = () => {
      if (shares > 0) {
         burnShare(1,0,walletAddress).then(() => {
            setShares(shares - 1)
         })
      }
   }

   const onClickSellShare = () => {
      if (shares > 0) {
         sellShare(1,0,walletAddress).then(() => {
            setShares(shares - 1)
         })
      }
   }

   const onClickHireWorker = () => {
      if (worker < 10) {
         setWorker(worker + 1)
         hireWorker(1,0,walletAddress).then(res => {
            console.log(res)
         })
      }
   }

   return (
      <>
         {/* <OverlayTrigger
            placement='top'
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
         > */}
            <button className='show-btn' onClick={handleShow}>
               <span className='menu-icon'></span><i className='mdi mdi-eye'></i>
            </button>
         {/* </OverlayTrigger> */}


         <Modal size='lg' show={show} backdrop='static' onHide={handleClose} animation={true} dialogClassName='modal-90w' aria-labelledby='example-custom-modal-styling-title'>
            <Modal.Body>
               <div className='card'>
                  <div className='card-body company-info'>
                     <button className='close btn-icon p-2' onClick={handleClose}>
                        <span>x</span>
                     </button>
                     <div className='row mt'>
                        <div className='col-sm-4 grid-margin'>
                           <div className='card'>
                              <div className='card-body'>
                                 <h5>24h Earnings</h5>
                                 <div className='row'>
                                    <div className='col-8 col-sm-12 col-xl-8 my-auto'>
                                       <div className='d-flex d-sm-block d-md-flex align-items-center'>
                                          <h2 className='mb-0'>$32123</h2>
                                          <p className='text-success ml-2 mb-0 font-weight-medium'>+3.5%</p>
                                       </div>
                                       <h6 className='text-muted font-weight-normal'>11.38% Since last month</h6>
                                    </div>
                                    <div className='col-4 col-sm-12 col-xl-4 text-center text-xl-right'>
                                       <i className='icon-lg mdi mdi-codepen text-primary ml-auto'></i>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className='col-sm-4 grid-margin'>
                           <div className='card'>
                              <div className='card-body'>
                                 <h5>24h Earnings</h5>
                                 <div className='row'>
                                    <div className='col-8 col-sm-12 col-xl-8 my-auto'>
                                       <div className='d-flex d-sm-block d-md-flex align-items-center'>
                                          <h2 className='mb-0'>$45850</h2>
                                          <p className='text-success ml-2 mb-0 font-weight-medium'>+8.3%</p>
                                       </div>
                                       <h6 className='text-muted font-weight-normal'> 9.61% Since last month</h6>
                                    </div>
                                    <div className='col-4 col-sm-12 col-xl-4 text-center text-xl-right'>
                                       <i className='icon-lg mdi mdi-wallet-travel text-danger ml-auto'></i>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className='col-sm-4 grid-margin'>
                           <div className='card'>
                              <div className='card-body'>
                                 <h5>Purchase</h5>
                                 <div className='row'>
                                    <div className='col-8 col-sm-12 col-xl-8 my-auto'>
                                       <div className='d-flex d-sm-block d-md-flex align-items-center'>
                                          <h2 className='mb-0'>${value}</h2>
                                          <p className='text-danger ml-2 mb-0 font-weight-medium'>-2.1% </p>
                                       </div>
                                       <h6 className='text-muted font-weight-normal'>2.27% Since last month</h6>
                                    </div>
                                    <div className='col-4 col-sm-12 col-xl-4 text-center text-xl-right'>
                                       <i className='icon-lg mdi mdi-monitor text-success ml-auto'></i>
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
                                 <div className='row'>
                                    <div className='col-sm-4 grid-margin'>
                                       <h4 className='card-title'>Earnings</h4>
                                       <Line data={data} options={options} />
                                    </div>
                                    <div className='col-sm-4 grid-margin'>
                                       <div className='row'>
                                          <div className='col-12 col-sm-12 my-auto d-flex flex-column align-items-center'>
                                             <h4 className='card-title'>Company Status</h4>
                                             <img src={require('../../../assets/images/dashboard/Rectangle.jpg')} alt='carousel-item' />
                                             <div className='row w-100'>
                                                <div className='col-12 col-sm-12 col-xl-11 my-auto'>
                                                   <div className='d-flex align-items-center justify-content-between'>
                                                      <p className='card-description mr-2'> Technology </p>
                                                      <div className='progress progress-md portfolio-progress'>
                                                         <div className='progress-bar-striped bg-success' role='progressbar' style={{ width: `${company.value + 3}%` }} aria-valuenow={company.value} aria-valuemin='0' aria-valuemax='100'></div>
                                                      </div>
                                                   </div>
                                                   <div className='d-flex align-items-center justify-content-between'>
                                                      <p className='card-description mr-3'> Human Resources </p>
                                                      <div className='progress progress-md portfolio-progress'>
                                                         <div className='progress-bar-striped bg-success' role='progressbar' style={{ width: `${worker*10}%` }} aria-valuenow={worker*10} aria-valuemin='0' aria-valuemax='100'>
                                                            <span>{worker}/10</span>
                                                         </div>
                                                      </div>
                                                   </div>
                                                   <div className='d-flex align-items-center justify-content-between'>
                                                      <p className='card-description'> Shares </p>
                                                      <div className='progress progress-md portfolio-progress'>
                                                         <div className='progress-bar-striped bg-warning' role='progressbar' style={{ width: `${shares}%` }} aria-valuenow={shares} aria-valuemin='0' aria-valuemax='100'>
                                                            <span>{shares}/100</span>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    <div className='col-sm-4 grid-margin'>
                                       <div>
                                          <div>
                                             <h4 className='card-title'>Resources Distribution</h4>
                                             <Bar data={data} options={options} />
                                          </div>
                                          <div className='row mt-4'>
                                             <div className='col-12 col-sm-12 my-auto'>
                                                <div className='d-flex d-sm-block d-md-flex align-items-center'>
                                                   <button
                                                      type='button'
                                                      onClick={onClickHireWorker}
                                                      className='btn btn-inverse-info mr-1'>
                                                      Hire
                                                   </button>
                                                   <button
                                                      type='button'
                                                      onClick={onClickClaim}
                                                      className='btn btn-inverse-info mr-1'>
                                                      Transfer Franchise
                                                   </button>
                                                   <button
                                                      type='button'
                                                      onClick={onClickClaim}
                                                      className='btn btn-inverse-info mr-1'>
                                                      Pay Maintenance
                                                   </button>
                                                </div>
                                             </div>
                                             <div className='col-12 col-sm-12 mt-2'>
                                                <div className='d-flex d-sm-block d-md-flex align-items-center'>
                                                   <button
                                                      type='button'
                                                      onClick={onClickSellShare}
                                                      className='btn btn-inverse-info mr-1'>
                                                      Sell Share
                                                   </button>
                                                   <button
                                                      type='button'
                                                      onClick={burnShares}
                                                      className='btn btn-inverse-info mr-1'>
                                                      Burn Share
                                                   </button>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* <div className='row mt-4'>
                        <div className='col-md-12 grid-margin justify-center'>
                           <h2>Resume</h2>
                        </div>
                     </div> */}

                     {/* <div className='row mt-1'>
                        <div className='col-md-12 grid-margin justify-center'>
                           <h2>Company Statistics</h2>
                        </div>
                     </div> */}
                     {/* <div className='row mt-1'>
                        <div className='col-md-3 grid-margin stretch-card'>
                           <div className='card'>
                              <div className='card-body'>
                                 <h4 className='card-title'>Earnings</h4>
                                 <Line data={data} options={options} />
                              </div>
                           </div>
                        </div>
                        <div className='col-md-3 grid-margin stretch-card'>
                           <div className='card'>
                              <div className='card-body'>
                                 <h4 className='card-title'>Company resources</h4>
                                 <Bar data={data} options={options} />
                              </div>
                           </div>
                        </div>
                        <div className='col-md-3 grid-margin stretch-card'>
                           <div className='card'>
                              <div className='card-body'>
                                 <h4 className='card-title'>Area Chart</h4>
                                 <Line data={areaData} options={areaOptions} />
                              </div>
                           </div>
                        </div>
                        <div className='col-md-3 grid-margin stretch-card'>
                           <div className='card'>
                              <div className='card-body'>
                                 <h4 className='card-title'>Polar</h4>
                                 <Polar data={PolarAreaData} options={doughnutPieOptions} />
                              </div>
                           </div>
                        </div>
                     </div> */}
                  </div>
               </div>

            </Modal.Body>
         </Modal>
         <Modal dialogClassName='create' show={showWorker} animation={true} centered>

            <Modal.Body>
               <div className='card'>
                  <div className='card-body'>
                     <button className='close btn-icon p-2' onClick={() => setShowWorker(false)}>
                        <span>x</span>
                     </button>
                     <form className='forms-sample'>
                        <Form.Group>
                           <label htmlFor='Workers'>Workers</label>
                           <Form.Control
                              type='text'
                              id='workers'
                              //onChange={({ target }) => setName(target.value)}
                              placeholder='Worker number'
                              required
                           />
                        </Form.Group>
                        <div className="modal_buttons">
                           <button
                              className="btn minus"
                              onClick={subCount}
                           >
                              <i className='mdi mdi-minus-circle'></i>
                           </button>

                           <button
                              className="btn plus"
                              onClick={() => setWorkerCount(workerCount + 1)}
                           >
                              <i className='mdi mdi-plus-circle'></i>
                           </button>
                        </div>
                     </form>

                     <div className='row'>
                        <div className='col-sm-6 text-center'>
                           <button
                              type='button'
                              onClick={() => setShowWorker(false)}
                              className='btn btn-inverse-danger pl-5 pr-5'
                           >
                              Cancel
                           </button>
                        </div>
                        <div className='col-sm-6 text-center'>
                           <button
                              type='button'
                              className='btn btn-inverse-success mr-5'
                           // onClick={onClickApprove}
                           >
                              Approve
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </Modal.Body>
         </Modal>
      </>
   );
}

export default InfoModal;