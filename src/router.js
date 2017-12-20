import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import Const from './utils/Const';
import Layout from './routes/Layout';

import LoginComponent from './components/Login';
import ArticleComponent from './components/Articles';
import CategoryComponent from './components/Categories';
import TagComponent from './components/Tags';
import PropertyComponent from './components/Properties';
import RedirectionComponent from './components/Redirections';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path={`${Const.path}/`} component={Layout}>
        <IndexRoute component={LoginComponent} />
        <Route path="articles" component={ArticleComponent} />
        <Route path="categories" component={CategoryComponent} />
        <Route path="tags" component={TagComponent} />
        <Route path="properties" component={PropertyComponent} />
        <Route path="redirections" component={RedirectionComponent} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
