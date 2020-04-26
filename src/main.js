import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/app.css'

import axios from 'axios'

// clientId:secret  => base64 => YWRtaW4tY2xpZW50OnRvbWF0bw==
axios.defaults.headers.common.Authorization = 'Basic YWRtaW4tY2xpZW50OnRvbWF0bw=='
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
