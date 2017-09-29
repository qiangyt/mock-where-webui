import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        _id: '@increment',
        created_at: '@datetime',
        protocol: 'https',
        method: 'delete',
        ip: '192.168.0.1',
        host: 'github.com',
        port: '@integer(1000, 8000)',
        query: '{"q1":1}',
        header: '{"h2":2}',
        path: '/p1',
        request_body: 'req1',
        status: '@integer(200, 500)',
        response_body: 'response1'
    }))
}

export default {
    getList: config => {
        const { importance, type, title, page = 1, limit = 20, sort } = param2Obj(config.url)

        let mockList = List.filter(item => {
            if (importance && item.importance !== +importance) return false
            if (type && item.type !== type) return false
            if (title && item.title.indexOf(title) < 0) return false
            return true
        })

        if (sort === '-id') {
            mockList = mockList.reverse()
        }

        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

        return {
            total: mockList.length,
            items: pageList
        }
    }
}