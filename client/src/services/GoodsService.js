import Api from '@/services/Api'

// 处理向服务端的资源请求路径
export default {
  index () {
    // 通过Api的封装的create方法创建GET请求从8081后台获得数据
    return Api().get('goods')
  }
}
