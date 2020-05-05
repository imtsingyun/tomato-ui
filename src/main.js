/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/js/secret.js'
import './assets/css/app.css'

import axios from 'axios'

// clientId:secret  => base64 => YWRtaW4tY2xpZW50OnRvbWF0bw==
axios.defaults.headers.common.Authorization = 'Basic YWRtaW4tY2xpZW50OnRvbWF0bw=='
axios.interceptors.request.use(config => {
  const access_token = window.sessionStorage.getItem('access_token')
  if (access_token !== null && config.url.indexOf('/oauth/token') === -1) {
    config.headers.Authorization = 'Bearer ' + window.sessionStorage.getItem('access_token')
  }
  return config
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  console.log(error)
  // 这里我们把错误信息扶正, 后面就不需要写 catch 了
  return Promise.resolve(error.response)
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
