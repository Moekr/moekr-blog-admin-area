import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import Properties from './utils/Properties';
import Layout from './routes/Layout';
import Settings from './routes/Settings';

import LoginComponent from './components/Login';
import ArticleComponent from './components/Articles';
import CategoryComponent from './components/Categories';
import TagComponent from './components/Tags';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path={`${Properties.path}/`} component={Layout}>
        <IndexRoute component={LoginComponent} />
        <Route path="articles" component={ArticleComponent} />
        <Route path="categories" component={CategoryComponent} />
        <Route path="tags" component={TagComponent} />
        <Route path="settings" component={Settings} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
