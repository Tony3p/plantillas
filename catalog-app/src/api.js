async function requestJson(path, options) {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  const contentType = res.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const payload = isJson ? await res.json() : null

  if (!res.ok) {
    const message =
      payload?.error || `Request failed (${res.status} ${res.statusText})`
    throw new Error(message)
  }

  return payload
}

export async function fetchDb() {
  return await requestJson('/api/db')
}

export async function createCategory(category) {
  return await requestJson('/api/categories', {
    method: 'POST',
    body: JSON.stringify(category),
  })
}

export async function deleteCategory(id) {
  return await requestJson(`/api/categories/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  })
}

export async function createItem(item) {
  return await requestJson('/api/items', {
    method: 'POST',
    body: JSON.stringify(item),
  })
}

export async function deleteItem(id) {
  return await requestJson(`/api/items/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  })
}

export async function updateItem(id, item) {
  return await requestJson(`/api/items/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(item),
  })
}

