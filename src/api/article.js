import fetch from '@/utils/fetch'

export function fetchList(query) {
    return fetch({
        url: '/article/list',
        method: 'get',
        params: query
    })
}