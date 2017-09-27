import Mock from 'mockjs'
import articleAPI from './article'

Mock.setup({
    timeout: '350-600'
})

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)

export default Mock