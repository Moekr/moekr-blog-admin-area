import request from '../utils/request';

export function create(article) {
  return request('/articles', {
    method: 'POST',
    body: JSON.stringify(article),
  });
}

export function fetch() {
  return request('/articles', {
    method: 'GET',
  });
}

export function update(id, article) {
  return request(`/article/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title: article.title,
      summary: article.summary,
      content: article.content,
      category: article.category,
      tags: article.tags,
    }),
  });
}

export function remove(id) {
  return request(`/article/${id}`, {
    method: 'DELETE',
  });
}
