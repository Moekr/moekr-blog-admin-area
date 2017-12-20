import * as tagsService from '../services/tags';

export default {
  namespace: 'tags',
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
      const data = yield call(tagsService.fetch);
      if (data.error === 0) {
        yield put({ type: 'save', payload: { data } });
      }
    },
    *update({ payload: tag }, { call, put }) {
      const data = yield call(tagsService.update, tag.id, tag);
      if (data.error === 0) {
        yield put({ type: 'fetch' });
      }
    },
    *remove({ payload: id }, { call, put }) {
      const data = yield call(tagsService.remove, id);
      if (data.error === 0) {
        yield put({ type: 'fetch' });
      }
    },
  },
  subscriptions: {},
};
