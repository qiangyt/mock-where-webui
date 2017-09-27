import fetch from '@/utils/fetch'

export function fetchList(query) {
    return fetch({
        url: '/rnr/list',
        method: 'get',
        params: query
    })
}