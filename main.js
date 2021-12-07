
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import axios from 'axios'

const http = axios.create({
	timeout: 1000 * 300,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
	},
})

Vue.prototype.$axios = http

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif