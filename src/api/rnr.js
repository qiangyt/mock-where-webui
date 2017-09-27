import fetch from '@/utils/fetch'

export function list(query) {
    return fetch({
        url: '/rnr/list',
        method: 'get',
        params: query
    })
}