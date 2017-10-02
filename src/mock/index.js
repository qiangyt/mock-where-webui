import Mock from 'mockjs'
import rnrAPI from './rnr'

if (process.env.NODE_ENV === 'production') {
    console.log('mock is ignored for production env')
} else {
    Mock.setup({
        timeout: '350-600'
    })

    Mock.mock(/\/rnr\/list/, 'get', rnrAPI.getList)
}

export default Mock