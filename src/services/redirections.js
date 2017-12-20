import request from '../utils/request';

export function createOrUpdate(redirection) {
  return request('/redirections', {
    method: 'PUT',
    body: JSON.stringify(redirection),
  });
}

export function fetch() {
  return request('/redirections', {
    method: 'GET',
  });
}

export function remove(id) {
  return request(`/redirection/${id}`, {
    method: 'DELETE',
  });
}
