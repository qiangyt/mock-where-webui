import Mock from 'mockjs'
import rnrAPI from './rnr'

Mock.setup({
    timeout: '350-600'
})

// 文章相关
Mock.mock(/\/rnr\/list/, 'get', rnrAPI.getList)

export default Mock