import axios from 'axios'

// 向服务端请求的跨域路由
export default () => {
  return axios.create({
    baseURL: `http://localhost:8081/`
  })
}
