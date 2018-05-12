import Api from './Api'
// import {inspect} from 'util'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    // console.log(`credentials: ${inspect(credentials)}`)
    return Api().post('login', credentials)
  },
  a (credentials) {
    return Api().post('a', credentials)
  }
}
