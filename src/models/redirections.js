import * as redirectionsService from '../services/redirections';

export default {
  namespace: 'redirections',
  state: {
    list: [],
  },
  reducers: {
    save(state, { payload }) {
      const list = payload.data.res;
      return { ...state, list };
    },
    clear(state) {
      const list = [];
      return { ...state, list };
    },
  },
  effects: {
    *createOrUpdate({ payload: article }, { call, put }) {
      const data = yield call(redirectionsService.createOrUpdate, article);
      if (data.error === 0) {
        yield put({ type: 'fetch' });
      }
    },
    *fetch({ payload }, { call, put }) {
      const data = yield call(redirectionsService.fetch);
      if (data.error === 0) {
        yield put({ type: 'save', payload: { data } });
      }
    },
    *remove({ payload: id }, { call, put }) {
      const data = yield call(redirectionsService.remove, id);
      if (data.error === 0) {
        yield put({ type: 'fetch' });
      }
    },
  },
  subscriptions: {},
};
