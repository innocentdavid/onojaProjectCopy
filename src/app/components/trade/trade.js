import React, { useState } from 'react';

import sampleDataSource from '../../../assets/data/trade-data';

export const TradeView = () => {
  const [sampleData, setSampleData] = useState(sampleDataSource);

  const onClickClaim = () => {
    const newData = {
      id: sampleData.length,
      comp: 'BP',
      earned: 1600,
      worker: 56,
      date: '11-06-2022',
      status: 0
    }
    setSampleData([...sampleData, newData])
  }

  return (
    <>
      <div className='row mt-5'>
        <div className='col-12 col-sm-12 my-auto'>
          <div className='d-flex d-sm-block d-md-flex align-items-center justify-content-center'>
            <button
              type='button'
              onClick={onClickClaim}
              className='btn btn-inverse-info'>
              Insert
            </button>
            <button
              type='button'
              onClick={onClickClaim}
              className='btn btn-inverse-info'>
              Update
            </button>
            <button
              type='button'
              onClick={onClickClaim}
              className='btn btn-inverse-info'>
              Sell Share
            </button>
            <button
              type='button'
              onClick={onClickClaim}
              className='btn btn-inverse-info'>
              Pay Maintenance
            </button>
          </div>
        </div>
        <div className='col-12 grid-margin'>
          <h4 className='card-title'>Orders</h4>
          <div className='row mt-4'>
            <div className='col-12 grid-margin'>
              <div className='card'>
                <div className='card-body'>
                  <div className='table-responsive'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th>CEO</th>
                          <th> Nº Companies</th>
                          <th> Total earned </th>
                          <th> Workers </th>
                          <th> Start Date </th>
                          <th> Payment Status </th>
                        </tr>
                      </thead>
                      <tbody>
                        {sampleData.map((e) => (
                          <tr key={e.id}>
                            <td>
                              <div className='d-flex'>
                                <img
                                  src={require('../../../assets/images/faces/face1.jpg')}
                                  alt='face'
                                />
                                <span className='pl-2'>0x221A...e6F8</span>
                              </div>
                            </td>
                            <td> {e.comp} </td>
                            <td> ${e.earned} </td>
                            <td> {e.worker} </td>
                            <td> {e.date} </td>
                            <td>
                              {e.status === 0
                                ?
                                (
                                  <div className='badge badge-outline-success'>
                                    Approved
                                  </div>
                                )
                                :
                                (
                                  <div className='badge badge-outline-warning'>
                                    Pending
                                  </div>
                                )
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TradeView;