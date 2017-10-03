import request from '../utils/request';

export function authority() {
  return request('/authority', {
    method: 'POST',
  });
}
