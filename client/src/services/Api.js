import axios from 'axios'
import store from '@/store/store'

// 向服务端请求的跨域路由
export default () => {
  return axios.create({
    baseURL: `http://localhost:8081/`,
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
