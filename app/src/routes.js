import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import MyList from './components/MyList';
import Page404 from './components/Page404';
import Single from './components/single';
import Edit from './components/edit';
import SearchP from './components/search';
import App from './App';

const AppRoutes=()=>
<App>
  <Switch>
    <Route exact path="/myList" component={MyList} />
    <Route exact path="/search" component={SearchP} />
    <Route exact path="/" component={Home} />
    <Route exact path="/single" component={Single} />
    <Route exact path="/edit" component={Edit} />
    <Route component={Page404} />
  </Switch>
</App>
export default AppRoutes;
