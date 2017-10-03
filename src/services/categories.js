import request from '../utils/request';

export function fetch() {
  return request('/categories', {
    method: 'GET',
  });
}

export function update(id, category) {
  return request(`/category/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      name: category.name,
    }),
  });
}

export function remove(id) {
  return request(`/category/${id}`, {
    method: 'DELETE',
  });
}
