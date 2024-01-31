const request = async ({
    method,
    path,
    body,
}: {
    method: 'GET' | 'PUT' | 'POST' | 'DELETE'
    path: string
    body?: string
}) => {
    const url = `http://127.0.0.1:8000/${path}`
    const res = await fetch(url, {
        method,
        body,
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!res.ok)
        return res.text().then(text => {
            throw new Error(text)
        })
    if (res.status === 204) return null

    return res.json()
}

export const get = async (path: string, params = '') =>
    request({
        method: 'GET',
        path: `${path}${params ? `?${params}` : ''}`,
    })

export const put = async (path: string, body = '') =>
    request({
        method: 'PUT',
        path,
        body,
    })

export const post = async (path: string, body = '') =>
    request({
        method: 'POST',
        path,
        body,
    })

export const del = async (path: string, body = '') =>
    request({
        method: 'DELETE',
        path,
        body,
    })