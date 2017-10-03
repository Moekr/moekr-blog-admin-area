import * as articlesService from '../services/articles';

export default {
  namespace: 'articles',
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
      return { ...state, list};
    },
  },
  effects: {
    *create({ payload: article }, { call, put }) {
      const data = yield call(articlesService.create, article);
      if (data.error === 0) {
        yield put({ type: 'fetch' });
      }
    },
    *fetch({ payload }, { call, put }) {
      const data = yield call(articlesService.fetch);
      if (data.error === 0) {
        yield put({ type: 'save', payload: { data } });
      }
    },
    *update({ payload: { id, article } }, { call, put }) {
      const data = yield call(articlesService.update, id, article);
      if (data.error === 0) {
        yield put({ type: 'fetch' });
      }
    },
    *remove({ payload: id }, { call, put }) {
      const data = yield call(articlesService.remove, id);
      if (data.error === 0) {
        yield put({ type: 'fetch' });
      }
    },
  },
  subscriptions: {},
};
