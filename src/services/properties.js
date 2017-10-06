import request from '../utils/request';

export function fetch() {
  return request('/properties', {
    method: 'GET',
  });
}

export function update(id, property) {
  return request(`/property/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      value: property.value,
    }),
  });
}
