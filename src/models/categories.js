import * as categoriesService from '../services/categories';

export default {
  namespace: 'categories',
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
    *fetch({ payload }, { call, put }) {
      const data = yield call(categoriesService.fetch);
      if (data.error === 0) {
        yield put({ type: 'save', payload: { data } });
      }
    },
    *update({ payload: category }, { call, put }) {
      const data = yield call(categoriesService.update, category.id, category);
      if (data.error === 0) {
        yield put({ type: 'fetch' });
      }
    },
    *remove({ payload: id }, { call, put }) {
      const data = yield call(categoriesService.remove, id);
      if (data.error === 0) {
        yield put({ type: 'fetch' });
      }
    },
  },
  subscriptions: {},
};
