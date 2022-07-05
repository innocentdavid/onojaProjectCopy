import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse, Dropdown, Tooltip, OverlayTrigger } from 'react-bootstrap';

class Sidebar extends Component {

  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: '/apps', state: 'appsMenuOpen' },
      { path: '/basic-ui', state: 'basicUiMenuOpen' },
      { path: '/form-elements', state: 'formElementsMenuOpen' },
      { path: '/tables', state: 'tablesMenuOpen' },
      { path: '/icons', state: 'iconsMenuOpen' },
      { path: '/charts', state: 'chartsMenuOpen' },
      { path: '/user-pages', state: 'userPagesMenuOpen' },
      { path: '/error-pages', state: 'errorPagesMenuOpen' },
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true })
      }
    }));

  }

  render() {
    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        SOON!
      </Tooltip>
    );
    return (
      <nav className='sidebar sidebar-offcanvas' id='sidebar'>
        <div className='sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top'>
          <a className='sidebar-brand brand-logo' href='index.html'><img src={require('../../../assets/images/logo.svg')} alt='logo' /></a>
          <a className='sidebar-brand brand-logo-mini' href='index.html'><img src={require('../../../assets/images/logo-mini.svg')} alt='logo' /></a>
        </div>
        <ul className='nav'>
          <li className='nav-item profile'>
            <div className='profile-desc'>
              <div className='profile-pic'>
                <div className='count-indicator'>
                  <img className='img-xs rounded-circle ' src={require('../../../assets/images/faces/face15.jpg')} alt='profile' />
                  <span className='count bg-success'></span>
                </div>
                <div className='profile-name'>
                  <h5 className='mb-0 font-weight-normal'>Henry Klein</h5>
                  <span>Gold Member</span>
                </div>
              </div>
              <Dropdown alignRight>
                <Dropdown.Toggle as='a' className='cursor-pointer no-caret'>
                  <i className='mdi mdi-dots-vertical'></i>
                </Dropdown.Toggle>
                <Dropdown.Menu className='sidebar-dropdown preview-list'>
                  <a href='!#' className='dropdown-item preview-item' onClick={evt => evt.preventDefault()}>
                    <div className='preview-thumbnail'>
                      <div className='preview-icon bg-dark rounded-circle'>
                        <i className='mdi mdi-settings text-primary'></i>
                      </div>
                    </div>
                    <div className='preview-item-content'>
                      <p className='preview-subject ellipsis mb-1 text-small'>Account settings</p>
                    </div>
                  </a>
                  <div className='dropdown-divider'></div>
                  <a href='!#' className='dropdown-item preview-item' onClick={evt => evt.preventDefault()}>
                    <div className='preview-thumbnail'>
                      <div className='preview-icon bg-dark rounded-circle'>
                        <i className='mdi mdi-onepassword  text-info'></i>
                      </div>
                    </div>
                    <div className='preview-item-content'>
                      <p className='preview-subject ellipsis mb-1 text-small'>Change Password</p>
                    </div>
                  </a>

                </Dropdown.Menu>
              </Dropdown>
            </div>
          </li>
          <li className='nav-item nav-category'>
            <span className='nav-link'>Navigation</span>
          </li>
          <li className={this.isPathActive('/dashboard') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className='nav-link' to='/dashboard'>
              <span className='menu-icon'><i className='mdi mdi-speedometer'></i></span>
              <span className='menu-title'>Dashboard</span>
            </Link>
          </li>
          <li className={this.isPathActive('/companies') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className='nav-link' to='/companies'>
              <span className='menu-icon'><i className='mdi mdi-briefcase'></i></span>
              <span className='menu-title'>My Franchises</span>
            </Link>

          </li>
          {/* <li className={this.isPathActive('/lend') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className='nav-link' to='/lend'>
              <span className='menu-icon'><i className='mdi mdi-currency-btc'></i></span>
              <span className='menu-title'>Lend</span>
            </Link>

          </li> */}
          <li className={this.isPathActive('/presale') ? 'nav-item menu-items active' : 'nav-item menu-items'}>

              <Link className='nav-link' to='/presale'>
                <span className='menu-icon'><i className='mdi mdi-bank'></i></span>
                <span className='menu-title'>Presale</span>
              </Link>
          </li>
          <li className={this.isPathActive('/marketplace') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <OverlayTrigger
              placement="right"
              delay={{ show: 0, hide: 400 }}
              overlay={renderTooltip}
            >
              {/* <Link className="nav-link" to="/marketplace"> */}
              <a className="nav-link">
                <span className="menu-icon"><i className="mdi mdi-chart-bar"></i></span>
                <span className="menu-title">MarketPlace</span>
              </a>
            </OverlayTrigger>
          </li>
          <li className={this.isPathActive('/trade') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <OverlayTrigger
              placement="right"
              delay={{ show: 0, hide: 400 }}
              overlay={renderTooltip}
            >
              {/* <Link className="nav-link" to="/trade"> */}
              <a className="nav-link">
                <span className='menu-icon'><i className='mdi mdi-currency-btc'></i></span>
                <span className='menu-title'>Lend</span>
              </a>
            </OverlayTrigger>
          </li>
          <li className={this.isPathActive('/swap') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <OverlayTrigger
              placement="right"
              delay={{ show: 0, hide: 400 }}
              overlay={renderTooltip}
            >
              {/* <Link className='nav-link' to='/swap'> */}
              <a className='nav-link' to='/swap'>
                <span className='menu-icon'><i className='mdi mdi-bank'></i></span>
                <span className='menu-title'>Swap</span>
              </a>
            </OverlayTrigger>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);