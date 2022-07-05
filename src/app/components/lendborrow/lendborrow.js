import React from 'react';

export const LendBorrow = () => {

  return (
    <div>
      <div className='row mt-4'>
        <div className='col-6'>
          <h4 className='card-title'>Assets to supply</h4>
          <div className='row mt-4'>
            <div className='col-12 grid-margin'>
              <div className='card'>
                <div className='card-body'>
                  <div className='table-responsive'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th>CEO</th>
                          <th> Total earned </th>
                          <th> Workers </th>
                          <th> Followers </th>
                          <th> Start Date </th>
                          <th> Payment Status </th>
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
                              <span className='pl-2'>0x221A...e6F8</span>
                            </div>
                          </td>
                          <td> $14,500 </td>
                          <td> 76 </td>
                          <td> 54 </td>
                          <td> 04 Dec 2019 </td>
                          <td>
                            <div className='badge badge-outline-success'>
                              Approved
                            </div>
                          </td>
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
                              <span className='pl-2'>0x451A...e6G1</span>
                            </div>
                          </td>
                          <td> $14,500 </td>
                          <td> 678 </td>
                          <td> 10 </td>
                          <td> 10 Jun 2022 </td>
                          <td>
                            <div className='badge badge-outline-warning'>
                              Pending
                            </div>
                          </td>
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
                              <span className='pl-2'>0xb42A...e18g</span>
                            </div>
                          </td>
                          <td> $14,500 </td>
                          <td> 474 </td>
                          <td> 25 </td>
                          <td> 09 Jun 2022 </td>
                          <td>
                            <div className='badge badge-outline-warning'>
                              Pending
                            </div>
                          </td>
                          <td>
                            <div className='badge badge-outline-warning'>
                              Pending
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

        <div className='col-6'>
          <h4 className='card-title'>Assets to borrow</h4>
          <div className='row mt-4'>
            <div className='col-12 grid-margin'>
              <div className='card'>
                <div className='card-body'>
                  <div className='table-responsive'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th>CEO</th>
                          <th> Total earned </th>
                          <th> Workers </th>
                          <th> Followers </th>
                          <th> Start Date </th>
                          <th> Payment Status </th>
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
                              <span className='pl-2'>0x221A...e6F8</span>
                            </div>
                          </td>
                          <td> $14,500 </td>
                          <td> 76 </td>
                          <td> 54 </td>
                          <td> 04 Dec 2019 </td>
                          <td>
                            <div className='badge badge-outline-success'>
                              Approved
                            </div>
                          </td>
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
                              <span className='pl-2'>0x451A...e6G1</span>
                            </div>
                          </td>
                          <td> $14,500 </td>
                          <td> 678 </td>
                          <td> 10 </td>
                          <td> 10 Jun 2022 </td>
                          <td>
                            <div className='badge badge-outline-warning'>
                              Pending
                            </div>
                          </td>
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
                              <span className='pl-2'>0xb42A...e18g</span>
                            </div>
                          </td>
                          <td> $14,500 </td>
                          <td> 474 </td>
                          <td> 25 </td>
                          <td> 09 Jun 2022 </td>
                          <td>
                            <div className='badge badge-outline-warning'>
                              Pending
                            </div>
                          </td>
                          <td>
                            <div className='badge badge-outline-warning'>
                              Pending
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
      </div>
    </div>
  );
}

export default LendBorrow;