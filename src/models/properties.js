import * as propertiesService from '../services/properties';

export default {
  namespace: 'properties',
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
    *fetch({ payload }, { call, put }) {
      const data = yield call(propertiesService.fetch);
      if (data.error === 0) {
        yield put({ type: 'save', payload: { data } });
      }
    },
    *update({ payload: { id, property } }, { call, put }) {
      const data = yield call(propertiesService.update, id, property);
      if (data.error === 0) {
        yield put({ type: 'fetch' });
      }
    },
  },
  subscriptions: {},
};
