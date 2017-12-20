import BasicAuth from '../utils/BasicAuth';
import * as loginService from '../services/login';

export default {
  namespace: 'login',
  state: {
    hasLogin: false,
    alertVisible: false,
  },
  reducers: {
    loginSuccess(state) {
      const hasLogin = true;
      const alertVisible = false;
      return { ...state, hasLogin, alertVisible };
    },
    logoutSuccess(state) {
      const hasLogin = false;
      return { ...state, hasLogin };
    },
    loginFail(state) {
      const alertVisible = true;
      return { ...state, alertVisible };
    },
    closeAlert(state) {
      const alertVisible = false;
      return { ...state, alertVisible };
    },
  },
  effects: {
    *init({ payload }, { call, put }) {
      const data = yield call(loginService.authority);
      if (data.error === 0) {
        yield put({ type: 'loginSuccess' });
        yield put({ type: 'fetchData' });
      }
    },
    *login({ payload: login }, { call, put }) {
      BasicAuth.setAuth(login.username, login.password);
      const data = yield call(loginService.authority);
      if (data.error === 0) {
        yield put({ type: 'loginSuccess' });
        yield put({ type: 'fetchData' });
      } else {
        yield put({ type: 'loginFail' });
        yield put({ type: 'clearData' });
      }
    },
    *logout({ payload }, { put }) {
      BasicAuth.clearAuth();
      yield put({ type: 'logoutSuccess' });
      yield put({ type: 'clearData' });
    },
    *fetchData({ payload }, { put }) {
      yield put({ type: 'articles/fetch' });
      yield put({ type: 'categories/fetch' });
      yield put({ type: 'tags/fetch' });
      yield put({ type: 'properties/fetch' });
      yield put({ type: 'redirections/fetch' });
    },
    *clearData({ payload }, { put }) {
      yield put({ type: 'articles/clear' });
      yield put({ type: 'categories/clear' });
      yield put({ type: 'tags/clear' });
      yield put({ type: 'properties/clear' });
      yield put({ type: 'redirections/clear' });
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'init' });
    },
  },
};
