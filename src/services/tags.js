import request from '../utils/request';

export function fetch() {
  return request('/tags', {
    method: 'GET',
  });
}

export function update(id, tag) {
  return request(`/tag/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      name: tag.name,
    }),
  });
}

export function remove(id) {
  return request(`/tag/${id}`, {
    method: 'DELETE',
  });
}
