import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LendBorrow } from './components/lendborrow/lendborrow';
import {TradeView} from './components/trade/trade'

import Spinner from './components/shared/Spinner';

const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));
const Companies = lazy(() => import('./components/companies/Companies'));
const Swap = lazy(() => import('./components/swap/Swap'));
const Presale = lazy(() => import('./components/presale/Presale'));

class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/companies" component={Companies} />
          <Route exact path="/swap" component={Swap} />
          <Route exact path="/presale" component={Presale} />
          <Route exact path="/lend" component={LendBorrow} />
          <Route exact path="/marketplace" component={LendBorrow} />
          <Route exact path="/trade" component={TradeView} />
          <Redirect to="/dashboard" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;