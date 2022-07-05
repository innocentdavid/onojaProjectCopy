import React, { Component } from 'react';
// import { Trans } from 'react-i18next';
class Footer extends Component {
  render () {
    const year = new Date().getFullYear();
    return (
      <footer className='footer mb-4'>
        <div className='container-fluid'>
          <div className='d-sm-flex justify-content-center justify-content-sm-between py-2 w-100'>
            <span className='text-muted text-center text-sm-left d-block d-sm-inline-block'>Copyright © MetaStocks {year}</span>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;